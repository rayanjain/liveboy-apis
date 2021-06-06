const user = require('../../models/user')
const createToken = require('./functions/createToken')
const bcrypt = require('bcrypt')

module.exports = async function (req, res) {
  try {
    // validation
    if (!req.body.email) {
      res.status(400).send('Invalid email')
      return
    }
    if (!req.body.password) {
      res.status(400).send('Incorrect Password')
      return
    }
    //check email
    const userData = await user.findOne(
      {
        email: req.body.email,
      },
      'hashedpwd'
    )
    if (userData == null) {
      res.status(401).send('Email does not exist')
      return
    }
    if (!userData.hashedpwd) {
      res.status(401).send('You use Sign in with Google')
      return
    }
    //check Password
    if (!(await bcrypt.compare(req.body.password, userData.hashedpwd))) {
      res.status(401).send('Incorrect Password')
      return
    }
    //create auth token
    const token = await createToken(req.body.email)
    res.send(token)
  } catch {
    res.sendStatus(500)
  }
}
