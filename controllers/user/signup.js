const bcrypt = require('bcrypt')
const user = require('../../models/user')
const otp = require('../../models/otp')
const checkUsername = require('./functions/checkUsername')
const createToken = require('./functions/createToken')

module.exports = async function (req, res) {
  try {
    //validate Form
    if (req.body.username.length < 3) {
      res.status(400).send('Username too short')
      return
    }
    if (req.body.password.length < 3) {
      res.status(400).send('Password too short')
      return
    }

    //check if email already exists
    if ((await user.findOne({ email: req.body.email })) != null) {
      res.status(400).send('Email elready exists')
      return
    }

    //check if OTP matches
    const otpData = await otp.findOne({
      email: req.body.email,
      otp: req.body.otp,
    })
    if (otpData == null) {
      res.status(400).send('Incorrect OTP')
      return
    }

    //check if username already exists
    const usernameCheck = await checkUsername(req.body.username)
    if (!usernameCheck.status) {
      res.status(400).send(usernameCheck.message)
      return
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //add new user
    const newUser = new user({
      email: req.body.email,
      username: req.body.username,
      hashedpwd: hashedPassword,
      useravatar: process.env.DEFAULT_AVATAR,
    })
    await newUser.save()

    //send auth token
    const token = await createToken(req.body.email)
    res.send(token)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
