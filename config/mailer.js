const nodemailer = require('nodemailer')

// Create transporter for delivering mails (SMTP)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'gmail',
    //  Insert authentication
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    }
})

module.exports = transporter