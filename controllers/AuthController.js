const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('express-validator')
const UserClass = require('../class/userClass.js')
const AuthClass = require('../class/authClass.js')
const { userAuth } = require('../database/model.js')
const { response, errorHandler } = require('../functions.js')

async function register(req, res) {

  let validation = validator.validationResult(req)
  if (!validation.isEmpty())
    return response(res, 400, false, validation.array()[0].msg)

  const {username, password} = req.body

  try {

    const newUser = new UserClass()
      .setUsername(username)
    
    if (await newUser.getUser() ?? false) return response(res, 422, false, 'username already exist')
  
    newUser.setPassword(await bcrypt.hash(password, 10))
    const {id} = await newUser.storeUser()
  
    return response(res, 200, true, 'registration successful', { id, username, password })

  } catch(err) { errorHandler(res, err) }
  
}

async function login(req, res) {

  const {username, password} = req.body

  try {

    const user = await new UserClass()
      .setUsername(username)
      .getUser()

      let responseData
  
    if (user ?? false) {

      responseData = {
        user_id: user.id,
        username
      }
  
      if (await bcrypt.compare(password, user.password)) {
    
        const auth = await userAuth.findOne({user_id: user.id}).exec()
    
        if (auth ?? false) {

          new AuthClass()
            .setSessionId(auth.id)
            .remove()
    
        } 
        
        const newSession = await new AuthClass()
          .setUserId(user.id)
          .setLastAuthDate(new Date())
          .setExpirationDate(new Date(Date.now() + Number.parseInt(process.env['COOKIE_EXPIRATION'])))
          .add()
  
        res.cookie('session_id', newSession.id, {
          maxAge: Number.parseInt(process.env['COOKIE_EXPIRATION'])
        })

        responseData.session_id = newSession.id
  
        response(res, 200, true, 'Authentication success', responseData)
  
      } else response(res, 422, false, 'Credential doesn\'t match')
  
    } else response(res, 404, false, 'User not registered, please create a new one')

  } catch(err) { errorHandler(res, err) }

}

async function logout(req, res) {

  const {session_id} = req.cookies
  
  try {

    await new AuthClass()
      .setSessionId(session_id)
      .remove()

    return response(res, 200, true, 'Logged out')

  } catch(err) { errorHandler(res, err) }

}

module.exports = {login, register, logout}