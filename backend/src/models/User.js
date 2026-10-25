const mongoose = require('mongoose');

/**
 * User Model Schema (Simple, for college project presentation)
 * Fields: email, password, name
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'Tourist'
    },
    role: {
      type: String,
      enum: ['tourist', 'admin'],
      default: 'tourist'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
