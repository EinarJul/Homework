const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const ProfileSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: false,
  },
  about: {
    type: String,
    required: false,
    unique: false,
  },
  faq: {
    type: String,
    required: false,
    unique: false,
  },
  ads: {
    type: String,
    required: false,
    unique: false,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      unique: false,
      ref: 'Review',
    },
  ],
})

module.exports = mongoose.model('Profile', ProfileSchema)
