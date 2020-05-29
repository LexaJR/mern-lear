const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    patronymic: {type: String, required: true},
    phoneNumber: {type: String},
    email: {type: String},
    placeWork: {type: Types.ObjectId, ref: 'directoryPlaceWork' },
    post: {type: Types.ObjectId, ref: 'directoryPost' },
    vacation: {type: Boolean}
})

module.exports = model('workers', schema)