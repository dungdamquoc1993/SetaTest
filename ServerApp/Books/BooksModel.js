const { model, Schema } = require('mongoose')

const schemaOptions = {
    timestamps: { installed_day: 'created_at' }
}

const Books = new Schema({
    book_name: {type: String, required: true},
    author_id: { type: Schema.Types.ObjectId, default: null, ref: 'Authors' }, 
    category_id: { type: Schema.Types.ObjectId, default: null, ref: 'Categories' }, 
    price: {type: Number, required: false, default: 50000},
    award_name: {type: String, required: false}
}, schemaOptions)

module.exports = model("Books", Books)
