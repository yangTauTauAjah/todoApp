const { userAuth, userModel } = require('../database/model.js')
const Auth = require('../class/authClass.js')
const User = require('../class/userClass.js')
const { response } = require('../functions.js')

async function authorize(req, res, next) {

  const {session_id} = req.cookies

  const authClass = new Auth()
    .setSessionId(session_id)

  const auth = await authClass.get()

  if (auth ?? false) {

    if (auth.expiration.getTime() >= Date.now()) {

      await authClass.renew(Number.parseInt(process.env['COOKIE_EXPIRATION']))
      req.body.userdata = { session: session_id, id: auth.user_id }
      next()

    } else {

      auth.delete()
      response(res, 422, false, 'Session expired, please login')

    }

  } else response(res, 422, false, 'Authorization failed, please login')

}

module.exports = { authorize }