const router = require('express').Router()

const BooksController = require('./BooksController')
// category_name: {type: String, required: false}, author_name: {type: String, required: false}, 
// email: {type: String, required: true}, book_name: {type: String, required: true}, 
// price: {type: Number, required: false}, award_name: {type: String, required: false}
router.post('/createBook', BooksController.createBook)

// book_name: {type: String, required: true},
router.get('/getBook', BooksController.getBook)

// category_name: {type: String, required: true}
router.get('/getBookByCategory', BooksController.getBookByCategory)

// not done yet
router.post('/seedData', BooksController.seedData)

module.exports = router