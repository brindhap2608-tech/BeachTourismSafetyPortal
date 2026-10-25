const mongoose = require('mongoose');

/**
 * Review Model Schema
 * Fields: beachId, userName, rating, comment, date
 */
const reviewSchema = new mongoose.Schema(
  {
    beachId: {
      type: String, // String to support both MongoDB ObjectId and string IDs
      required: true,
      index: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewSchema);
