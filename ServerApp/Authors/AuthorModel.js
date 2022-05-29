const {model, Schema} = require('mongoose')

const schemaOptions = {
    timestamps: { installed_day: 'created_at' }
}

const Authors = new Schema({
    author_name: { type: String, default: ''},
    user_id: { type: Schema.Types.ObjectId, default: null, ref: 'Users' }, 

}, schemaOptions)

module.exports = model("Authors", Authors)
