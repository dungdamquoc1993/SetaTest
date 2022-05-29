const Users = require('./UsersModel')
const mongoose = require('mongoose')
const helpers = require('../helpers')
const validator = require('validator')

const UserController = {}

UserController.signInAndSignUp = async function (req, res) {
    try {
        const { user_name, email, password } = req.body
        if (!(typeof (email) == 'string' && email.trim().length > 0) ||
            !(typeof (password) == 'string' && password.trim().length > 0) ||
            !validator.isEmail(email)) {
            return res.status(403).json({
                status: false,
                message: 'missing required fields or email is not valid',
                data: null
            })
        }
        const hashedPassword = helpers.hash(password)
        const existingUser = await Users.findOne({ email })
        if (req.path == '/signin') { // sign-in
            if (existingUser) { // player exist process sign-in
                const passwordIsValid = hashedPassword == existingUser.password
                if (passwordIsValid) { // sign-in success
                    return res.status(200).json({
                        status: true,
                        message: 'sign-in success, welcome back',
                        data: existingUser
                    })
                } else { // error sign-in faled password incorrect
                    return res.status(401).json({
                        status: false,
                        message: 'sign-in failed, password incorrect',
                        data: null
                    })
                }
            } else { // error player dose not exist
                return res.status(403).json({
                    status: false,
                    message: 'sign-in failed, user dose not exist',
                    data: null
                })
            }
        } else if (req.path == '/signup') { // sign-up
            if (existingUser) {
                return res.status(400).json({
                    status: false,
                    message: 'sign-up failed, user with this email are already exist',
                    data: null
                })
            }
            const session = await mongoose.startSession();
            session.startTransaction();
            const newHashedPassword = helpers.hash(password)
            let user = { email, password: newHashedPassword }
            if (user_name) {
                user.user_name = user_name
            }
            newUser = new Users(user)
            await newUser.save({ session })
            await session.commitTransaction()
            session.endSession();
            return res.status(201).json({
                status: true,
                message: 'sign-up success, welcome to Seta world',
                data: newUser
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }
}

UserController.seedData = async function (req, res) {
    try {
        const { numberOfDocs, password, date_of_birth, gender, address } = req.body
        if(!numberOfDocs || (typeof(numberOfDocs) != 'number' && numberOfDocs < 1)) {
            return res.status(401).json({
                status: false,
                message: `missing required fields`,
                data: null
            })
        }
        let insertUsers = []
        let users = await Users.find()
        let numberOfExistingPlayer = users.length
        for (let i = 0; i < numberOfDocs; i++) {
            let user = {}
            let fakeEmail = `fakeEmail${numberOfExistingPlayer + i}@seta.com`
            user.email = fakeEmail
            if (password) {
                const randomPassword = helpers.createRandomString()
                const newHashedRandomPassword = helpers.hash(randomPassword)
                user.password = newHashedRandomPassword
            }
            if (date_of_birth) {
                user.date_of_birth = new Date()
            }
            if (gender) {
                user.gender = true
            }
            if (address) {
                user.address = helpers.createRandomString()
            }
            insertUsers.push(user)
        }
        Users.insertMany(insertUsers)
            .then(data => {
                console.log(data)
                if (data) {
                    return res.status(200).json({
                        status: true,
                        message: 'insert seed data success',
                        data
                    })
                }
            })
            .catch(error => {
                return res.status(401).json({
                    status: false,
                    message: `insert user caught error: ${error}`,
                    data: null
                })
            })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }

}

module.exports = UserController