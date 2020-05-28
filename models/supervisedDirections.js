const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameSupervisedDirection: {type: String, required: true},
    categorySupervisedDirection: [{ type: Types.ObjectId, ref: 'directoryCategorySupervisedDirection' }],
    responsibleWorker: [{ type: Types.ObjectId, ref: 'workers' }]
})

//module.exports = model('superDirections', schema)