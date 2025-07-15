const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  const msg = {
    to,
    from: "garryborn23@gmail.com", // must match a verified sender or domain
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
