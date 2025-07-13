const jwtutils = require("../jwt-utils.js");

async function login(req, res, next) {
  const { username, password } = req.body;

  // TODO: verify request

  const result = await req.app.locals.mongodb
    .collection("Users")
    .findOne({ username: username, password: password });

  let error = "";
  let token = null;

  if (!result) {
    error = "Username/Password incorrect";
  } else if (!result.email_validated) {
    error = "Email not verified";
  } else {
    token = jwtutils.createJWT({
      userId: result._id,
      username: result.username,      // lowercase
      email_validated: true,
    });
  }

  ret = { error: error, jwt: token };
  res.status(200).json(ret);
}

module.exports = login;
