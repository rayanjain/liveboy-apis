const s3 = require('./S3Client')

var params = {
  Bucket: 'useravatar',
  Key: 'the-dfsahjfh-fdsai.ext',
  Body: 'Rayan Jain Ajmera',
}
s3.putObject(params, function (err, data) {
  if (err) {
    console.log('Error Baby')
    console.log(err, err.stack)
  } else {
    console.log('Done Baby')
    console.log(data)
  }
})

// const expireSeconds = 60 * 5

// const url = s3.getSignedUrl('putObject', {
//   Bucket: 'useravatar',
//   Key: 'undefinedperson-circle.svg',
//   ContentType: 'text',
//   Expires: expireSeconds,
// })
// console.log(url)
