const mongoose = require('mongoose');

/**
 * Alert Model Schema
 * Fields: beachName, type, message, date
 */
const alertSchema = new mongoose.Schema(
  {
    beachName: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['High Waves', 'Strong Currents', 'Weather Warning', 'Jellyfish Advisory', 'Tide Surge'],
      default: 'Weather Warning'
    },
    message: {
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

module.exports = mongoose.model('Alert', alertSchema);
