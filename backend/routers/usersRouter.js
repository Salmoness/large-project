const express = require("express");
const usersRouter = express.Router();

const { doLogin } = require("../routes/login.js");
const { doRegister } = require("../routes/register.js");
const { verifyEmail } = require("../routes/verifyEmail.js");
const { resetPassword } = require("../routes/resetPassword.js");
const { requestPasswordReset } = require("../routes/requestPasswordReset.js");


usersRouter.post("/login", doLogin);
usersRouter.post("/register", doRegister);
usersRouter.post("/verify-email", verifyEmail);
usersRouter.post("/reset-password", resetPassword);
usersRouter.post("/request-password-reset", requestPasswordReset);

module.exports.usersRouter = usersRouter;
