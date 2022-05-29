const router = require('express').Router()

const categoriesController = require('./CategoriesController')

// email: required, category_name: required
router.post('/createCategory', categoriesController.createCategory)
// requied none
router.get('/getCategories', categoriesController.getCategories)
// not done yet
router.post('/seedData', categoriesController.seedData)


module.exports = router