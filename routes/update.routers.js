const { Router } = require("express")
const worker = require("../models/workers")
const directoryPlaceWork = require("../models/directoryPlaceWork")
const directoryPosts = require("../models/directoryPost")
const reports = require("../models/reports")
const { check, validationResult } = require("express-validator")

const router = Router()

router.post(
  "/worker",
  [check("email", "Некоректный email").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
          message: "Некоректный адрес электроной почты",
        })
      }
      const {
        _id,
        name,
        surname,
        patronymic,
        phoneNumber,
        email,
        placeWork,
        namePost,
      } = req.body

      const doc = await worker.findOne({ _id })

      const update = {
        name,
        surname,
        patronymic,
        phoneNumber,
        email,
        placeWork,
        namePost,
      }
      await doc.updateOne(update)

      res.status(201).json({ message: "Сотрудник отредактирован" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
    }
  }
)
router.post("/addWorkerReport", async (req, res) => {
  try {
    const { id, workerid } = req.body
    const report = await reports.find({ _id: id, responsibleWorker: workerid })
    if (report == "") {
      await reports.update(
        { _id: id },
        { $push: { responsibleWorker: workerid } }
      )

      res.status(201).json({ message: "Сотрудник добавлен" })
    } else {
      res.status(202).json({ message: "Пользователь уже существует" })
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post(
  "/report",
  async (req, res) => {
    try {
      const {
        _id,
        nameReport,
        typeReport,
        codePaternts,
        baseType,
        baseName,
        baseDate,
        baseNumber,
        baseOrganization,
        baseAuthor,
        direction,
        caterogies,
        pereodicity,
        formResult,
        deadline,
        responsibleWorker,
        primaryInformation,
        dataCreate,
        dataClose
      } = req.body
      console.log(req.body)

      const doc = await reports.findOne({ _id })

      const update = {
        nameReport,
        typeReport,
        codePaternts,
        base: {
          type: baseType,
          name: baseName,
          date: baseDate,
          number: baseNumber,
          organization: baseOrganization,
          author: baseAuthor,
        },
        direction,
        caterogies,
        pereodicity,
        formResult,
        deadline,
        responsibleWorker,
        primaryInformation,
        dataCreate,
        dataClose
      }
      await doc.updateOne(update)

      res.status(201).json({ message: "Отчет отредактирован" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
    }
  }
)

module.exports = router

