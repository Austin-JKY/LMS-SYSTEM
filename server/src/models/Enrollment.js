// src/models/Enrollment.js
const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
});

// A unique index to prevent a user from enrolling in the same course more than once
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Check if the model has already been defined to prevent OverwriteModelError
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;
