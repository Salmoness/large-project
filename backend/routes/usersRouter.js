const express = require("express");
const usersRouter = express.Router();

const { doLogin } = require("./login.js");
const { doRegister } = require("./register.js");
const { verifyEmail } = require("./verifyEmail.js");

usersRouter.post("/login", doLogin);
usersRouter.post("/register", doRegister);
usersRouter.post("/verify-email", verifyEmail);

module.exports.usersRouter = usersRouter;