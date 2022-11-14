function response(res, statusCode = 200, success = true, message = '', data = {}) {
  res.status(statusCode)
  res.json({
      statusCode,
      success,
      message,
      data,
  })

  res.end()
}

function clearBody(req, res, next) {
  req.body = {}
  next()
}

function errorHandler(res, err) {

  console.error(err)
  response(res, 422, false, err.message)

}

module.exports = {response, clearBody, errorHandler}