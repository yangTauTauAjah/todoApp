const {Schema, model} = require('mongoose')

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  last_modified: {
    type: Date,
    default: new Date()
  },
  due: {
    type: Date,
    required: true
  },
  is_completed: {
    type: Boolean,
    default: false
  }
})

const UserSchema =  new Schema({
  username: String,
  password: String,
  tasks: [ TaskSchema ]
})

const userModel = model('userData', UserSchema)

module.exports = userModel