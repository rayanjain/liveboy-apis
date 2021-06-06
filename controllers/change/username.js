const checkUsername = require('../user/functions/checkUsername')
const user = require('../../models/user')

module.exports = async function (req, res) {
  try {
    //validate username
    const usernameCheck = await checkUsername(req.body.username)
    if (!usernameCheck.status) {
      res.status(400).send(usernameCheck.message)
      return
    }
    //change username
    const userInfo = await user.findOne({ email: req.email })
    userInfo.username = req.body.username
    await userInfo.save()
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}
