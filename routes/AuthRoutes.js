const validator = require('express-validator')
const route = require('express').Router()
const { login, register, logout } = require('../controllers/AuthController.js')

route.post(
  '/register',
  validator
    .body('username')
    .isLength({min: 5, max: 16})
    .withMessage('Username has to be at least 5 characters length')
    .matches(/^(?!.*\W)/)
    .withMessage('Username can only contain a-z, A-Z, and 0-9'),
  validator
    .body('password')
    .isLength({min: 8})
    .withMessage('Password need to be at least  8 characters long and contain symbol (?, &, %, etc) if necessary'),
  register
)
route.post('/login', login)
route.get('/logout', logout)

module.exports = route