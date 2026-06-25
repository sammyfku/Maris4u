const nodemailer = require('nodemailer')

module.exports = async function sendEmail(to, subject, html){
  // stub: in production configure transporter with real creds
  const transporter = nodemailer.createTransport({ sendmail: true })
  await transporter.sendMail({ from: 'no-reply@maris4u', to, subject, html })
}
