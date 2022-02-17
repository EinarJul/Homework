const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const PostReviews = new Schema({
  user: {
    type: String,
    required: true,
    unique: false,
  },
  stars: {
    type: Number,
    required: true,
    unique: false,
  },
  reviewText: {
    type: String,
    required: true,
    unique: false,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Users',
  },
  date: {
    type: String,
    required: true,
    default: '',
  },
})

module.exports = mongoose.model('PostReviews', PostReviews)
