const route = require('express').Router()
const AuthRoute = require('./routes/AuthRoutes.js')
const UserRoute = require('./routes/UserRoutes.js')
const { authorize } = require('./middleware/AuthMiddlware.js')


route.use('/auth', AuthRoute)
route.use('/user', authorize, UserRoute)

module.exports = route