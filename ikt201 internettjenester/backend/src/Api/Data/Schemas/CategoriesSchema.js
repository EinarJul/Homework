const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const CategoriesSchema = new Schema(
  {
    // _id: String,
    name: {
      type: String,
      required: true,
      unique: false,
    },
    parentId: {
      type: String,
      required: false,
      unique: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    categoryDescription: {
      type: String,
      required: false,
      unique: false,
    },
    categoryImage: {
      type: String,
      required: false,
      unique: false,
    },
    created_date: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { strict: true }
)

module.exports = mongoose.model('Categories', CategoriesSchema)
