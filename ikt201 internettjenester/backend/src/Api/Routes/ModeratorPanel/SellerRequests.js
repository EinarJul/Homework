const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const SellerRequestsSchema = require('../../Data/Schemas/SellerRequestsSchema')
const UsersSchema = require('../../Data/Schemas/UsersSchema')
const AuthenticationMiddleware = require('../../Middleware/AuthenticationMiddleware')
const dateString = require('../../Helpers/getDate')

router.get('/seller-requests/get', async (req, res, next) => {
  const data = await SellerRequestsSchema.find({})
    .populate({
      path: 'user',
      model: UsersSchema,
      select: ['name', 'lastname', '_id', 'nickname'],
    })
    .exec()

  if (!data) {
    return res.status(500).json({
      message: 'No data found',
    })
  }

  res.status(200).json(data)
  next()
})

router.put(
  '/seller-requests/accept',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    try {
      const { id, userId } = req.body.id

      await SellerRequestsSchema.findOneAndDelete({ id: id }).then(() => {
        res.status(200).json({
          message: 'Successfully deleted seller request!',
        })
      })

      UsersSchema.findOne(
        {
          id: userId,
        },
        (err, doc) => {
          doc.account_type = 'seller'
          doc.save().then(() => {
            res.status(200).json({
              message: 'User updated successfully',
            })
          })
        }
      )

      next()
    } catch (e) {
      return res.status(500).json({
        message: 'Unknown server error',
      })
    }
    next()
  }
)

router.delete(
  '/seller-requests/delete',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    try {
      const { id } = req.body.id

      await SellerRequestsSchema.findOneAndDelete({ id: id }).then(() => {
        return res.status(200).json({
          message: 'Successfully deleted seller request!',
        })
      })
    } catch (e) {
      return res.status(500).json({
        message: 'Unknown server error',
      })
    }
  }
)

module.exports = router
