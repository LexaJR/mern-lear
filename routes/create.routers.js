const {Router} = require('express')
const Worker = require('../models/workers')
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
        const {name, surname, patronymic, phoneNumber, email, placeWork, namePost} = req.body
        // console.log(name, surname, patronymic, phoneNumber, email, placeWork, namePost)
        
        const worker = new Worker({name, surname, patronymic, phoneNumber, email, placeWork, post: namePost})
        await worker.save()
        res.status(201).json({message: 'Сотрудник создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})
router.post(
    '/placeWork' , 
    [],
    async (req, res) => {
    try {
        const {namePlaceWork} = req.body
        const placeWork = new directoryPlaceWork({namePlaceWork})
        await placeWork.save()
        res.status(201).json({message: 'med создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})
router.post(
    '/post' , 
    [],
    async (req, res) => {
    try {
        const {namePlaceWork} = req.body
        const placeWork = new directoryPosts({namePost: "hi"})
        await placeWork.save()
        res.status(201).json({message: 'med создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})
router.post(
    '/report' , 
    [],
    async (req, res) => {
    try {
        const {nameReport, responsibleWorker} = req.body
        const placeWork = new reports({nameReport, responsibleWorker})
        await placeWork.save()
        res.status(201).json({message: 'report создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})


module.exports = router