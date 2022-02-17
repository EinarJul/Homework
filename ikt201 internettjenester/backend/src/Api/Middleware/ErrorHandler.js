const ErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  })
}

module.exports = ErrorHandler
