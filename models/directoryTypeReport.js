const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameTypeReport: {type: String, required: true}
})

//module.exports = model('directoryTypeReport', schema)