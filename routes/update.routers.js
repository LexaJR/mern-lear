const {Router} = require('express')
const worker = require('../models/workers')
const directoryPlaceWork = require('../models/directoryPlaceWork')
const directoryPosts = require('../models/directoryPost')
const reports = require('../models/reports')
const {check, validationResult} = require('express-validator')


const router = Router()

router.post(
    '/worker',
    [
        check('email', 'Некоректный email').isEmail()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Некоректный адрес электроной почты'
            })
        }
        const {_id, name, surname, patronymic, phoneNumber, email, placeWork, namePost} = req.body
        // console.log(name, surname, patronymic, phoneNumber, email, placeWork, namePost)
        
        const doc = await worker.findOne({ _id });

        const update = { name, surname, patronymic, phoneNumber, email, placeWork, namePost };
        await doc.updateOne(update);

        res.status(201).json({message: 'Сотрудник отредактирован'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})
router.post('/addWorkerReport', async (req, res) => {
    try {
      const {id, workerid} = req.body
      console.log(req.body.id + "    " + req.body.workerid)
      const report = await reports.findById(id)
      report.updateOne({_id: id}, {$push: {responsibleWorker: workerid}})
      res.status(201).json({message: 'Сотрудник добавлен'})
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
