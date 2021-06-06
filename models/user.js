const mongoogse = require('mongoose')

const user = mongoogse.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashedpwd: {
    type: String,
  },
  useravatar: {
    type: String,
    required: true,
  },
  contact_id: {
    type: String,
  },
  fund_account_id: {
    type: String,
  },
  fund_account_type: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoogse.model('user', user)
