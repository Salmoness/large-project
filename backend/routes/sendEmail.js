const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  const msg = {
    to,
    from: "garryborn23@gmail.com",
    subject,
    html,
  };
  await sgMail.send(msg);
}

module.exports = sendEmail;