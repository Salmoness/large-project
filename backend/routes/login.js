const jwtutils = require("../jwt-utils.js");

async function login(req, res, next) {
  const { username, password } = req.body;

  // TODO: verify request

  const result = await req.app.locals.mongodb
    .collection("Users")
    .findOne({ Username: username, Password: password });

  let error = "";
  let token = null;

  if (result) {
    token = jwtutils.createJWT({
      userId: result._id,
      username: result.Username,
      firstName: result.FirstName,
      lastName: result.LastName,
    });
  } else {
    error = "Username/Password incorrect";
  }

  ret = { error: error, jwt: token };
  res.status(200).json(ret);
}

module.exports = login;
