const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
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

// returns [payload, success]
function verifyAndDecodeJWT(tokenStr) {
  if (tokenStr == null) return false;
  try {
    return [jwt.verify(tokenStr, JWT_SECRET).payload, true];
  } catch (e) {
    return [null, false];
  }
}

// returns [payload, refreshedTokenStr, success]
function verifyAndRefreshJWT(tokenStr) {
  if (tokenStr == null) return [null, null, false];
  const [payloadToCopy, success] = verifyAndDecodeJWT(tokenStr);
  if (!success) return [null, null, false];
  return [payloadToCopy, createJWT(payloadToCopy), true];
}

module.exports = {
  createUserAuthJWT,
  createQuizSessionJWT,
  createJWT,
  verifyAndDecodeJWT,
  verifyAndRefreshJWT,
};
