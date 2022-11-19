require('dotenv').config()
const fs = require('fs')
const path = require('path')
const dbConnect = require('./database/connection.js')
const route = require('./routes')
const { clearBody } = require('./functions.js')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT

dbConnect()

/* static files */

app.use('/static/style', express.static(path.join(__dirname, 'res/style')))
app.use('/static/js', express.static(path.join(__dirname, 'res/js')))
app.use('/static/svg/final/logo.png', (req, res) => {

  fs.readFile(path.join(__dirname + '/res/svg/final/logo.png'), (err, data) => {
    if(err) console.error(err)
    res.type('png')
    res.write(data)
    res.end()
  })

})
app.use('/static/svg/final/arrow.png', (req, res) => {

  fs.readFile(path.join(__dirname + '/res/svg/final/arrow.png'), (err, data) => {
    if(err) console.error(err)
    res.type('png')
    res.write(data)
    res.end()
  })

})
app.use('/static/svg', express.static(path.join(__dirname, 'res/svg')))

/* pages */

let home
fs.readFile(path.join(__dirname + '/res/pages/activity.html'), (err, data) => {
  if(err) console.error(err)
  home = data
})



app.get('/', async (req, res) => {

  res.contentType('html')
  res.write(home)
  res.end()

})

app.get('*',clearBody)
app.use(cors(), express.urlencoded({extended: false}), express.json(), cookieParser())

app.use((req, res, next) => {
  console.log(`request ip: ${req.ip}`)
  console.log(`request body: ${JSON.stringify(req.body)}`)
  console.log(`cookies: ${JSON.stringify(req.cookies)}`)
  next()
})
app.use('/api', route)
app.all('*', (req, res) => { res.send('not found') })

app.listen(PORT, () => {

  console.log(`listening on port: ${PORT}`)

})