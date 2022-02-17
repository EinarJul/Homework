const jwt = require('jsonwebtoken')

const AuthenticationMiddleware = (req, res, next) => {
  if (!req.cookies.token) {
    const error = new Error()
    error.status = 401
    error.message = 'Missing API key'
    return res.status(error.status || 500).json({
      message: error.message || '',
    })
  } else {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        // Remove cookie if something went wrong with verification
        res.clearCookie('token', {
          domain: req.hostname,
          httpOnly: false,
          secure: true,
          samesite: true,
        })

        return res.status(403).json({
          message: 'Token invalid',
        })
      } else {
        //If token is successfully verified
        req.user = token
        next()
      }
    })
  }
}

module.exports = AuthenticationMiddleware
