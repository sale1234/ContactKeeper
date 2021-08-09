const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const User = require('../models/User')

// @route         POST api/users
// @description   Register a user
// @access        Public

router.post(
  '/',
  [
    body('name', 'Please add name').not().isEmpty(),
    body('email', 'Please include valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Status 400 - bad request
      return res.status(400).json({ errors: errors.array() })
    }
    res.send('Past')
  }
)

module.exports = router
