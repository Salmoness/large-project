/* This is the /api/user/login endpoint.
 *
 * Its purpose is to log in a user.
 *
 * userAuthJWT authorization is NOT required for this endpoint.
 * Returns a new userAuthJWT.
 */

const { createUserAuthJWT } = require("../utils/jwtService.js");
const { SUCCESS, BAD_REQUEST } = require("../utils/responseCodeConstants.js");
const md5 = require("../utils/md5.js");

module.exports.doLogin = async function (req, res, next) {
  const { username, password } = req.body;

  // hash password
  let hash = md5(password);

  const result = await req.app.locals.mongodb
    .collection("Users")
    .findOne({ username: username, password: hash });

  if (!result) {
    res
      .status(BAD_REQUEST)
      .json({ error: "Username/Password incorrect", jwt: null });
  } else if (!result.email_validated) {
    res.status(BAD_REQUEST).json({ error: "Email not verified", jwt: null });
  } else {
    const jwtStr = createUserAuthJWT(result._id, result.username);
    res.status(SUCCESS).json({ error: "", jwt: jwtStr });
  }
};
