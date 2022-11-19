const {userAuth, userModel} = require('../database/model.js')
const mongoose = require('mongoose')

class Auth {

  constructor() {
    this.session_id = null
    this.user_id = null
    this.last_auth = null
    this.expiration = null
  }

  setSessionId(id) { this.session_id = new mongoose.Types.ObjectId(id); return this }
  setUserId(id) { this.user_id = new mongoose.Types.ObjectId(id); return this }
  setLastAuthDate(date) { this.last_auth = date; return this }
  setExpirationDate(date) { this.expiration = date; return this }

  async get() { return await userAuth.findById(this.session_id).exec() }
  async add() {
    return await userAuth.create({
      user_id: this.user_id,
      last_auth: this.last_auth,
      expiration: this.expiration
    })
  }
  async renew(max_age) {

    return await userAuth.findByIdAndUpdate(this.session_id, {
      last_auth: new Date(),
      expiration: new Date(Date.now() + max_age)
    }).exec()
    
  }
  async isExpired() {
    const auth = await this.get()
    return (auth?.expiration <= Date.now())
  }
  async getUser() { return await userModel.findById(this.user_id).exec() }
  async remove() { return await userAuth.findByIdAndDelete(this.session_id).exec() }

}

module.exports = Auth