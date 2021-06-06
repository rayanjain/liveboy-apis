const stream = require('../../models/stream')
const user = require('../../models/user')
const { v4: uuidv4 } = require('uuid')
const s3 = require('../../S3Client')

module.exports = async function (req, res) {
  try {
    //get user details
    const userInfo = await user.findOne({ email: req.email })
    //add image
    const fileKey = uuidv4() + '.png'
    await s3
      .putObject({
        Bucket: 'thumbnail',
        Key: fileKey,
        Body: req.file.buffer,
      })
      .promise()
    //add stream
    const newStream = new stream({
      email: req.email,
      userinfo: userInfo._id,
      videotitle: req.body.title,
      thumbnail: `https://${process.env.S3_ENDPOINT}/thumbnail/${fileKey}`,
      price: parseFloat(req.body.price),
      views: 0,
      serverurl: process.env.SERVER_URL,
      streamkey: uuidv4(),
      active: true,
      payout: false,
    })
    await newStream.save()
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
