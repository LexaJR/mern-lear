const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameDirections: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('directionsOfReports', schema)