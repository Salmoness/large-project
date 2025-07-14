const jwtutils = require("../jwt-utils.js");

module.exports.doLogin = async function (req, res, next) {
  const { username, password } = req.body;

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
      username: result.username, // lowercase
    });
  }

  ret = { error: error, jwt: token };
  res.status(200).json(ret);
};
