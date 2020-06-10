const {Router} = require('express')
const Worker = require('../models/workers')
const directoryPlaceWork = require('../models/directoryPlaceWork')
const directoryPosts = require('../models/directoryPost')
const reports = require('../models/reports')

const router = Router()

router.post('/unsetWorker',  async (req, res) => {
    try {
        const {id, workerid} = req.body
        console.log(id + "  " + workerid)
        await reports.update({_id: id}, {$unset: {responsibleWorker: workerid}})
        res.json("Удален сотрудник")
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router