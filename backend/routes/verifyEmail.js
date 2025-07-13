module.exports.verifyEmail = async function (req, res) {
  try {
    const db = req.app.locals.mongodb;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "Missing token" });
    }

    const result = await db.collection("Users").findOneAndUpdate(
      { verificationToken: token },
      {
        $set: { email_validated: true },
        $unset: { verificationToken: "" },
      },
      { returnDocument: "after" } // for MongoDB driver v4+
    );

    if (!result.value) {
      // token not found or already used
      return res.status(400).json({
        success: false,
        message: "Verification failed. Token invalid or already used.",
      });
    }

    return res.json({ success: true, message: "Email verified successfully!" });
  } catch (err) {
    console.error("Verification error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};