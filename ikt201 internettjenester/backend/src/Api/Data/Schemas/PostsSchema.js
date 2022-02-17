const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const PostsSchema = new Schema(
  {
    // _id: String,
    name: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: false,
      unique: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category_id: {
      type: String,
      required: true,
      unique: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    created_date: {
      type: String,
      required: true,
      unique: false,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'PostReviews',
      },
    ],
  },
  { strict: true }
)

module.exports = mongoose.model('Posts', PostsSchema)
