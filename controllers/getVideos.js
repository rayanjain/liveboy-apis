const stream = require('../models/stream')

module.exports = async function (req, res) {
  try {
    const allStreams = await stream
      .find(
        { active: true },
        'thumbnail videotitle userinfo views price starttime'
      )
      .populate('userinfo', 'username useravatar -_id')
    res.send(allStreams)
  } catch {
    res.sendStatus(500)
  }
}
