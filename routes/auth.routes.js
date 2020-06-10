const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()

router.post(
    '/register', 
    [
        check('email', 'Некоректный email').isEmail(),
        check('password', 'Пароль не соответствует требованиям').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Некоректные данные при регистрации'})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: 'Пользователь создан'})

    } catch (error) {
        res.status(500).json({ message: "Что-то пошло не так"})
    }
})

router.post(
    '/login',
    async (req, res) => {

      const {email, password} = req.body
  
      const user = await User.findOne({ email })
  
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
  
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )
  
      res.json({ token, userId: user.id })
  
  })

module.exports = router