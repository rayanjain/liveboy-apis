const mongoogse = require('mongoose')

const otp = mongoogse.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
})

module.exports = mongoogse.model('otp', otp)
