const stream = require('../../models/stream')

module.exports = async function (req, res) {
  try {
    const streamInfo = await stream.findById(req.params.id)
    if (streamInfo.email != req.email) {
      res.sendStatus(401)
      return
    }
    streamInfo.active = false
    await streamInfo.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
