const express = require('express')
const router = express.Router()
const AuthenticationMiddleware = require('../Middleware/AuthenticationMiddleware')
const jwt = require('jsonwebtoken')
const UsersSchema = require('../Data/Schemas/UsersSchema')
const UserProfileSchema = require('../Data/Schemas/UserProfileSchema')
const ReviewSchema = require('../Data/Schemas/ReviewSchema')
const dateString = require('../Helpers/getDate')

router.get('/get', async (req, res, next) => {
  const { profileId } = req.query
  const decoded = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  const userId = profileId ? profileId : decoded.id

  if (!userId) {
    return res.status(500).json({
      message: 'Missing user ID',
    })
  }

  const profileData = await UsersSchema.find({
    _id: userId,
  })
    .select([
      '-password_hash',
      '-account_type',
      '-_id',
      '-created_date',
      '-__v',
    ])
    .populate({
      path: 'profile',
      model: UserProfileSchema,
      select: ['about', 'faq', 'ads', 'reviews'],
      populate: {
        path: 'reviews',
        model: ReviewSchema,
        select: ['_id', 'stars', 'reviewText', 'date', 'user'],
        populate: {
          path: 'user',
          model: UsersSchema,
          select: ['name', 'lastname'],
        },
      },
    })
    .exec()

  res.status(200).json(profileData[0])
})

router.post(
  '/updateProfile',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    //    get user token, user id
    try {
      const { about, faq, ads } = req.body

      if (!about || !ads || !faq) {
        return res.status(204).json({
          message: 'Missing information',
        })
      }
      const decoded = jwt.decode(req.cookies.token, process.env.JWT_SECRET)

      const profileData = await UsersSchema.find({
        _id: decoded.id,
      })
        .select([
          '-password_hash',
          '-account_type',
          '-_id',
          '-created_date',
          '-__v',
        ])
        .populate({
          path: 'profile',
          model: UserProfileSchema,
          select: ['about', 'faq', 'ads', 'reviews'],
          populate: {
            path: 'reviews',
            model: ReviewSchema,
            select: ['id', 'stars', 'reviewText', 'date'],
          },
        })

        .exec()

      if (!profileData.length) {
        return res.status(404).json({
          message: 'no user found',
        })
      }

      UserProfileSchema.findOne(
        {
          _id: profileData[0].profile,
        },
        (err, doc) => {
          doc.about = about
          doc.faq = faq
          doc.ads = ads
          doc.save().then(() => {
            res.status(200).json({
              message: 'Profile saved successfully',
            })
          })
        }
      )
    } catch (e) {
      return res.status(500).json({
        message: 'Unknown server error',
      })
    }
  }
)

router.post(
  '/addReview',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    try {
      const { profileId } = req.query
      const decoded = jwt.decode(req.cookies.token, process.env.JWT_SECRET)

      if (profileId === decoded.id) {
        return res.status(500).json({
          message: "You can't review yourself",
        })
      }

      const { stars, reviewText } = req.body

      if (!stars || !reviewText) {
        return res.status(500).json({
          message: 'Not enough information',
        })
      }

      if (reviewText === '') {
        return res.status(204).json({
          message: 'You need some text in the body',
        })
      }

      const userProfileData = await UserProfileSchema.find({
        user: profileId,
      }).exec()

      if (!userProfileData.length) {
        return res.status(500).json({
          message: 'User profile not found',
        })
      }

      const newReview = new ReviewSchema({
        user: decoded.id,
        stars: stars,
        reviewText: reviewText,
        date: dateString,
      })

      await newReview.save(function (err, prof) {
        if (err) {
          return res.status(500).json({
            message: 'something went wrong',
          })
        }
      })

      UserProfileSchema.findOneAndUpdate(
        { _id: userProfileData[0]._id },
        { $push: { reviews: newReview._id } },
        (err, data) => {
          if (err) {
            throw err
          } else {
            return res.status(200).json(data)
          }
        }
      )
    } catch (e) {
      return res.status(500).json({
        message: 'Unknown server error',
      })
    }
  }
)

module.exports = router
