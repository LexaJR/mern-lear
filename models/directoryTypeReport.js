const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameTypeReport: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('directoryTypeReport', schema)