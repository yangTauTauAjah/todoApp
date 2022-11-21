const { userAuth, userModel } = require('../database/model.js')
const Auth = require('../class/authClass.js')
const User = require('../class/userClass.js')
const { response, errorHandler } = require('../functions.js')

async function authorize(req, res, next) {

  const {session_id} = req.cookies

  try {

    const authClass = new Auth()
      .setSessionId(session_id)
  
    const auth = await authClass.get()
  
    if ((auth ?? false) && auth?.expiration?.getTime() >= Date?.now()) {
  
      await authClass.renew(Number.parseInt(process.env['COOKIE_EXPIRATION']))

      res.cookie('session_id', session_id, {
        maxAge: Number.parseInt(process.env['COOKIE_EXPIRATION'])
      })

      req.body.userdata = {
        session: session_id,
        id: auth.user_id
      }
      next()
  
    } else {
  
      userAuth.find({ expiration: {$lte: Date?.now()} }).exec((err, docs) => {
        if (err) console.error(err)
        docs.forEach(doc => { doc.remove() })
      })
      response(res, 422, false, 'You are not authenticated, please login')
  
    }

  } catch(err) { errorHandler(res, err) }

}

async function pageAuthenticate(req, res, next) {
  const auth = new Auth()
    .setSessionId(req.cookies.session_id)
    .get()
  if (await auth ?? false) res.redirect('/')
  else next()
}

async function pageAuthorize(req, res, next) {
  const auth = new Auth()
    .setSessionId(req.cookies.session_id)
    .get()
  if (await auth ?? false) next()
  else res.redirect('/login')
}

module.exports = { authorize, pageAuthenticate, pageAuthorize }