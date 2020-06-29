const { Router } = require("express")
const Worker = require("../models/workers")
const directoryPlaceWork = require("../models/directoryPlaceWork")
const directoryPosts = require("../models/directoryPost")
const directoryTypeReport = require("../models/directoryTypeReport")
const directoryTypeBase = require("../models/directoryTypeBase")
const directionsOfReports = require("../models/directionsOfReports")
const categoriesReport = require("../models/categoriesReport")
const directoryPeriodicity = require("../models/directoryPeriodicity")
const directoryPrimaryInformation = require("../models/directoryPrimaryInformation")
const reports = require("../models/reports")
const { check, validationResult } = require("express-validator")
const router = Router()


router.post("/all", [], async (req, res) => {
  try {
    const typereport = new directoryTypeReport({ nameTypeReport: "Второй тип отчета"})
    await typereport.save()
    const basetype = new directoryTypeBase({ nameTypeBase: "Второй тип основания"})
    await basetype.save()
    const direc = new directionsOfReports({ nameDirections: "Второе направление отчета"})
    await direc.save()
    const categ = new categoriesReport({ nameCategories: "Вторая категория отчета"})
    await categ.save()
    const period = new directoryPeriodicity({ namePeriodicity: "Вторая переодичность"})
    await period.save()
    const info = new directoryPrimaryInformation({ namePrimaryInformation: "Вторая первичная информация"})
    await info.save()
    res.status(201).json({ message: "report создан" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
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
        name,
        surname,
        patronymic,
        phoneNumber,
        email,
        placeWork,
        namePost,
      } = req.body

      const worker = new Worker({
        name,
        surname,
        patronymic,
        phoneNumber,
        email,
        placeWork,
        post: namePost,
      })
      await worker.save()
      res.status(201).json({ message: "Сотрудник создан" })
    } catch (error) {
      res.status(500).json({ message: "Что-то пошло не так" })
    }
  }
)
router.post("/placeWork", [], async (req, res) => {
  try {
    const { namePlaceWork } = req.body
    const placeWork = new directoryPlaceWork({ namePlaceWork })
    await placeWork.save()
    res.status(201).json({ message: "Место работы создано" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
router.post("/post", [], async (req, res) => {
  try {
    const { namePost } = req.body
    const placeWork = new directoryPosts({ namePost })
    await placeWork.save()
    res.status(201).json({ message: "должность создана" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
router.post("/report", [], async (req, res) => {
  try {
    const { nameReport,typeReport,codePaternts,baseType,baseName,baseDate,baseNumber,baseOrganization,baseAuthor,
    direction,caterogies,pereodicity,formResult,deadline,responsibleWorker,primaryInformation,dataCreate,dataClose} = req.body
    const report = new reports({ nameReport, typeReport, codePaternts, base: {type: baseType, name: baseName, date: baseDate, number: baseNumber, organization: baseOrganization, author: baseAuthor}, direction, caterogies, pereodicity, formResult, deadline, responsibleWorker, primaryInformation, dataCreate, dataClose})
    await report.save()
    res.status(201).json({ message: "Отчет создан" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
router.post("/periodicity", [], async (req, res) => {
  try {
    const { namePeriodicity} = req.body
    const Periodicity = new directoryPeriodicity({ namePeriodicity })
    await Periodicity.save()
    res.status(201).json({ message: "Переодчиность создана" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
router.post("/categoriesReport", [], async (req, res) => {
  try {
    const { nameCategories} = req.body
    const categor = new categoriesReport({ nameCategories })
    await categor.save()
    res.status(201).json({ message: "Категория создана" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
router.post("/directions", [], async (req, res) => {
  try {
    const { nameDirections} = req.body
    const categor = new directionsOfReports({ nameDirections })
    await categor.save()
    res.status(201).json({ message: "Направление создано" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})
router.post("/primaryinformation", [], async (req, res) => {
  try {
    const { namePrimaryInformation} = req.body
    const categor = new directoryPrimaryInformation({ namePrimaryInformation })
    await categor.save()
    res.status(201).json({ message: "Уровень сбора первичной информации создан" })
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" })
  }
})


module.exports = router
