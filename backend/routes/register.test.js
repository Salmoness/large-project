const request = require("supertest");
const express = require("express");
const { doRegister } = require("./register");

const sendEmail = require("../utils/sendEmail");
const md5 = require("../utils/md5");

jest.mock("../utils/sendEmail");
jest.mock("../utils/md5", () => jest.fn(() => "mockedHash"));

describe("POST /register", () => {
  let app;
  let mockDb;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Mock db collection
    mockDb = {
      collection: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      insertOne: jest.fn(),
    };

    app.locals = { mongodb: mockDb };
    app.post("/api/user/register", doRegister);
  });

  it("should register a new user", async () => {
    mockDb.findOne.mockResolvedValueOnce(null); // no existing username
    mockDb.findOne.mockResolvedValueOnce(null); // no existing email
    mockDb.insertOne.mockResolvedValueOnce({ insertedId: "abc123" }); // simulates adding a new user

    // simulates sending email, not actually sending it though
    sendEmail.mockResolvedValueOnce(true);

    const res = await request(app).post("/api/user/register").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "securepass",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe("");
    expect(mockDb.insertOne).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalled();
  });

  it("should reject short username", async () => {
    const res = await request(app).post("/api/user/register").send({
      username: "ab",
      email: "x@x.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toMatch("Username must be at least 3 characters long"); // normal check for username
  });

  it("should reject short password", async () => {
    const res = await request(app).post("/api/user/register").send({
      username: "abc",
      email: "x@x.com",
      password: "12",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toMatch(/Password must be at least/); // you can actually do it this way where it will only check a part of the string to see if it matches
  });

  it("should reject duplicate username", async () => {
    mockDb.findOne.mockResolvedValueOnce({ username: "existing" }); // existing username

    const res = await request(app).post("/api/user/register").send({
      username: "existing",
      email: "x@x.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe("Username taken");
  });

  it("should reject duplicate email", async () => {
    mockDb.findOne.mockResolvedValueOnce(null); // no username conflict
    mockDb.findOne.mockResolvedValueOnce({ email: "x@x.com" }); // existing email

    const res = await request(app).post("/api/user/register").send({
      username: "newuser",
      email: "x@x.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe("Email already registered");
  });
});