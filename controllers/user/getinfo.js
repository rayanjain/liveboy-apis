const user = require('../../models/user')

module.exports = async function (req, res) {
  try {
    const userInfo = await user.findOne(
      { email: req.email },
      'email username useravatar'
    )
    res.send(userInfo)
  } catch {
    res.sendStatus(500)
  }
}
