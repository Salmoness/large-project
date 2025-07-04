const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Creates a JWT with some arbitrary data.
exports.createJWT = function (data) {
  return jwt.sign({ payload: data }, JWT_SECRET, { expiresIn: "1h" });
};

// Pushes the expirtion date of a JWT back.
// Throws an exception if the JWT is expired or invalid.
exports.refreshJWT = function (data) {
  return jwt.sign({ payload: data }, JWT_SECRET, { expiresIn: "1h" });
};

// Throws an exception if the JWT is expired or invalid.
exports.verifyJWT = function (token) {
  jwt.verify(token, JWT_SECRET);
};

// Returns the decoding of a JWT.
// Throws an exception if the JWT is expired or invalid.
exports.decodeJWT = function (token) {
  return jwt.verify(token, JWT_SECRET);
};
