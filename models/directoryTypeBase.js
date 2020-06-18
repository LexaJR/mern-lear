const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameTypeBase: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('directoryTypeBase', schema)