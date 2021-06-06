const checkUsername = require('./functions/checkUsername')

module.exports = async function (req, res) {
  try {
    const check = await checkUsername(req.params.username)
    if (check.status && req.params.username.length > 3) {
      res.sendStatus(200)
    } else {
      res.sendStatus(406)
    }
  } catch {
    res.sendStatus(500)
  }
}
