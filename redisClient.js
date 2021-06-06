const redis = require('redis')

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
})

client.on('connect', function () {
  console.log('Redis Client Connected')
})

client.on('error', (err) => {
  console.log(err)
})

module.exports = client
