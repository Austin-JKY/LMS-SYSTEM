// src/routes/v1/userProfileRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../../controllers/userProfileController');
const { protect } = require('../../middleware/authmiddleware');

// @route   GET /api/v1/profiles/:id
// @desc    Get any user's profile
// @access  Public
router.get('/:id', getProfile);

// @route   PUT /api/v1/profiles/me
// @desc    Update the authenticated user's profile
// @access  Private
router.put('/me', protect, updateProfile);

module.exports = router;
