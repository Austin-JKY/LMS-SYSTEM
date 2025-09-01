// src/controllers/userProfileController.js
const User = require('../models/User');

// @desc    Get a user's profile by ID
// @route   GET /api/v1/profiles/:id
// @access  Public
const getProfile = async (req, res) => {
    try {
        // Find the user by ID and exclude the password and email from the result
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update the authenticated user's profile
// @route   PUT /api/v1/profiles/me
// @access  Private
const updateProfile = async (req, res) => {
    try {
        // req.user.id is set by the authMiddleware
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { bio, profilePicture, location } = req.body;

        // Update the profile fields if they are provided in the request body
        user.bio = bio !== undefined ? bio : user.bio;
        user.profilePicture = profilePicture !== undefined ? profilePicture : user.profilePicture;
        user.location = location !== undefined ? location : user.location;

        const updatedUser = await user.save();

        // Respond with the updated user data, excluding the password
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            bio: updatedUser.bio,
            profilePicture: updatedUser.profilePicture,
            location: updatedUser.location,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};
