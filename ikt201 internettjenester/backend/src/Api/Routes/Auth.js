const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid').v4()
const sha256 = require('crypto-js/sha256')
const UsersSchema = require('../Data/Schemas/UsersSchema')
const UserProfileSchema = require('../Data/Schemas/UserProfileSchema')
const dateString = require('../Helpers/getDate')
const AuthenticationMiddleware = require('../Middleware/AuthenticationMiddleware')

router.post('/register', async (req, res, next) => {
  const { nickname, name, lastname, age, email, password } = req.body
  let message = ''

  if (!nickname || !email || !password || !name || !age || !lastname) {
    return res.status(403).json({
      message: 'You need to provide more information',
    })
  }

  if (req.cookies.token) {
    return res.status(403).json({
      message:
        'You are already authenticated, logout before trying to register',
    })
  }

  const hash = sha256(password).toString()
  const userData = await UsersSchema.find({
    email: email,
  }).exec()

  // User data doesn't exists, insert new document
  if (userData[0] === undefined) {
    const userModel = UsersSchema({
      // _id: uuidv4.toString(),
      nickname: nickname,
      name: name,
      lastname: lastname,
      age: age,
      email: email,
      password_hash: hash,
      created_date: dateString,
    })

    await userModel.save(async (err) => {
      if (err) {
        return res.status(405).json({
          message: 'Could not create account',
          err: err,
        })
      }
    })

    const profileData = await UserProfileSchema({
      user: userModel._id,
      about: '',
      faq: '',
      ads: '',
      review: [],
    })

    await profileData.save((err) => {
      if (err) {
        return res.status(405).json({
          message: 'Could not create account profile',
          err: err,
        })
      }
    })

    const userModelCopy = userModel
    userModelCopy.profile = profileData.id
    const newUserData = await UsersSchema.replaceOne(userModel, userModelCopy)

    if (newUserData.nModified > 0) {
      return res.status(200).json({
        message: 'Ok, account created!',
      })
    } else {
      return res.status(200).json({
        message: 'Could not link profile!',
      })
    }
  } else {
    return res.status(403).json({
      message: 'This email is already used',
    })
  }
  next()
})

router.post('/authenticate', async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(403).json({
      message: 'Missing arguments',
    })
  }

  if (req.cookies.token) {
    return res.status(403).json({
      message: 'You are already authenticated',
    })
  }

  const hash = sha256(password).toString()
  const userData = await UsersSchema.find({
    email: email,
    password_hash: hash,
  }).exec()

  if (userData[0] !== undefined) {
    const payload = {
      id: userData[0]._id,
    }

    jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) {
        return res.status(500).json({
          message: 'Could not create auth token',
        })
      }

      if (!req.cookies.token) {
        res.cookie('token', token, {
          domain: req.hostname,
          httpOnly: false,
          secure: false,
          samesite: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })

        return res.status(200).json({
          message: 'Authenticated successfully',
        })
      } else {
        return res.status(403).json({
          message: 'You are already authenticated',
        })
      }

      next()
    })
  } else {
    return res.status(403).json({
      message: 'Access forbidden',
    })
  }
})

router.post('/logout', async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(403).json({
      message: 'You are already logged out',
    })
  }

  res.clearCookie('token', {
    domain: req.hostname,
    httpOnly: false,
    secure: false,
    samesite: true,
  })

  return res.status(200).json({
    message: 'You have been logged out',
  })
})

router.post('/current', [AuthenticationMiddleware], async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(403).json({
        message: 'You are not authenticated!',
      })
    }

    const verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    if (!verified) {
      res.clearCookie('token', {
        domain: req.hostname,
        httpOnly: false,
        secure: false,
        samesite: true,
      })

      return res.status(403).json({
        message: 'Token invalid :)',
      })
    }

    if (verified.id) {
      const userData = await UsersSchema.find({
        _id: verified.id,
      })
        .select(['-__v', '-password_hash'])
        .exec()

      if (userData) {
        res.status(200).json(userData)
      } else {
        res.status(500).json({
          message: 'This should be illegal!',
        })
      }

      next()
    } else {
      return res.status(500).json({
        message: 'Some wild error occurred...',
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Some wild error occurred...',
    })
  }
})

router.post(
  '/authorize',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    try {
      const verified = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
      if (!verified) {
        res.clearCookie('token', {
          domain: req.hostname,
          httpOnly: false,
          secure: false,
          samesite: true,
        })
        return res.status(403).json({
          message: 'Token invalid :)',
        })
      }

      if (verified.id) {
        const userData = await UsersSchema.findById(verified.id)

        if (userData) {
          res.status(200).json({
            message: 'OK',
            isRoot: userData.root,
          })
        } else {
          res.status(500).json({
            message: 'This should be illegal!',
          })
        }
      } else {
        return res.status(403).json({
          message: 'Something went wrong',
        })
      }
    } catch (err) {
      return res.status(403).json({
        message: err.message,
      })
    }
  }
)

module.exports = router
