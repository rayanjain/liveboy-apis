const { v4: uuidv4 } = require('uuid')
const user = require('../../models/user')
const s3 = require('../../S3Client')

module.exports = async function (req, res) {
  try {
    //create image name
    const fileKey = uuidv4() + '.png'
    //add image to bucket
    await s3
      .putObject({
        Bucket: 'useravatar',
        Key: fileKey,
        Body: req.file.buffer,
      })
      .promise()
    //change user avatar url
    const userInfo = await user.findOne({ email: req.email })
    userInfo.useravatar = `https://${process.env.S3_ENDPOINT}/useravatar/${fileKey}`
    await userInfo.save()
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}
