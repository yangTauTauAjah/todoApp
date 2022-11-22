const apiRoute = require('express').Router()
const pageRoute = require('express').Router()
const AuthRoute = require('./routes/AuthRoutes.js')
const UserRoute = require('./routes/UserRoutes.js')
const { login, register, home, task } = require('./files.js')
const { authorize, pageAuthenticate, pageAuthorize } = require('./middleware/AuthMiddlware.js')
const { sendHTML } = require('./functions.js')


apiRoute.use('/auth', AuthRoute)
apiRoute.use('/user', authorize, UserRoute)

pageRoute.get('/login', pageAuthenticate, sendHTML(login))
pageRoute.get('/register', pageAuthenticate, sendHTML(register))
pageRoute.get('/', pageAuthorize, sendHTML(home))
pageRoute.get('/task', pageAuthorize, sendHTML(task))

module.exports = {apiRoute,pageRoute}