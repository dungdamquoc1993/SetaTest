const Categories = require('./CategoriesModel')
const Users = require('../Users/UsersModel')
const mongoose = require('mongoose')

const CategoriesController = {}

CategoriesController.createCategory = async function (req, res) {
    try {
        const { email, category_name } = req.body
        let user = await Users.findOne({ email })
        if (!user) { // check if user exist 
            return res.status(403).json({
                status: false,
                message: 'You need account on Seta to create an categories',
                data: null
            })
        }
        if (!category_name) { // check if user exist 
            return res.status(403).json({
                status: false,
                message: 'missing required field',
                data: null
            })
        }
        const existingCategory = await Categories.findOne({category_name})
        if (existingCategory) {
            return res.status(401).json({
                status: false,
                message: 'category with this name is already exist',
                data: null
            })
        }
        const session = await mongoose.startSession();
        session.startTransaction();

        const newCategory = new Categories({ category_name })

        await newCategory.save({ session })
        await session.commitTransaction()
        session.endSession();

        return res.status(200).json({
            status: true,
            message: 'Thank you for creating new category',
            data: newCategory
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }
}

CategoriesController.getCategories = async function (req, res) {
    try {
        const categories = await Categories.find()
        return res.status(200).json({
            status: true,
            message: 'get categorie success',
            data: categories
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'unexpect error has caused',
            data: null
        })
    }
}

CategoriesController.seedData = async function (req, res) {
    return res.status(400).json({
        status: false,
        message: 'Too much of test I will do it later',
        data: null
    })
}

module.exports = CategoriesController