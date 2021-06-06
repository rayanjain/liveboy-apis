const user = require('../../../models/user')

module.exports = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check username length
      if (username.length < 3) {
        return resolve({ status: false, message: 'Username too short' })
      }
      //check regex
      if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        return resolve({ status: false, message: 'Invalid Username' })
      }
      //check if it already exists
      const userData = await user.findOne({
        username: username,
      })
      if (userData == null) resolve({ status: true })
      else return resolve({ status: false, message: 'Username already exists' })
    } catch {
      reject()
    }
  })
}
