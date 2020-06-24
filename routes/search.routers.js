const { Router } = require("express")
const config = require("config")
const worker = require("../models/workers")
const directoryPlaceWork = require("../models/directoryPlaceWork")
const directoryPosts = require("../models/directoryPost")
const reports = require("../models/reports")
const auth = require("../middleware/auth.middleware")
const router = Router()

router.post("/", async (req, res) => {
  try {
    const workers = await worker.find()
    res.json(workers)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const data = await worker.findById(req.params.id)
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/med", async (req, res) => {
  try {
    const data = await directoryPlaceWork.find()
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/searchReports", async (req, res) => {
  try {
    const data = await reports.find()
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/workersReportsById", async (req, res) => {
  try {
    const { id } = req.body
    const data = await reports.findById(id)
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/workersById", async (req, res) => {
  try {
    const { responsibleWorker } = req.body
    // console.log(req.body.responsibleWorker)
    const data = await worker.find({ _id: responsibleWorker })
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/posts", async (req, res) => {
  try {
    const post = await directoryPosts.find()
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/reportsWorkers", async (req, res) => {
  try {
    const { workerid } = req.body
    const post = await reports.find({ responsibleWorker: workerid })
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/workersReports", async (req, res) => {
  try {
    const { responsibleWorker } = req.body
    const data = await worker.find({ _id: responsibleWorker })
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})
router.post("/workersByMed", async (req, res) => {
  try {
    const { placeWork } = req.body
    const data = await worker.find({ placeWork: placeWork })
    res.json(data)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})

module.exports = router
