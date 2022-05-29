const mongoose = require('mongoose')
const Books = require('./BooksModel')
const Authors = require('../Authors/AuthorModel')
const Categories = require('../Categories/CategoriesModel')
const Users = require('../Users/UsersModel')

const BookController = {}

BookController.createBook = async function (req, res) {
    try {

        const { category_name, author_name, email, book_name, price, award_name } = req.body
        let user = await Users.findOne({ email })
        if (!user) { // check if user exist 
            return res.status(403).json({
                status: false,
                message: 'You need account on Seta to create an categories',
                data: null
            })
        }
        if (!book_name) {
            return res.status(403).json({
                status: false,
                message: 'missing required fields',
                data: null
            })
        }
        let book = { book_name }
        if (price) book.price = price
        if (award_name) book.award_name = award_name
        if (category_name) {
            const category = await Categories.findOne({ category_name })
            const category_id = category._id.toString()
            book.category_id = category_id
        }
        if (author_name) {
            const author = await Authors.findOne({ author_name })
            const author_id = author._id.toString()
            book.author_id = author_id
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        const newBook = new Books(book)

        await newBook.save({ session })
        await session.commitTransaction()
        session.endSession();
        return res.status(200).json({
            status: true,
            message: 'Thank you for creating new book',
            data: newBook
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }
}

BookController.getBook = async function (req, res) {
    try {
        const { book_name } = req.body
        const book = await Books.findOne({ book_name })
            .populate({ path: 'author_id' })
            .populate({ path: 'category_id' })
        return res.status(200).json({
            status: true,
            message: 'get book information success',
            data: book
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }
}

BookController.getBookByCategory = async function (req, res) {
    try {
        const { category_name } = req.body
        const category = await Categories.findOne({ category_name })
        if (category) {
            const category_id = category._id.toString()
            const books = await Books.find({ category_id })
                .populate({ path: 'author_id' })
                .populate({ path: 'category_id' })
            return res.status(200).json({
                status: true,
                message: 'get book list success',
                data: books
            })
        } else {
            return res.status(400).json({
                status: false,
                message: 'there is no category',
                data: []
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

BookController.seedData = async function (req, res) {
    return res.status(400).json({
        status: false,
        message: 'Too much of test I will do it later',
        data: null
    })
}

module.exports = BookController