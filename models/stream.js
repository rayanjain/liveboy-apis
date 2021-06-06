const mongoogse = require('mongoose')

const stream = mongoogse.Schema({
  email: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  // useravatar: {
  //   type: String,
  //   required: true,
  // },
  userinfo: {
    type: mongoogse.Schema.Types.ObjectId,
    ref: 'user',
  },
  videotitle: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  views: {
    // start with 0
    type: Number,
    required: true,
  },
  serverurl: {
    // fixed URL
    type: String,
    required: true,
  },
  streamkey: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  payout: {
    type: Boolean,
    required: true,
  },
  videourl: {
    type: String,
  },
  starttime: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoogse.model('stream', stream)
