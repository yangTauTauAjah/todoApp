const apiRoute = require('express').Router()
const pageRoute = require('express').Router()
const AuthRoute = require('./routes/AuthRoutes.js')
const UserRoute = require('./routes/UserRoutes.js')
const { authorize } = require('./middleware/AuthMiddlware.js')


apiRoute.use('/auth', AuthRoute)
apiRoute.use('/user', authorize, UserRoute)

module.exports = {apiRoute}