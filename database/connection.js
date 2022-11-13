require('dotenv').config()
const mongoose = require('mongoose')

function connect() {

  mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParse: true,
    useUnifiedTopology: true
  })
  console.log('database connected')

}

module.exports = connect