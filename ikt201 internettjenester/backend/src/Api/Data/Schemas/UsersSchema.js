const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UsersSchema = new Schema(
  {
    // _id: String,
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    lastname: {
      type: String,
      required: true,
      unique: false,
    },
    age: {
      type: Number,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => {
        return validator.isEmail(value)
      },
    },
    password_hash: {
      type: String,
      required: true,
      unique: false,
    },
    created_date: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: false,
      unique: false,
    },
    profile: {
      type: Schema.Types.ObjectId,
      required: false,
      unique: false,
      ref: 'Profile',
      default: null,
    },
    account_type: {
      type: String,
      required: true,
      unique: false,
      default: 'normal',
    },
    root: {
      type: String,
      required: true,
      unique: false,
      default: 'false',
    },
  },
  { strict: true }
)

module.exports = mongoose.model('Users', UsersSchema)
