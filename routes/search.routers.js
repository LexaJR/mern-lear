const {Router} = require('express')
const config = require('config')
const worker = require('../models/workers')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const workers = await worker.find()
    res.json(workers)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
