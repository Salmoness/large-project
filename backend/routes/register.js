const jwtutils = require("../jwt-utils.js");

async function register(req, res, next) {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    confirmEmail,
  } = req.body;

  let error = "";
  let jwt = "";

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
          FirstName: firstName,
          LastName: lastName,
          Username: username,
          Email: email,
          Password: password,
        });
      jwt = jwtutils.createJWT({
        userId: result.insertedId,
        username: username,
        firstName: firstName,
        lastName: lastName,
      });
    }
  }

  res.status(200).json({ error: error, jwt: jwt });
}

module.exports = register;
