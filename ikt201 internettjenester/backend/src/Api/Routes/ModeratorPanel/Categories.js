const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const CategoriesSchema = require('../../Data/Schemas/CategoriesSchema')
const dateString = require('../../Helpers/getDate')
const AuthenticationMiddleware = require('../../Middleware/AuthenticationMiddleware')

router.get('/categories/get', async (req, res, next) => {
  const data = await CategoriesSchema.find({}).exec()
  res.status(200).json(data)
  next()
})

router.post(
  '/categories/add',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    const { name, categoryDescription, categoryImage } = req.body

    if (!name) {
      return res.status(500).json({
        message:
          'Missing name, or slug. Make sure correct information is send before creating category.',
      })
    }

    const data = await CategoriesSchema.find({
      name: name,
    }).exec()

    if (data.length) {
      return res.status(500).json({
        message: 'Category with that name or slug already exists.',
      })
    }

    const strippedName = name.replace(/&/, 'and')
    const slug = strippedName.replace(/\s+/g, '-').toLowerCase()

    const categoryModel = CategoriesSchema({
      name: name,
      slug: slug,
      categoryDescription: categoryDescription,
      categoryImage: categoryImage,
      parentId: '',
      created_date: dateString,
    })

    await categoryModel.save((err) => {
      if (err) {
        res.status(405).json({
          message: 'Could not create category',
        })
      } else {
        res.status(200).json({
          message: 'Category created successfully',
        })
      }
    })
    return false
  }
)

router.put(
  '/categories/update',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    try {
      const { categoryId, name, description, image } = req.body

      if (!categoryId || !name || !description) {
        return res.status(500).json({
          message: 'Missing data!',
        })
      }

      const data = await CategoriesSchema.find({
        _id: categoryId,
      }).exec()

      if (!data.length) {
        return res.status(500).json({
          message: 'Category doesnt exists!',
        })
      }

      CategoriesSchema.findOne(
        {
          _id: categoryId,
        },
        (err, doc) => {
          console.log(err)
          doc.name = name
          doc.categoryDescription = description
          doc.categoryImage = image
            ? image
            : 'http://localhost:3000/image-not-found.jpg'
          doc.save().then(() => {
            res.status(200).json({
              message: 'Category updated successfully',
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

router.delete(
  '/categories/delete',
  [AuthenticationMiddleware],
  async (req, res, next) => {
    try {
      const { id } = req.body
      if (!id) {
        return res.status(500).json({
          message: 'Missing id!',
        })
      }

      const data = await CategoriesSchema.find({
        _id: id,
      }).exec()

      if (!data.length) {
        return res.status(500).json({
          message: 'Category doesnt exists!',
        })
      }

      await CategoriesSchema.findOneAndDelete({
        _id: id,
      }).then(() => {
        return res.status(200).json({
          message: 'Successfully deleted category!',
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
