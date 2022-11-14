const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserClass = require('../class/userClass.js')
const AuthClass = require('../class/authClass.js')
const { userAuth } = require('../database/model.js')
const { response, errorHandler } = require('../functions.js')

async function login(req, res) {

  const {username, password} = req.body

  try {

    const user = await new UserClass()
      .setUsername(username)
      .getUser()
  
    if (user ?? false) {
  
      if (await bcrypt.compare(password, hash)) {
    
        const auth = new AuthClass()
          .setUserId(user.id)
    
        if (await auth.get() ?? false) {
    
          await auth.renew(1000*60*60*24*7)
          res.cookie('session_id', auth.id, {max_age: 1000*60*60*24*7}) // ms * sec * min * hours * days
    
        } else {
  
          /* const newDoc = await userAuth.create({
            user_id: id,
            last_auth: new Date(),
            expiration: new Date(Date.now() + 1000*60*60*24*7)
          }) */

          const newDoc = await new AuthClass()
            .setUserId(user.id)
            .setLastAuthDate(new Date())
            .setExpirationDate(new Date(Date.now() + 1000*60*60*24*7))
            .add()
    
          res.cookie('session_id', newDoc.id, {max_age: 1000*60*60*24*7})
    
        }
  
        response(res, 200, true, 'Authentication success', {id: user.id, username})
  
      } else response(res, 422, false, 'Authentication failed')
  
    } else response(res, 404, false, 'User not registered, please create a new one')

  } catch(err) { errorHandler(res, err) }

}

async function register(req, res) {

  const {username, password} = req.body

  try {

    const newUser = new UserClass()
      .setUsername(username)
    
    if (await newUser.getUser() ?? false) return response(res, 402, false, 'username already exist')
  
    newUser.setPassword(await bcrypt.hash(password, 10))
    const {id} = await newUser.storeUser()
  
    return response(res, 200, true, 'registration successful', { id, username, password })

  } catch(err) { errorHandler(res, err) }
  
}

/* async function login(req, res) {

  const {username, password} = req.body

  try {

    const user = await new UserClass()
      .setUsername(username)
      .getUser()

    if (await bcrypt.compare(password, user.get('password'))) response(res, 200, true, 'login success')
    else response(res, 422, false, 'wrong password')

  } catch(err) {

    console.error(err)
    response(res, 422, false, err.message)

  }

} */

module.exports = {login, register}