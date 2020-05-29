const {Schema, model} = require('mongoose')

const schema = new Schema({
    namePost: {type: String, required: true}
})

module.exports = model('directoryPost', schema)