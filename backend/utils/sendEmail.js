const sgMail = require('@sendgrid/mail');


async function sendEmail(to, subject, html) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: "noreply@hopethiswork.com",
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ SendGrid error:", error);
    if (error.response) {
      console.error("🔍 Response body:", error.response.body);
    }
  }
}


module.exports = sendEmail;