require('dotenv').config()
const { urlencoded, json } = require('express')
const express = require('express')
const cookieParser = require('cookie-parser')
const dbConnect = require('./database/connection.js')
const app = express()
const PORT = process.env.PORT
const route = require('./routes')
const { clearBody } = require('./functions.js')
const { userModel } = require('./database/model')

dbConnect()

app.get('*', clearBody)
app.use(urlencoded({extended: false}), json(), cookieParser())

app.use('/api', route)
app.all('*', (req, res) => { res.send('not found') })
app.use((req, res) => {
  console.log(`request body: ${req.body}`)
  console.log(`request ip: ${req.ip}`)
})

app.listen(PORT, () => {

  console.log(`listening on port: ${PORT}`)

})