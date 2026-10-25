const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses MONGO_URI from .env file or falls back to local MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/beach_tourism_db');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // Auto-seed initial data if collections are empty
    const { seedDatabase } = require('./seedData');
    await seedDatabase();
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not crash the entire server in development if MongoDB isn't running yet
    console.log('⚠️ Running server without active database connection. Falling back to in-memory data store.');
  }
};

module.exports = connectDB;
