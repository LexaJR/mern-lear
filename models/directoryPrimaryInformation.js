const {Schema, model} = require('mongoose')

const schema = new Schema({
    namePrimaryInformation: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('directoryPrimaryInformation', schema)