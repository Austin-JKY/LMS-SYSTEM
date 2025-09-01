// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema with additional profile fields
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student',
    },
    // New profile fields
    bio: {
        type: String,
        default: '',
        maxlength: 500 // Limit the bio length
    },
    profilePicture: {
        type: String,
        default: 'https://placehold.co/150x150/E2E8F0/1A202C?text=Profile', // Default placeholder image
    },
    location: {
        type: String,
        default: '',
    },
    // End of new profile fields
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model has already been defined to prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
