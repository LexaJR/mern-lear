const { Router } = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const router = Router()

router.post("/register", async (req, res) => {
  const { login, password } = req.body
  const candidate = await User.findOne({ login })
  if (candidate) {
    return res
      .status(400)
      .json({ message: "Такой пользователь уже существует" })
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = new User({ login, password: hashedPassword })
  await user.save()
  res.status(201).json({ message: "Пользователь создан" })
})

router.post("/login", async (req, res) => {
  const { login, password } = req.body

  const user = await User.findOne({ login })

  if (!user) {
    return res.status(400).json({ message: "Пользователь не найден" })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Неверный пароль, попробуйте снова" })
  }

  const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
    expiresIn: "1h",
  })

  res.json({ token, userId: user.id })
})

module.exports = router
