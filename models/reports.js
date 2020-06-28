const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    nameReport: {type: String, required: true},
    typeReport: { type: Types.ObjectId, ref: 'directoryTypeReport' },
    codePaternts: {type: Types.ObjectId, ref: 'reports' },
    base: {
        type: {type: Types.ObjectId, ref: 'directoryTypeBase'},
        name: {type: String},
        date: {type: Date},
        number: {type: String},
        organization: {type: String},
        author: {type: String}
    },
    direction: {type: Types.ObjectId, ref: 'directionsOfReport'},
    caterogies: {type: Types.ObjectId, ref: 'catogoriesReport'},
    pereodicity: {type: Types.ObjectId, ref: 'directoryPereodicity'},
    formResult: {type: String},
    deadline: {type: String},
    responsibleWorker: [{ type: Types.ObjectId, ref: 'workers' }],
    primaryInformation: {type: Types.ObjectId, ref: 'directoryPrimaryInformation'},
    dateCreate: {type: Date},
    dateClose: {type: Date}
})

module.exports = model('reports', schema)