const {Schema, model} = require('mongoose')

const schema = new Schema({
    namePeriodicity: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('directoryPeriodicity', schema)