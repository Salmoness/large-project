module.exports.verifyEmail = async function (req, res) {
  try {
    const db = req.app.locals.mongodb;
    const { token } = req.body;

    if (!token) {
      return res.status(400).send("Missing token");
    }

    const result = await db.collection("Users").findOneAndUpdate(
      { email_verification_token: token },
      {
        $set: { email_validated: true, email_verification_token: "" },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      // token not found or already used
      return res
        .status(400)
        .send("Verification failed. Token invalid or already used.");
    }

    return res.send("Email verified successfully!");
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
};
