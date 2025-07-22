const request = require("supertest");
const express = require("express");
const { resetPassword } = require("../routes/resetPassword");
const md5 = require("../utils/md5");

jest.mock("../utils/md5", () => jest.fn(() => "mockedHash"));

describe("POST /api/user/reset-password", () => {
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
        app.post("/api/user/reset-password", resetPassword);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // token or password missing
    it("should return 400 if token or password is missing", async () => {
        const res = await request(app)
            .post("/api/user/reset-password")
            .send({ token: "some-token" }); // no password

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Token and password are required." });
    });

    // invalid or expired token
    it("should return 400 if token is invalid or expired", async () => {
        mockCollection.findOneAndUpdate.mockResolvedValue(null);

        const res = await request(app)
            .post("/api/user/reset-password")
            .send({ token: "expired-token", password: "newpass123" });

        expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
            { password_reset_token: "expired-token" },
            {
                $set: {
                    password: expect.any(String),
                    password_reset_token: "",
                },
            }
        );

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid or expired token." });
    });

    // successfully reset the password
    it("should update password and return success if token is valid", async () => {
        md5.mockReturnValue("hashed-password");

        mockCollection.findOneAndUpdate.mockResolvedValue({
            email: "test@example.com",
        });

        const res = await request(app)
            .post("/api/user/reset-password")
            .send({ token: "valid-token", password: "newpassword123" });

        expect(md5).toHaveBeenCalledWith("newpassword123");

        expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
            { password_reset_token: "valid-token" },
            {
                $set: {
                    password: "hashed-password",
                    password_reset_token: "",
                },
            }
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true });
    });

    // database error
    it("should return 500 if database throws error", async () => {
        mockCollection.findOneAndUpdate.mockRejectedValue(new Error("DB error"));

        const res = await request(app)
            .post("/api/user/reset-password")
            .send({ token: "token123", password: "newpass123" });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "Internal server error." });
    });
});