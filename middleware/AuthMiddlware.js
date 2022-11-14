const { userAuth, userModel } = require('../database/model.js')
const { response } = require('../functions.js')

async function authorize(req, res, next) {

  const {session_id} = req.cookies

  const auth = await userAuth.findById({session_id})

  if (auth ?? false) {

    if (auth.expiration.getTime() >= Date.now()) {

      const { username } = await userModel.findById(auth.user_id).updateOne({
        last_auth: new Date(),
        expiration: new Date(Date.now() + 1000*60*60*24*7) // ms * sec * min * hours * days
      }).exec()
      req.body.userdata = { session: auth.id, id: auth.user_id, username }
      next()

    } else {

      auth.delete()
      response(res, 422, false, 'Authorization failed, please login')

    }

  } else response(res, 422, false, 'Authorization failed, please login')

}

module.exports = { authorize }