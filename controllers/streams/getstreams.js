const stream = require('../../models/stream')

module.exports = async function (req, res) {
  try {
    const activeStreams = await stream.find({ email: req.email, payout: false })
    res.send(activeStreams)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
