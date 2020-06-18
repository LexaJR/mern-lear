const {Schema, model} = require('mongoose')

const schema = new Schema({
    namePost: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('directoryPost', schema)