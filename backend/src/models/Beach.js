const mongoose = require('mongoose');

/**
 * Beach Model Schema
 * Fields: name, location, description, safetyLevel, bestTime, image, facilities
 */
const beachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    safetyLevel: {
      type: String,
      enum: ['Safe', 'Moderate', 'High Risk', 'Caution'],
      default: 'Moderate'
    },
    bestTime: {
      type: String,
      default: 'October to March'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    },
    facilities: {
      type: [String],
      default: ['Lifeguards', 'Parking', 'Restrooms']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Beach', beachSchema);
