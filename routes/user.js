const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const auth = require('../middleware/auth')

router.post('/register', async (req, res) => {
  try {
    // reading the data from user
    const { email, password } = req.body
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'User account already exists' })
    }
    // encryption for our password
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    console.log('passwordHash')
    console.log(passwordHash)
    const newUser = new User({
      email: email,
      password: passwordHash
    })
    console.log('newUser')
    console.log(newUser)
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    // reading the data from the user
    const { email, password } = req.body
    // whether the user is already
    const user = await User.findOne({ email: email })
    if (!user) {
      return res
        .status(400)
        .json({ msg: 'User account does not exists' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
    // encryption is happening to the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
      token,
      user: {
        id: user._id
      }
    })
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    // reading the data from user
    // const id = req.query.id
    // console.log("hello")
    const user = await User.findById(req.user)
    res.json({
      id: user._id,
      email: user.email,
      password: user.password
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


module.exports = router