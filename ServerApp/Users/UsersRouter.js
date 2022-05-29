const router = require('express').Router()

const userController = require('./UserController')
// email: required, password: required
router.post('/signin', userController.signInAndSignUp) 
// user_name, email: required, password: required
router.post('/signup', userController.signInAndSignUp)
// numberOfDocs : {type: number, required: true}, 
// password: {type: boolean, required: false}, date_of_birth: {type: boolean, required: false}, 
// gender: {type: boolean, required: false}, address :{type: boolean, required: false}
router.post('/seedData', userController.seedData) 

module.exports = router