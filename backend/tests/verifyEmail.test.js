const request = require("supertest");
const express = require("express");
const verifyEmailRoute = require("../routes/verifyEmail");

describe("POST /api/user/verify-email", () => {
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
        app.post("/api/user/verify-email", verifyEmailRoute.verifyEmail);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // No token found
    it("should return 400 if token is missing", async () => {
        const res = await request(app).post("/api/user/verify-email").send({});
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe("Missing token");
    });

    // Token invalid or already used
    it("should return 400 if token is invalid or already used", async () => {
        mockCollection.findOneAndUpdate.mockResolvedValue(null);

        const res = await request(app).post("/api/user/verify-email").send({
            token: "invalid-token",
        });

        expect(mockCollection.findOneAndUpdate).toHaveBeenCalledWith(
            { email_verification_token: "invalid-token" },
            {
                $set: {
                    email_validated: true,
                    email_verification_token: "",
                },
            },
            { returnDocument: "after" }
        );

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe("Verification failed. Token invalid or already used.");
    });

    // Token found and email verified
    it("should return success if token is valid", async () => {
        mockCollection.findOneAndUpdate.mockResolvedValue({
            value: {
                email_validated: true,
                email_verification_token: "",
            },
        });

        const res = await request(app).post("/api/user/verify-email").send({
            token: "valid-token",
        });

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Email verified successfully!");
    });

    // server error
    it("should return 500 if server throws an error", async () => {
        mockCollection.findOneAndUpdate.mockRejectedValue(new Error("DB error"));

        const res = await request(app).post("/api/user/verify-email").send({
            token: "any-token",
        });

        expect(res.statusCode).toBe(500);
        expect(res.text).toMatch(/Server error: Error: DB error/);
    });
});