const {Router} = require('express')
const Worker = require('../models/workers')
const directoryPlaceWork = require('../models/directoryPlaceWork')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()

router.post(
    '/worker',
    async (req, res) => {
    try {
        const {name, surname, patronymic, phoneNumber, email, placeWork} = req.body
        // console.log(name, surname, patronymic, phoneNumber, email)
        const worker = new Worker({name, surname, patronymic, phoneNumber, email, placeWork})
        await worker.save()
        res.status(201).json({message: 'Сотрудник создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})
router.post(
    '/placeWork', 
    [],
    async (req, res) => {
    try {
        const {namePlaceWork} = req.body
        // console.log(name, surname, patronymic, phoneNumber, email)
        const placeWork = new directoryPlaceWork({namePlaceWork: "prif"})
        await placeWork.save()
        res.status(201).json({message: 'Сотрудник создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})


module.exports = router