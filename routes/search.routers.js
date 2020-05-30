const {Router} = require('express')
const config = require('config')
const worker = require('../models/workers')
const directoryPlaceWork = require('../models/directoryPlaceWork')
const directoryPosts = require('../models/directoryPost')
const reports = require('../models/reports')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.post('/',  async (req, res) => {
  try {
    const workers = await worker.find()
    res.json(workers)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await worker.findById(req.params.id)
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/med', async (req, res) => {
  try {
    const data = await directoryPlaceWork.find()
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/posts', async (req, res) => {
  try {
    const post = await directoryPosts.find()
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/reportsWorkers', async (req, res) => {
  try {
    const {workerid} = req.body
    const post = await reports.find({responsibleWorker: workerid})
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
