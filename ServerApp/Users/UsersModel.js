const { model, Schema } = require('mongoose')

const schemaOptions = {
    timestamps: { installed_day: 'created_at' }
}

const Users = new Schema({
    
    author_id: { type: Schema.Types.ObjectId, default: null, ref: 'Authors' },
    user_name: { type: String, default: '' },
    email: { type: String, default: '', required: true },
    password: { type: String, require: true },
    tokens: [{ type: String, require: false }],
    date_of_birth: { type: Date, required: false },
    gender: { type: Boolean, default: false }, // true is male m false is female
    address: { type: String, require: false }

}, schemaOptions)

module.exports = model("Users", Users)
