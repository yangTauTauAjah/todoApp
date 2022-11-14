const {Schema, model, ObjectId} = require('mongoose')

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

const UserAuth = new Schema({
  user_id: ObjectId,
  last_auth: Date,
  expiration: Date
})

const userModel = model('userData', UserSchema)
const userAuth = model('userAuth', UserAuth)

module.exports = { userModel, userAuth }