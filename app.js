const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/create', require('./routes/create.routers'))
app.use('/api/search', require('./routes/search.routers'))
app.use('/api/update', require('./routes/update.routers'))
app.use('/api/delete', require('./routes/delete.routers'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('MongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
