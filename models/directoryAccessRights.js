const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameAccessRight: {type: String, required: true},
    possibilityCreateWorker: {type: Boolean, required: true},
    possibilityEditingWorker: {type: Boolean, required: true},
    possibilityCreateReport: {type: Boolean, required: true},
    possibilityEditingReport: {type: Boolean, required: true},
    possibilityCreateUser: {type: Boolean, required: true},
    possibilityEditingUser: {type: Boolean, required: true}
})

//module.exports = model('directoryAccessRights', schema)