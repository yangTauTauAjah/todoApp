require('dotenv').config()
const { urlencoded, json } = require('express')
const express = require('express')
const dbConnect = require('./database/connection.js')
const app = express()
const PORT = process.env.PORT
const route = require('./routes')

dbConnect()

app.use(urlencoded({extended: false}))
app.use(json())

app.use('/api', route)
app.all('*', (req, res) => { res.send('not found') })

app.listen(PORT, () => {

  console.log(`listening on port: ${PORT}`)

})