const user = require('../../models/token')
const redisClient = require('../../redisClient')

module.exports = async function (req, res) {
  try {
    redisClient.del(req.headers.authorization.split(' ')[1])
    await user.deleteOne({
      token: req.headers.authorization.split(' ')[1],
    })
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
