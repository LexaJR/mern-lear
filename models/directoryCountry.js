const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameCountry: {type: String, required: true}
})

module.exports = model('directoryCountry', schema)