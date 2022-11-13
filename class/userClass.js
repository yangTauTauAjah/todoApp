const userModel = require('../database/model.js')
const mongoose = require('mongoose')

class User {

  constructor() {
    this.user_id = null
    this.username = null
    this.password = null
  }

  setUserId(id) { this.user_id = new mongoose.Types.ObjectId(id); return this }
  setUsername(name) { this.username = name; return this }
  setPassword(password) { this.password = password; return this }

  async storeUser() {
    return await userModel.create({
      username: this.username,
      password: this.password
    })
  }

  async getUser() {
    if (this.user_id ?? false) return await userModel.findById(this.user_id).exec()
    else return await userModel.findOne({username: this.username}).exec()
  }

  async updateUser() {

    const doc = await userModel
      .findOneAndUpdate(
        { _id: this.user_id },
        {
          username: this.username,
          password: this.password
        }
      ).exec()
    
    return await doc.save()

  }

  async removeUser() {
    return await userModel.findOneAndDelete({ _id: this.user_id }).exec()
  }
  
}

module.exports = User