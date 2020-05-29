const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    namePlaceWork: {type: String, required: true},
    countryPlaceWork: [{ type: Types.ObjectId, ref: 'directoryCountry' }],
    regionPlaceWork: [{ type: Types.ObjectId, ref: 'directoryRegions' }],
    typeLocalityPlaceWork: [{ type: Types.ObjectId, ref: 'directoryTypeLocality' }],
    localityPlaceWork: [{ type: Types.ObjectId, ref: 'directoryLocality' }],
    streetPlaceWork: {type: String, required: true},
    houseNumberPlaceWork: {type: String, required: true},
    phoneNumberResponsibleWorker: {type: String, required: true},
    idFIAS: {type: String}
})

module.exports = model('directoryPlaceWork', schema)