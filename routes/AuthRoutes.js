const route = require('express').Router()
const { login, register } = require('../controllers/AuthController.js')

route.post('/login', login)

route.post('/register', register)

module.exports = route