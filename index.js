require('dotenv').config()
const { login, register, home, todoList } = require('./files.js')
const path = require('path')
const dbConnect = require('./database/connection.js')
const { apiRoute, pageRoute } = require('./routes')
const { pageAuthenticate, pageAuthorize } = require('./middleware/AuthMiddlware.js')
const { clearBody } = require('./functions.js')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

dbConnect()

app.get('*', clearBody)
app.use(cors(), express.urlencoded({ extended: false }), express.json(), cookieParser())

app.use((req, res, next) => {
  console.log(`${req.ip} ${req.method} ${req.path}`)
  console.log(`request query: ${JSON.stringify(req.query)}`)
  console.log(`request body: ${JSON.stringify(req.body)}`)
  console.log(`cookies: ${JSON.stringify(req.cookies)}`)
  next()
})

/* static files */

app.use('/static/style', express.static(path.join(__dirname, 'res/style')))
app.use('/static/js', express.static(path.join(__dirname, 'res/js')))
app.use('/static/svg', express.static(path.join(__dirname, 'res/svg')))

/* routes */

app.use('/api', apiRoute)
app.use('/', pageRoute)

/* app.get('/login.html', pageAuthenticate, express.static(path.join(__dirname, 'res/pages')))
app.get('/register.html', pageAuthenticate, express.static(path.join(__dirname, 'res/pages')))
app.use('/', pageAuthorize, express.static(path.join(__dirname, 'res/pages'))) */

app.all('*', (req, res) => { res.send('not found') })

app.listen(PORT, () => {

  console.log(`listening on port: ${PORT}`)

})