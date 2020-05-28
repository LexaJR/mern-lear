const {Schema, model} = require('mongoose')

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    acessRight: [{ type: Types.ObjectId, ref: 'directoryAccessRigths' }],
    idWorker: [{ type: Types.ObjectId, ref: 'workers' }]
})

//module.exports = model('User', schema)