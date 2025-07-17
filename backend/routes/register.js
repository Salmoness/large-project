const jwtutils = require("../jwt-utils.js");
const { v4: uuidv4 } = require("uuid"); // this is for generating uuidv4
const sendEmail = require("../sendEmail.js");


module.exports.doRegister = async function (req, res, next) {
  const { username, email, password } = req.body;

  let error = "";

  if (username.length < 3) {
    error = "Username must be at least 3 characters long";
  } else if (password.length < 3) {
    error = "Password must be at least 3 characters long";
  } else {

    // IF YOU CHANGE THIS CODE ADD COMMENTS - Sincerely Ethan
    const usersCollection = req.app.locals.mongodb.collection("Users");
    
    //checks if name exists in the collection 
    const existingUsername = await usersCollection.findOne({ username });

    //checks if name exists in the collection 
    const existingEmail = await usersCollection.findOne({ email });
    
    if (existingUsername) {
      error = "Username taken";
    } else if (existingEmail) {
      error = "Email already registered";
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
        console.log("Email sent successfully");
      } catch (e) {
        console.error("Email sending error:", e);
      }
    }
  }

  res.status(200).json({ error: error });
};
