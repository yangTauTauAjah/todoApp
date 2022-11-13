const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserClass = require('../class/userClass.js')
const { response } = require('../functions.js')

async function login(req, res) {

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

}

async function register(req, res) {

  const {username, password} = req.body

  try {

    const newUser = new UserClass()
      .setUsername(username)
    
    if (await newUser.getUser() ?? false) return response(res, 402, false, 'username already exist')
  
    newUser.setPassword(await bcrypt.hash(password, 10))
    const {_id} = await newUser.storeUser()
  
    return response(res, 200, true, 'registration successful', { _id, username, password })

  } catch(err) {

    console.error(err)
    response(res, 422, false, err.message)

  }
}

module.exports = {login, register}