const request = require("supertest");
const express = require("express");
const { doLogin } = require("../routes/login");
const md5 = require("../utils/md5");
const { createUserAuthJWT } = require("../utils/jwtService");

jest.mock("../utils/md5", () => jest.fn(() => "mockedHash"));
jest.mock("../utils/jwtService", () => ({
    createUserAuthJWT: jest.fn(() => "fake.jwt.token"),
}));

describe("POST /api/user/login", () => {
    let app;
    let mockDb;
    let mockCollection;

    beforeEach(() => {
        app = express();
        app.use(express.json());

        mockCollection = {
            findOne: jest.fn(),
        };

        mockDb = {
            collection: jest.fn(() => mockCollection),
        };

        app.locals.mongodb = mockDb;
        app.post("/api/user/login", doLogin);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // checks for no existing users
    it("should return 400 if credentials are incorrect", async () => {
        mockCollection.findOne.mockResolvedValue(null);

        const res = await request(app).post("/api/user/login").send({
            username: "wronguser",
            password: "wrongpass",
        });

        expect(md5).toHaveBeenCalledWith("wrongpass");
        expect(res.statusCode).toBe(400);
        expect(res.body.jwt).toBeNull();
        expect(res.body.error).toBe("Username/Password incorrect");
    });

    // user exists username and password correct but email not validated
    it("should return 400 if email is not validated", async () => {
        mockCollection.findOne.mockResolvedValue({
            _id: "user123",
            username: "testuser",
            email_validated: false,
        });

        const res = await request(app).post("/api/user/login").send({
            username: "testuser",
            password: "anypass",
        });

        expect(md5).toHaveBeenCalledWith("anypass");
        expect(res.statusCode).toBe(400);
        expect(res.body.jwt).toBeNull();
        expect(res.body.error).toBe("Email not verified");
    });

    // login succesful
    it("should return 200 and a JWT if login is successful", async () => {
        mockCollection.findOne.mockResolvedValue({
            _id: "user123",
            username: "testuser",
            email_validated: true,
        });

        const res = await request(app).post("/api/user/login").send({
            username: "testuser",
            password: "correctpass",
        });

        expect(md5).toHaveBeenCalledWith("correctpass");
        expect(createUserAuthJWT).toHaveBeenCalledWith("user123", "testuser");
        expect(res.statusCode).toBe(200);
        expect(res.body.jwt).toBe("fake.jwt.token");
        expect(res.body.error).toBe("");
    });
});