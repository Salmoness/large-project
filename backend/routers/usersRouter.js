const express = require("express");
const usersRouter = express.Router();

const { doLogin } = require("../routes/login.js");
const { doRegister } = require("../routes/register.js");
const { verifyEmail } = require("../routes/verifyEmail.js");

usersRouter.post("/login", doLogin);
usersRouter.post("/register", doRegister);
usersRouter.post("/verify-email", verifyEmail);

module.exports.usersRouter = usersRouter;
