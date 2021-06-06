nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

module.exports = (email, OTP) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'LiveBoy verification Code',
      text: `Your LiveBoy verification code is ${OTP}`,
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}
