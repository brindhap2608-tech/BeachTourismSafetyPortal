const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Middleware
// Enable CORS so the React frontend (running on a different port) can communicate with this API
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root route for quick browser test
app.get('/', (req, res) => {
  res.send('Welcome to the Beach Tourism & Safety Information Portal Backend API!');
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
