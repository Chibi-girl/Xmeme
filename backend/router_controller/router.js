const express = require('express')
const MemeCtrl = require('./controller')
const router = express.Router()					//router routes the api-s to the respective functions
router.get('/memes', MemeCtrl.getMemes)
router.post('/memes', MemeCtrl.createMeme)
router.patch('/memes/:id', MemeCtrl.updateMeme)
router.delete('/memes/:id', MemeCtrl.deleteMeme)
router.get('/memes/:id', MemeCtrl.getMemeById)


module.exports = router
