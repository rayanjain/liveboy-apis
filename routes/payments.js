const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')

const history = require('../controllers/payments/history')
const getpaid = require('../controllers/payments/getpaid')
const startpayment = require('../controllers/payments/startpayment')
const confirm = require('../controllers/payments/confirm')

router.get('/history', auth, history)
router.get('/getpaid/:id', auth, getpaid)
router.get('/startpayment/:id', auth, startpayment)
router.post('/confirm', auth, confirm)

module.exports = router
