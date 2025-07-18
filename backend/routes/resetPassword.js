const md5 = require("./md5.js");

module.exports.resetPassword = async function (req, res) {
  const db = req.app.locals.mongodb;
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required." });
  }

  try {
    const result = await db.collection("Users").findOneAndUpdate(
      { password_reset_token: token },
      {$set: { password: "", password_reset_token: "" } }
    );

    if (!result.value) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Password reset failed:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};