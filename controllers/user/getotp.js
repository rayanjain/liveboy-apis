const OTPMail = require('./functions/OTPMail')
const otp = require('../../models/otp')
const user = require('../../models/user')

module.exports = async function (req, res) {
  try {
    if ((await user.findOne({ email: req.body.email })) != null) {
      res.status(400).send('Email elready exists')
      return
    }
    const OTP = parseInt(Math.random() * 1000000)
    await OTPMail(req.body.email, OTP)
    const newOTP = new otp({
      email: req.body.email,
      otp: OTP,
    })
    await newOTP.save()
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}
