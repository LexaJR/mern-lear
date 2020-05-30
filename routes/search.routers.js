const {Router} = require('express')
const config = require('config')
const worker = require('../models/workers')
const directoryPlaceWork = require('../models/directoryPlaceWork')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.get('/',  async (req, res) => {
  try {
    const workers = await worker.find()
    res.json(workers)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const worker = await worker.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})
router.post('/med', async (req, res) => {
  try {
    console.log("start")
    const med = await directoryPlaceWork.find()
    console.log(med)
    res.json(med)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
