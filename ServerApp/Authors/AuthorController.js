const Authors = require('./AuthorModel')
const Users = require('../Users/UsersModel')
const mongoose = require('mongoose')

const AuthorController = {}

AuthorController.createAuthor = async function (req, res) {
    try {
        const { email, author_name } = req.body
        let user = await Users.findOne({ email })
        if (!user) { // check if user exist 
            return res.status(403).json({
                status: false,
                message: 'You need account on Seta to create an author',
                data: null
            })
        }
        if (user.author_id) { // check if user already create author
            const author_id = user.author_id.toString()
            const author = await Authors.findById(author_id)
            return res.status(403).json({
                status: false,
                message: 'You are already are an author of seta',
                data: author
            })
        }
        // create new author
        const session = await mongoose.startSession();
        session.startTransaction();
        let newId = new mongoose.mongo.ObjectId()
        let author = { _id: newId, author_name: user.user_name, user_id: user._id.toString() }
        if (author_name) {
            author.author_name = author_name
        }
        user.author_id = newId
        newAuthor = new Authors(author)

        await user.save({ session })
        await newAuthor.save({ session })
        await session.commitTransaction()
        session.endSession();

        return res.status(200).json({
            status: true,
            message: 'congratulation You now are an Author on Seta world',
            data: newAuthor
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }
}

AuthorController.getAuthor = async function (req, res) {
    try {
        const { author_id } = req.body
        if (!author_id) {
            return res.status(403).json({
                status: false,
                message: 'Missing required fields',
                data: null
            })
        }
        const author = await Authors.findById(author_id).populate({
            path: 'user_id'
        })

        if (author) {
            return res.status(200).json({
                status: true,
                message: 'get Author success',
                data: author
            })
        } else {
            return res.status(403).json({
                status: false,
                message: 'Author dose not exist',
                data: null
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

AuthorController.seedData = async function (req, res) {
    return res.status(400).json({
        status: false,
        message: 'Too much of test I will do it later',
        data: null
    })
}

module.exports = AuthorController