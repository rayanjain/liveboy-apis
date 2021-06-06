const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')
const imageUpload = require('../controllers/imageUpload')

const username = require('../controllers/change/username')
const profilepicture = require('../controllers/change/profilepicture')
const payinfo = require('../controllers/change/payinfo')
const imageUpoad = require('../controllers/imageUpload')

router.post('/username', auth, username)
router.post('/profilepicture', auth, imageUpoad.single('image'), profilepicture)
router.post('/payinfo', auth, payinfo)

module.exports = router
