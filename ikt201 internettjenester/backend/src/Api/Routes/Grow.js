const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const SellerRequestsSchema = require('../Data/Schemas/SellerRequestsSchema')
const dateString = require('../Helpers/getDate')

router.post('/form', async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(403).json({
        message: 'You are not authenticated!',
      })
    }

    const decoded = jwt.decode(req.cookies.token, process.env.JWT_SECRET)

    if (decoded.id) {
      const sellerRequestsSchema = SellerRequestsSchema({
        user: decoded.id,
        accepted: false,
        created_date: dateString,
      })

      await sellerRequestsSchema.save((err) => {
        if (err) {
          return res.status(405).json({
            message: 'Could not send form',
          })
        } else {
          return res.status(200).json({
            message: 'Form sent successfully',
          })
        }
      })
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

module.exports = router
