const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/sendEmail.js");

module.exports.requestPasswordReset = async function (req, res) {
  const db = req.app.locals.mongodb;
  const { email } = req.body;

  console.log("📩 Incoming password reset request " + email);

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const token = uuidv4();

    const result = await db
      .collection("Users")
      .findOneAndUpdate({ email }, { $set: { password_reset_token: token } });

    const user = result;
    const username = user?.username;

    const resetUrl = `http://hopethiswork.com/account/reset-password/${token}`;
    const emailHtml = `<p>Hi, ${username}</p>
                         <p>You requested a password reset. Click below to reset your password:</p>
                         <a href="${resetUrl}">Reset Password</a>`;

    try {
      await sendEmail(email, "Reset your password", emailHtml);
      console.log("✅ Password reset email sent");
    } catch (e) {
      console.error("❌ Email sending error:", e);
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Reset request failed:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
