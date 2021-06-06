const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')
const imageUpload = require('../controllers/imageUpload')

const addstream = require('../controllers/streams/addstream')
const getstreams = require('../controllers/streams/getstreams')
const deletestream = require('../controllers/streams/deletestream')

router.get('/', auth, getstreams)
router.post('/', auth, imageUpload.single('image'), addstream)
router.delete('/:id', auth, deletestream)

module.exports = router
