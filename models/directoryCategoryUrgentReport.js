const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameCategoryUrgent: {type: String, required: true}
})

//module.exports = model('directoryCategoryUrgentReport', schema)