const nodemailer = require("nodemailer");

async function sendEmail(to, subject, html) {
  // Create a transporter using your email provider credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or another provider like 'Yahoo', 'Outlook', or SMTP config
    auth: {
      user: process.env.EMAIL_USER,      // your email address
      pass: process.env.EMAIL_PASSWORD,  // your app password or email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;