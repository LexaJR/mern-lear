const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    nameCategories: {type: String, required: true},
    dataCreate: {type: Date},
    dataClose: {type: Date}
})

module.exports = model('categoriesReport', schema)