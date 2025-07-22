const request = require("supertest");
const express = require("express");
const { requestPasswordReset } = require("../routes/requestPasswordReset");
const sendEmail = require("../utils/sendEmail");

jest.mock("../utils/sendEmail"); // mock sendEmail to avoid real emails

describe("POST /api/user/request-password-reset", () => {
    let app;
    let mockDb;
    let mockCollection;

    beforeEach(() => {
        app = express();
        app.use(express.json());

        mockCollection = {
            findOneAndUpdate: jest.fn(),
        };

        mockDb = {
            collection: jest.fn(() => mockCollection),
        };

        app.locals.mongodb = mockDb;

        // Route under test
        app.post("/api/user/request-password-reset", requestPasswordReset);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    // email is missing
    it("should return 400 if email is missing", async () => {
        const res = await request(app)
            .post("/api/user/request-password-reset")
            .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Email is required." });
    });

    // valid email, token changed and reset email sent
    it("should update user and send email if email is valid", async () => {
        mockCollection.findOneAndUpdate.mockResolvedValue({
            email: "test@example.com",
            username: "testuser",
        });

        sendEmail.mockResolvedValue(); // mock successful send

        const res = await request(app)
            .post("/api/user/request-password-reset")
            .send({ email: "test@example.com" });

        expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
            { email: "test@example.com" },
            expect.objectContaining({
                $set: { password_reset_token: expect.any(String) },
            })
        );

        expect(sendEmail).toHaveBeenCalledWith(
            "test@example.com",
            "Reset your password",
            expect.stringContaining("Reset Password")
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true });
    });

    // email exists but sending the email fails
    it("should log error if email sending fails but still return success", async () => {
        mockCollection.findOneAndUpdate.mockResolvedValue({
            email: "test@example.com",
            username: "testuser",
        });

        sendEmail.mockRejectedValue(new Error("SMTP error"));

        const consoleErrorSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => { });

        const res = await request(app)
            .post("/api/user/request-password-reset")
            .send({ email: "test@example.com" });

        expect(sendEmail).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "❌ Email sending error:",
            expect.any(Error)
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true });

        consoleErrorSpy.mockRestore();
    });

    // unexpected server error 
    it("should return 500 if database throws error", async () => {
        mockCollection.findOneAndUpdate.mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .post("/api/user/request-password-reset")
            .send({ email: "test@example.com" });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error." });
    });
});