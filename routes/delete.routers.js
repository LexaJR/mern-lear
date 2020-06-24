const { Router } = require("express")
const Worker = require("../models/workers")
const directoryPlaceWork = require("../models/directoryPlaceWork")
const directoryPosts = require("../models/directoryPost")
const reports = require("../models/reports")

const router = Router()

router.post("/unsetWorker", async (req, res) => {
  try {
    if (req.body[0] && req.body[1]) {
      await reports.updateOne(
        { _id: req.body[0] },
        { $pull: { responsibleWorker: req.body[1] } }
      )

      res.json("Удален сотрудник")
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
  }
})

module.exports = router
