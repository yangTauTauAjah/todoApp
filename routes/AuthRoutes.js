const route = require('express').Router()
const { login, register, logout } = require('../controllers/AuthController.js')

route.post('/register', register)
route.post('/login', login)
route.get('/logout', logout)

module.exports = route