const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    nameReport: {type: String, required: true},
    responsibleWorker: { type: Types.ObjectId, ref: 'workers' },
    mounthlyCheakpoint: {type: Boolean},
    dataCheak: {type: Date},
    categoryUrgentReport: [{ type: Types.ObjectId, ref: 'directoryCategoryUrgentReport' }],
    typeReport: [{ type: Types.ObjectId, ref: 'directoryTypeReport' }],
})

module.exports = model('reports', schema)