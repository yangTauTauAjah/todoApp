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

module.exports = {response}