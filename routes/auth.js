const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
var User = require('../models/User')

// @route         GET api/auth
// @description   Get a logged in user
// @access        Private
router.get('/', (req, res) => {
  res.send('Get logged in user')
})

// @route         POST  api/auth
// @description   Auth user and get token
// @access        Public

router.post(
  '/',
  [
    body('email', 'Please include valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Status 400 - bad request
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      // If email is not good
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      // If email is good, but pass is not
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
