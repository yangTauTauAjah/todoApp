const route = require('express').Router()
const AuthRoute = require('./routes/AuthRoutes.js')
const UserRoute = require('./routes/UserRoutes.js')

route.use('/auth', AuthRoute)
route.use('/user', UserRoute)

module.exports = route