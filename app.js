const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')

const user = require('./routes/user')
const change = require('./routes/change')
const streams = require('./routes/streams')
const payments = require('./routes/payments')

const getVideos = require('./controllers/getVideos')
const watch = require('./controllers/watch')

app.use(cors())

app.use(express.json())

app.get('/', getVideos)

app.use('/user', user)
app.use('/change', change)
app.use('/streams', streams)
app.use('/payments', payments)

app.get('/watch/:id', watch)

mongoose.connect(
  process.env.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Database Connected')
  }
)

app.listen(process.env.PORT, () => {
  console.log('Server running on ' + process.env.PORT)
})
