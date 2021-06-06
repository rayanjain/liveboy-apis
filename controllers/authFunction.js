const token = require('../models/token')
const redisClient = require('../redisClient')
const { promisify } = require('util')
const getRedis = promisify(redisClient.get).bind(redisClient)

module.exports = (authToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check redis
      var email = await getRedis(authToken)
      //check mongoDB
      if (email == null) {
        const getEmail = await token.findOne({ token: authToken })
        if (getEmail == null) {
          email = null
        } else {
          email = getEmail.email
          redisClient.set(authToken, email, 'EX', 60 * 60 * 24 * 30)
        }
      }
      resolve(email)
    } catch {
      reject()
    }
  })
}
