//const token = require('../models/token')
const authFunction = require('./authFunction')

module.exports = async function (req, res, next) {
  try {
    if (req.headers.authorization) {
      const authToken = req.headers.authorization.split(' ')[1]
      const getEmail = await authFunction(authToken)
      if (getEmail == null) {
        res.sendStatus(401)
        return
      }
      req.email = getEmail
      return next()
    }
    res.sendStatus(401)
  } catch {
    res.sendStatus(500)
  }
}
