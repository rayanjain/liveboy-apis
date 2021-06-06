const mongoogse = require('mongoose')

const payment = mongoogse.Schema({
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // video_id: {
  //   type: String,
  //   required: true,
  // },
  video: {
    type: mongoogse.Schema.Types.ObjectId,
    ref: 'stream',
  },
  paymentstatus: {
    type: Boolean,
    required: true,
  },
  videourl: {
    type: String,
  },
  messageurl: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoogse.model('payment', payment)
