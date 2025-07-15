const nodemailer = require("nodemailer");

async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,          // smtp.sendgrid.net
    port: parseInt(process.env.EMAIL_PORT), // 587
    secure: false,                         // false for port 587
    auth: {
      user: process.env.EMAIL_USER,       // "apikey"
      pass: process.env.EMAIL_PASSWORD,   // your SendGrid API key
    },
  });

  const mailOptions = {
    from: "Your App Name <verified-sender@example.com>", // use your verified email here
    to: to,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;