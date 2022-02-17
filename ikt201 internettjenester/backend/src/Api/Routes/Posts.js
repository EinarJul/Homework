const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const PostsSchema = require('../Data/Schemas/PostsSchema')
const PostReviews = require('../Data/Schemas/PostReviews')
const UsersSchema = require('../Data/Schemas/UsersSchema')
const AuthenticationMiddleware = require('../Middleware/AuthenticationMiddleware')
const CategoriesSchema = require('../Data/Schemas/CategoriesSchema')
const dateString = require('../Helpers/getDate')

router.post('/search', async (req, res, next) => {
  const { search } = req.body

  // Check db.posts.getIndexes() to find what fields are used for search
  const categoryData = await PostsSchema.find({
    $text: { $search: search },
  })
    .select([
      '-reviews',
      '-description',
      '-user',
      '-category_id',
      '-image',
      '-_id',
    ])
    .exec()

  res.status(200).json(categoryData.length > 0 ? categoryData : [{}])
  next()
})

router.get('/get', async (req, res, next) => {
  const { slug } = req.query

  if (!slug) {
    return res.status(500).json({
      message: 'Missing slug',
    })
  }

  const data = await PostsSchema.find({
    slug: slug,
  })
    .populate({
      path: 'user',
      model: UsersSchema,
      select: ['name', 'lastname', '_id'],
    })
    .populate({
      path: 'reviews',
      model: PostReviews,
      select: ['date', 'star', 'reviewText', 'postedBy'],
      populate: {
        path: 'postedBy',
        model: UsersSchema,
        select: ['name', 'lastname', '_id'],
      },
    })
    .select(['-_id', '-category_id'])
    .exec()

  if (!data) {
    return res.status(404).json({
      message: 'No data found',
    })
  }

  res.status(200).json(data[0])
  next()
})

router.get('/all', async (req, res, next) => {
  const { slug } = req.query

  if (!slug) {
    return res.status(500).json({
      message: 'Missing slug',
    })
  }

  const data = await CategoriesSchema.find({
    slug: slug,
  }).exec()

  if (!data) {
    return res.status(500).json({
      message: 'No data found',
    })
  }

  const category = data[0]

  const categoryData = await PostsSchema.find({
    category_id: category.id,
  })
    .populate({
      path: 'user',
      model: UsersSchema,
      select: ['name', 'lastname', '_id'],
    })
    .select(['-_id', '-category_id'])
    .exec()

  const resData = {
    categoryId: category.id,
    categoryName: category.name,
    categoryData: categoryData.length > 0 ? categoryData : [{}],
  }

  res.status(200).json(resData)
  next()
})

router.post('/add', [AuthenticationMiddleware], async (req, res, next) => {
  const { title, description, image, categoryId } = req.body
  if (!title || !description || !categoryId) {
    return res.status(500).json({
      message: 'Missing data',
    })
  }

  const strippedName = title.replace(/&/, 'and')
  const slug = strippedName.replace(/\s+/g, '-').toLowerCase()

  const postsSchema = PostsSchema({
    name: title,
    description: description,
    image: image ? image : 'http://localhost:3000/image-not-found.jpg',
    category_id: categoryId,
    user: req.user.id,
    slug: slug,
    created_date: dateString,
  })

  await postsSchema.save((err) => {
    if (err) {
      res.status(405).json({
        message: 'Could not create post',
      })
    } else {
      res.status(200).json({
        message: 'Post created successfully',
      })
    }
  })
  return false
})

router.post('/update', [AuthenticationMiddleware], async (req, res, next) => {})

router.post('/delete', [AuthenticationMiddleware], async (req, res, next) => {})

module.exports = router
