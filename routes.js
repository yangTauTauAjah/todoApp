const apiRoute = require('express').Router()
const pageRoute = require('express').Router()
const AuthRoute = require('./routes/AuthRoutes.js')
const UserRoute = require('./routes/UserRoutes.js')
const { authorize, pageAuthenticate, pageAuthorize } = require('./middleware/AuthMiddlware.js')
const { login, register, home, today, completed, uncompleted, allTask, task } = require('./files.js')


apiRoute.use('/auth', AuthRoute)
apiRoute.use('/user', authorize, UserRoute)

pageRoute.get('/login', pageAuthenticate, async (req, res) => {
  res.write(await login)
  res.end()
})

pageRoute.get('/register', pageAuthenticate, async (req, res) => {
  res.write(await register)
  res.end()
})

pageRoute.get('/', pageAuthorize, async (req, res) => {
  res.write(await home)
  res.end()
})

pageRoute.get('/task', pageAuthorize, async (req, res) => {
  res.write(await task)
  res.end()
})

/* pageRoute.get('/task/today', pageAuthorize, async (req, res) => {
  res.write(await today)
  res.end()
})

pageRoute.get('/task/completed', pageAuthorize, async (req, res) => {
  res.write(await completed)
  res.end()
})

pageRoute.get('/task/uncompleted', pageAuthorize, async (req, res) => {
  res.write(await uncompleted)
  res.end()
}) */

module.exports = {apiRoute,pageRoute}