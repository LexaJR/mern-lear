const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameCategorySupervisedDirection: {type: String, required: true}
})

module.exports = model('directoryCategoriesSupervisedDirections', schema)