const express = require('express');
const mongoose = require('mongoose');

// Import Mongoose Models
const Beach = require('../models/Beach');
const Alert = require('../models/Alert');
const Review = require('../models/Review');
const User = require('../models/User');

// Import In-Memory Seed Data for 100% Reliable Fallback
const {
  initialEmergencyContacts,
  memoryBeaches,
  memoryAlerts,
  memoryReviews,
  memoryUsers
} = require('../config/seedData');

const router = express.Router();

/**
 * Helper to check if MongoDB is currently connected
 */
const isMongoConnected = () => mongoose.connection.readyState === 1;

// ==========================================
// 1. SYSTEM STATUS ROUTE
// ==========================================
/**
 * @route   GET /api/status
 * @desc    Check backend and database health
 */
router.get('/status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  res.json({
    success: true,
    message: 'Beach Tourism & Safety API is online and fully functional!',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatusMap[dbState] || 'Unknown',
      connected: dbState === 1
    }
  });
});

// ==========================================
// 2. BEACH ROUTES
// ==========================================

/**
 * @route   GET /api/beaches/search?q=marina
 * @desc    Search beaches by name or location
 * (MUST BE DEFINED BEFORE /api/beaches/:id)
 */
router.get('/beaches/search', async (req, res) => {
  try {
    const query = (req.query.q || '').trim().toLowerCase();

    if (!query) {
      // If query is empty, return all beaches
      if (isMongoConnected()) {
        const beaches = await Beach.find();
        if (beaches && beaches.length > 0) return res.json(beaches);
      }
      return res.json(memoryBeaches);
    }

    if (isMongoConnected()) {
      try {
        const dbMatches = await Beach.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { location: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
          ]
        });
        if (dbMatches && dbMatches.length > 0) {
          return res.json(dbMatches);
        }
      } catch (dbErr) {
        console.log('MongoDB search error, falling back to memory:', dbErr.message);
      }
    }

    // In-memory search fallback
    const matched = memoryBeaches.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query)
    );
    res.json(matched);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search beaches' });
  }
});

/**
 * @route   GET /api/beaches
 * @desc    Get all 6 beaches
 */
router.get('/beaches', async (req, res) => {
  try {
    if (isMongoConnected()) {
      try {
        const dbBeaches = await Beach.find();
        if (dbBeaches && dbBeaches.length > 0) {
          return res.json(dbBeaches);
        }
      } catch (err) {
        console.log('MongoDB query failed, using memory fallback:', err.message);
      }
    }
    // Return reliable memory fallback
    res.json(memoryBeaches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch beaches' });
  }
});

/**
 * @route   GET /api/beaches/:id
 * @desc    Get a single beach by ID or slug/name
 */
router.get('/beaches/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const beach = await Beach.findById(id);
          if (beach) return res.json(beach);
        } else {
          // If ID is string like 'beach-1' or slug
          const beachByName = await Beach.findOne({
            $or: [
              { _id: id },
              { name: new RegExp(id.replace(/-/g, ' '), 'i') }
            ]
          });
          if (beachByName) return res.json(beachByName);
        }
      } catch (err) {
        console.log('MongoDB single beach query error:', err.message);
      }
    }

    // Memory fallback search
    const found = memoryBeaches.find(
      (b) =>
        String(b._id) === id ||
        b.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase() ||
        b.name.toLowerCase().includes(id.toLowerCase())
    );

    if (found) {
      return res.json(found);
    }

    // Default to first beach if not matched
    res.json(memoryBeaches[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch beach details' });
  }
});

// ==========================================
// 3. SAFETY ALERTS ROUTES
// ==========================================

/**
 * @route   GET /api/alerts
 * @desc    Get active safety alerts
 */
