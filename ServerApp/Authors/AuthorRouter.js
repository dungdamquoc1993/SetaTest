const router = require('express').Router()

const authorController = require('./AuthorController')
// email: {type: String, required: true}, author_name: {type: String, required: false}
router.post('/createAuthor', authorController.createAuthor)

// author_id: {type: mongoId String, required: true}
router.get('/getAuthor', authorController.getAuthor)

// not done yet
router.post('/seedData', authorController.seedData)


module.exports = router