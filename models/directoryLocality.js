const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameLocality: {type: String, required: true},
    Region: [{ type: Types.ObjectId, ref: 'directoryRegions' }],
    TypeLocality: [{ type: Types.ObjectId, ref: 'directoryTypeLocality' }]
})

//module.exports = model('directoryCountry, schema)