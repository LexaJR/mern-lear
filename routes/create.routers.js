const {Router} = require('express')
const Worker = require('../models/workers')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post(
    '/worker', 
    [],
    async (req, res) => {
    try {
        const {name, surname, patronymic, phoneNumber, email} = req.body
        // console.log(name, surname, patronymic, phoneNumber, email)
        const baseUrl = config.get('baseUrl')
        const worker = new Worker({name, surname, patronymic, phoneNumber, email})
        await worker.save()
        res.status(201).json({message: 'Сотрудник создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})


module.exports = router