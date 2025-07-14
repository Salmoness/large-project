const jwtutils = require("../jwt-utils.js");
const { v4: uuidv4 } = require("uuid"); // this is for generating uuidv4
const sendEmail = require("./sendEmail.js");

module.exports.doRegister = async function (req, res, next) {
  const { username, email, password } = req.body;

  let error = "";

  if (username.length < 3) {
    error = "Username must be at least 3 characters long";
  } else if (password.length < 3) {
    error = "Password must be at least 3 characters long";
  } else {
    const existingUser = await req.app.locals.mongodb
      .collection("Users")
      .findOne({ Username: username });
    if (existingUser) {
      error = "Username taken";
    } else {
      const verificationToken = uuidv4(); // Random token used for account verification

      const result = await req.app.locals.mongodb
        .collection("Users")
        .insertOne({
          username: username,
          password: password,
          email: email,
          email_validated: false,
          email_verification_token: verificationToken,
          password_reset_token: "",
        });

      const confirmUrl = `http://hopethiswork.com/account/registration-email-confirmation/${verificationToken}`;
      const emailHtml = `<p>Hi ${username},</p>
                         <p>Please confirm your email by clicking the link below:</p>
                         <a href="${confirmUrl}">Verify Email</a>`;

      try {
        await sendEmail(email, "Verify your email", emailHtml);
      } catch (e) {
        error = "Failed to send verification email: " + e;
      }
    }
  }

  res.status(200).json({ error: error });
};
