const { model, Schema } = require('mongoose')

const schemaOptions = {
    timestamps: { installed_day: 'created_at' }
}

const Categories = new Schema({
    category_name: {type: String, required: true}

}, schemaOptions)

module.exports = model("Categories", Categories)
