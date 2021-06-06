const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')

const signin = require('../controllers/user/signin')
const signup = require('../controllers/user/signup')
const googlesignin = require('../controllers/user/googlesignin')
const checkusername = require('../controllers/user/checkusername')
const getotp = require('../controllers/user/getotp')
const getinfo = require('../controllers/user/getinfo')
const logout = require('../controllers/user/logout')
const payinfo = require('../controllers/user/payinfo')

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/googlesignin', googlesignin)
router.get('/checkusername/:username', checkusername)
router.post('/getotp', getotp)
router.get('/getinfo', auth, getinfo)
router.get('/logout', auth, logout)
router.get('/payinfo', auth, payinfo)

module.exports = router
