const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const ReviewSchema = new Schema({
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
  date: {
    type: String,
    required: true,
    default: '',
  },
})

module.exports = mongoose.model('Review', ReviewSchema)
