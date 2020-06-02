const {Router} = require('express')
const config = require('config')
const worker = require('../models/workers')
const directoryPlaceWork = require('../models/directoryPlaceWork')
const directoryPosts = require('../models/directoryPost')
const reports = require('../models/reports')
const auth = require('../middleware/auth.middleware')
const router = Router()



module.exports = router
