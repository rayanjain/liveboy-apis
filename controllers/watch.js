const stream = require('../models/stream')
const payment = require('../models/payment')
const authFunction = require('./authFunction')
const redisClient = require('../redisClient')
const { v4: uuidv4 } = require('uuid')

module.exports = async function (req, res) {
  try {
    const streamInfo = await stream
      .findById(req.params.id)
      .populate('userinfo', 'username useravatar -_id')
    if (streamInfo == null) return res.sendStatus(404)
    //check if stream is active
    if (streamInfo.active == false) {
      return res.sendStatus(404)
    }
    //check price
    if (streamInfo.price == 0) {
      var response = await yesPayment(streamInfo)
      streamInfo.views = streamInfo.views + 1
      await streamInfo.save()
      return res.send(response)
    }
    //no auth
    if (
      !req.headers.authorization ||
      !req.headers.authorization.split(' ')[1]
    ) {
      var response = await noPayment(streamInfo)
      return res.send(response)
    }
    //with auth
    const authToken = req.headers.authorization.split(' ')[1]
    const email = await authFunction(authToken)
    //same email
    if (email == streamInfo.email) {
      var response = await yesPayment(streamInfo)
      return res.send(response)
    }
    //check payment status
    const payInfo = await payment.findOne({
      email: email,
      video: req.params.id,
    })
    if (payInfo == null) {
      var response = await noPayment(streamInfo)
      return res.send(response)
    }
    if (payInfo.paymentstatus == true) {
      var response = await yesPayment(streamInfo)
      return res.send(response)
    }
    var response = await noPayment(streamInfo)
    return res.send(response)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

const noPayment = (video) => {
  return new Promise(async (resolve, reject) => {
    try {
      const videoObject = {
        paymentstatus: false,
        thumbnail: video.thumbnail,
        videotitle: video.videotitle,
        userinfo: video.userinfo,
        price: video.price,
      }
      resolve(videoObject)
    } catch (err) {
      console.log(err)
      reject()
    }
  })
}

const yesPayment = (video) => {
  return new Promise(async (resolve, reject) => {
    try {
      var videourl = null
      if (video.videourl) {
        videourl = video.videourl
      } else {
        videourl = await getURL(video.streamkey)
      }
      const videoObject = {
        paymentstatus: true,
        thumbnail: video.thumbnail,
        videotitle: video.videotitle,
        userinfo: video.userinfo,
        videourl: videourl,
        messageurl: process.env.MESSAGE_URL,
      }
      resolve(videoObject)
    } catch (err) {
      console.log(err)
      reject()
    }
  })
}

const getURL = (streamkey) => {
  return new Promise(async (resolve, reject) => {
    try {
      const videoAuth = uuidv4()
      redisClient.set(videoAuth, streamkey, 'EX', 60 * 60 * 10)
      resolve(`${process.env.VIDEO_URL}/${videoAuth}/index.m3u8`)
    } catch (err) {
      console.log(err)
      reject()
    }
  })
}

// module.exports = async function (req, res) {
//   try {
//     //no auth
//     var response = null
//     if (
//       !req.headers.authorization ||
//       !req.headers.authorization.split(' ')[1]
//     ) {
//       response = await noPayment(req.params.id)
//       if (response == null) {
//         return res.sendStatus(404)
//       }
//       return res.send(response)
//     }
//     //auth
//     const authToken = req.headers.authorization.split(' ')[1]
//     const email = await authFunction(authToken)
//     if (email == null) return res.sendStatus(401)
//     //check payment status
//     payInfo = await payment.findOne({ email: email, video: req.params.id })
//     if (payInfo == null) {
//       response = await noPayment(req.params.id)
//       if (response == null) {
//         return res.sendStatus(404)
//       }
//       return res.send(response)
//     }
//     if (!payInfo.paymentstatus) {
//       response = await noPayment(req.params.id)
//       if (response == null) {
//         return res.sendStatus(404)
//       }
//       return res.send(response)
//     }
//     //create video URL
//     response = await yesPayment(req.params.id)
//     if (response == null) {
//       return res.sendStatus(404)
//     }
//     return res.send(response)
//   } catch (err) {
//     console.log(err)
//     res.sendStatus(500)
//   }
// }

// const noPayment = (video_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       var videoObject = null
//       const video = await stream
//         .findById(
//           video_id,
//           'videotitle thumbnail price userinfo videourl active'
//         )
//         .populate('userinfo', 'username useravatar -_id')
//       if (video != null) {
//         if (video.active) {
//           videoObject = {
//             paymentstatus: false,
//             thumbnail: video.thumbnail,
//             videotitle: video.videotitle,
//             userinfo: video.userinfo,
//             price: video.price,
//           }
//         } else {
//           videoObject = null
//         }
//       } else {
//         videoObject = null
//       }
//       resolve(videoObject)
//     } catch {
//       reject()
//     }
//   })
// }

// const yesPayment = (video_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       var videoObject = null
//       const video = await stream
//         .findById(
//           video_id,
//           'videotitle thumbnail price userinfo active streamkey'
//         )
//         .populate('userinfo', 'username useravatar -_id')
//       if (video != null) {
//         if (video.active) {
//           const videourl = await getURL(streamkey)
//           videoObject = {
//             paymentstatus: true,
//             thumbnail: video.thumbnail,
//             videotitle: video.videotitle,
//             userinfo: video.userinfo,
//             videourl: videourl,
//             messageurl: process.env.MESSAGE_URL,
//           }
//         } else {
//           videoObject = null
//         }
//       } else {
//         videoObject = null
//       }
//       resolve(videoObject)
//     } catch {
//       reject()
//     }
//   })
// }

// const getURL = (streamkey) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       resolve(
//         'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8'
//       )
//     } catch {
//       reject()
//     }
//   })
// }
