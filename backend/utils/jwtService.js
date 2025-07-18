const jwt = require("jsonwebtoken");
const JWT_SECRET = "TEMP"; // process.env.JWT_SECRET;
const DURATION = "1h";

function createUserAuthJWT(userId, username) {
  return createJWT({ userId: userId, username: username });
}

function createQuizSessionJWT(quizSessionId, displayname) {
  return createJWT({ quizSessionId: quizSessionId, displayname: displayname });
}

// creates a brand new JWT with any data
function createJWT(data) {
  return jwt.sign({ payload: data }, JWT_SECRET, { expiresIn: DURATION });
}

// returns the data used in createJWT, or false if
// the given JWT is expired or invalid
function verifyAndDecodeJWT(tokenStr) {
  try {
    return jwt.verify(tokenStr, JWT_SECRET).payload;
  } catch (e) {
    return false;
  }
}

// returns a brand new JWT from an existing JWT,
// or false if the current JWT is expired or invalid
function verifyAndRefreshJWT(tokenStr) {
  const payloadToCopy = verifyAndDecodeJWT(tokenStr);
  if (payloadToCopy == false) return false;
  return createJWT(payloadToCopy);
}

module.exports = {
  createUserAuthJWT,
  createQuizSessionJWT,
  createJWT,
  verifyAndDecodeJWT,
  verifyAndRefreshJWT,
};
