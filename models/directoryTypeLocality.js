const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameTypeLocality: {type: String, required: true}
})

//module.exports = model('directoryCategoryUrgentReport', schema)