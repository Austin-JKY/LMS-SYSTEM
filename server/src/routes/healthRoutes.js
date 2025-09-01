const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @desc    Check application and database health
// @route   GET /api/health
// @access  Public
router.get('/health', async (req, res) => {
  try {
    // Ping the database to check connectivity
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const serverStatus = 'running';

    if (dbStatus === 'connected') {
      res.status(200).json({ 
        status: 'UP', 
        server: serverStatus, 
        database: dbStatus,
        uptime: process.uptime() // Optional: add server uptime
      });
    } else {
      res.status(503).json({ 
        status: 'DOWN', 
        server: serverStatus, 
        database: dbStatus,
        message: 'Database connection is down'
      });
    }
  } catch (error) {
    // Catch any connection errors
    res.status(500).json({ 
      status: 'ERROR', 
      message: error.message 
    });
  }
});

module.exports = router;