router.get('/alerts', async (req, res) => {
  try {
    if (isMongoConnected()) {
      try {
        const dbAlerts = await Alert.find().sort({ createdAt: -1 });
        if (dbAlerts && dbAlerts.length > 0) {
          return res.json(dbAlerts);
        }
      } catch (err) {
        console.log('MongoDB alerts error, using memory fallback:', err.message);
      }
    }
    res.json(memoryAlerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch safety alerts' });
  }
});

/**
 * @route   POST /api/alerts
 * @desc    Create a new safety alert (Admin feature)
 */
router.post('/alerts', async (req, res) => {
  try {
    const { beachName, type, message } = req.body;
    if (!beachName || !message) {
      return res.status(400).json({ success: false, message: 'Beach name and message are required' });
    }

    const newAlertData = {
      _id: 'alert-' + Date.now(),
      beachName,
      type: type || 'Weather Warning',
      message,
      date: new Date()
    };

    if (isMongoConnected()) {
      try {
        const created = await Alert.create({
          beachName,
          type: newAlertData.type,
          message,
          date: newAlertData.date
        });
        newAlertData._id = created._id;
      } catch (dbErr) {
        console.log('MongoDB alert insert error:', dbErr.message);
      }
    }

    // Always keep in-memory store updated
    memoryAlerts.unshift(newAlertData);

    res.status(201).json({
      success: true,
      message: 'Safety alert published successfully!',
      alert: newAlertData
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create alert' });
  }
});

/**
 * @route   DELETE /api/alerts/:id
 * @desc    Delete/Dismiss a safety alert (Admin feature)
 */
router.delete('/alerts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
      try {
        await Alert.findByIdAndDelete(id);
      } catch (e) {
        console.log('MongoDB delete error:', e.message);
      }
    }

    // Remove from in-memory store
    const idx = memoryAlerts.findIndex((a) => String(a._id) === id);
    if (idx !== -1) {
      memoryAlerts.splice(idx, 1);
    }

    res.json({ success: true, message: 'Alert dismissed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete alert' });
  }
});

// ==========================================
// 4. EMERGENCY CONTACTS ROUTE
// ==========================================

/**
 * @route   GET /api/emergency
 * @desc    Get emergency helpline contacts
 */
router.get('/emergency', (req, res) => {
  res.json(initialEmergencyContacts);
});

// ==========================================
// 5. REVIEWS AND RATINGS ROUTES
// ==========================================

/**
 * @route   GET /api/reviews/:beachId
 * @desc    Get reviews for a specific beach
 */
router.get('/reviews/:beachId', async (req, res) => {
  try {
    const { beachId } = req.params;

    if (isMongoConnected()) {
      try {
        const dbReviews = await Review.find({ beachId }).sort({ createdAt: -1 });
        if (dbReviews && dbReviews.length > 0) {
          return res.json(dbReviews);
        }
      } catch (err) {
        console.log('MongoDB review query error:', err.message);
      }
    }

    // Fallback: search in memory reviews
    const matched = memoryReviews.filter(
      (r) => String(r.beachId) === beachId || r.beachId === 'beach-1'
    );
    res.json(matched.length > 0 ? matched : memoryReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

/**
 * @route   POST /api/reviews
 * @desc    Add a review for a beach
 */
router.post('/reviews', async (req, res) => {
  try {
    const { beachId, userName, rating, comment } = req.body;

    if (!beachId || !userName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields (beachId, userName, rating, comment) are required.'
      });
    }

    const newReview = {
      _id: 'rev-' + Date.now(),
      beachId,
      userName: userName.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date()
    };

    if (isMongoConnected()) {
      try {
        const created = await Review.create(newReview);
        newReview._id = created._id;
      } catch (dbErr) {
        console.log('MongoDB review insert error:', dbErr.message);
      }
    }

    // Keep memory fallback updated
    memoryReviews.unshift(newReview);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted.',
      review: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to post review' });
  }
});

// ==========================================
// 6. AUTHENTICATION ROUTES (Simple for College)
// ==========================================

/**
 * @route   POST /api/register
 * @desc    Register a new user (simple, no bcrypt)
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check if user already exists
    const existsInMemory = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existsInMemory) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const newUser = {
      _id: 'user-' + Date.now(),
      email: email.trim().toLowerCase(),
      password: password,
      name: (name && name.trim()) || 'Tourist',
      role: email.includes('admin') ? 'admin' : 'tourist'
    };

    if (isMongoConnected()) {
      try {
        await User.create(newUser);
      } catch (dbErr) {
        console.log('MongoDB user create error:', dbErr.message);
      }
    }

    // Keep memory store updated
    memoryUsers.push(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now log in.',
      user: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

/**
 * @route   POST /api/login
 * @desc    Login user (simple comparison)
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    let userFound = null;

    if (isMongoConnected()) {
      try {
        userFound = await User.findOne({
          email: email.trim().toLowerCase(),
          password: password
        });
      } catch (dbErr) {
        console.log('MongoDB login error:', dbErr.message);
      }
    }

    // Fallback to memoryUsers if not found in MongoDB
    if (!userFound) {
      userFound = memoryUsers.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );
    }

    if (!userFound) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Demo: tourist@beachtourism.com / password or admin@beachtourism.com / admin'
      });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        email: userFound.email,
        name: userFound.name || 'Tourist',
        role: userFound.role || (userFound.email.includes('admin') ? 'admin' : 'tourist')
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
