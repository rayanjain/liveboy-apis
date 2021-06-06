const crypto = require('crypto')
const token = require('../../../models/token')
const redisClient = require('../../../redisClient')

module.exports = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      //create token
      const authToken = crypto.randomBytes(64).toString('hex')
      //add token to mongoDB
      const newToken = new token({
        token: authToken,
        email: email,
      })
      await newToken.save()
      //add token to redis
      redisClient.set(authToken, email, 'EX', 60 * 60 * 24 * 30)
      //return token
      resolve(authToken)
    } catch {
      reject()
    }
  })
}
