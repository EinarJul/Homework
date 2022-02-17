const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const SellerRequestsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    accepted: {
      type: Boolean,
      required: true,
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

module.exports = mongoose.model('SellerRequests', SellerRequestsSchema)
