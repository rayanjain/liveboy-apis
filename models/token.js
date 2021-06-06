const mongoogse = require('mongoose')

const token = mongoogse.Schema({
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoogse.model('token', token)
