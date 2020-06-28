const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    patronymic: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    phoneNumberWork: {type: String},
    email: {type: String},
    telegram: {type: String},
    placeWork: {type: Types.ObjectId, ref: 'directoryPlaceWork', required: true},
    post: {type: Types.ObjectId, ref: 'directoryPost', required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
    
})

module.exports = model('workers', schema)