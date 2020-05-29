const {Schema, model} = require('mongoose')

const schema = new Schema({
    nameRegion: {type: String, required: true}
})

module.exports = model('directoryRegions', schema)