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
            .renew(Number.parseInt(process.env['COOKIE_EXPIRATION']))

          console.log('test')
          res.cookie('session_id', auth.id, {maxAge: Number.parseInt(process.env['COOKIE_EXPIRATION'])}) // ms * sec * min * hours * days

          responseData.session_id = auth.id
    
        } else {

          const newDoc = await new AuthClass()
            .setUserId(user.id)
            .setLastAuthDate(new Date())
            .setExpirationDate(new Date(Date.now() + Number.parseInt(process.env['COOKIE_EXPIRATION'])))
            .add()
    
          res.cookie('session_id', newDoc.id, {maxAge: Number.parseInt(process.env['COOKIE_EXPIRATION'])})

          responseData.session_id = newDoc.id
    
        }
  
        response(res, 200, true, 'Authentication success', responseData)
  
      } else response(res, 422, false, 'Credential doesn\'t match')
  
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

module.exports = {login, register}