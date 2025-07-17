module.exports.passwordReset = async function (req, res) {
  try {
    const db = req.app.locals.mongodb;
    const { token } = req.body;

    if (!token) {
      return res.status(400).send("Missing token");
    }

    const result = await db.collection("Users").findOneAndUpdate(
      { password_reset_token: token },
      {
        $set: { password: password,  password_reset_token: "" },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      // token not found or already used
      return res
        .status(400)
        .send("Password Reset failed. Token invalid or already used.");
    }

    return res.send("Password Reset successfully!");
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
};