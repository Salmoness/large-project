const jwtutils = require("../jwt-utils.js");
const { v4: uuidv4 } = require("uuid"); // this is for generating uuidv4
const sendEmail = require("./sendEmail.js");

async function register(req, res, next) {
  const { username, email, password, confirmPassword, confirmEmail } = req.body;

  let error = "";
  let jwt = "";
  const verificationToken = uuidv4(); // <--- Generate token

  if (password != confirmPassword) {
    error = "Passwords do not match";
  } else if (email != confirmEmail) {
    error = "Emails do not match";
  } else if (username.length < 3) {
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
      const result = await req.app.locals.mongodb
        .collection("Users")
        .insertOne({
          username: username,
          password: password,
          email: email,
          email_validated: false,
          verificationToken: verificationToken, // this is the uuidv4, saved and used for sending a person to the email verification /pages/EmailVerification/<uuidv4>
        });

      const confirmUrl = `http://hopethiswork.com/pages/EmailConfirm/${verificationToken}`;
      const emailHtml = `<p>Hi ${username},</p>
                         <p>Please confirm your email by clicking the link below:</p>
                         <a href="${confirmUrl}">Verify Email</a>`;

      try {
        await sendEmail(email, "Verify your email", emailHtml);
      } catch (e) {
        console.error("Error sending verification email:", e);
        error = "Failed to send verification email";
      }


      jwt = jwtutils.createJWT({
        userId: result.insertedId,
        username: username,
      });
    }
  }

  res.status(200).json({ error: error, jwt: jwt });
}

module.exports = register;
