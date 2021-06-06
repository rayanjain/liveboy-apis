const { OAuth2Client } = require('google-auth-library')
const createToken = require('./functions/createToken')
const user = require('../../models/user')
const checkusername = require('./functions/checkUsername')

module.exports = async function (req, res) {
  try {
    //check id_token
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    //check if email exists
    const userData = await user.findOne({
      email: payload.email,
    })
    if (userData == null) {
      //create new user
      var newUsername = payload.email.split('@')[0]
      var usernameCheck = await checkusername(newUsername)
      if (!usernameCheck.status) {
        newUsername = 'user_' + Math.random().toString(36).substring(7)
        usernameCheck = await checkusername(newUsername)
        while (!usernameCheck.status) {
          newUsername = 'user_' + Math.random().toString(36).substring(7)
          usernameCheck = await checkusername(newUsername)
        }
      }
      const newUser = new user({
        email: payload.email,
        useravatar: payload.picture,
        username: newUsername,
      })
      await newUser.save()
    }
    //create auth token
    const token = await createToken(payload.email)
    res.send(token)
  } catch {
    res.sendStatus(500)
  }
}
