// src/models/Lesson.js
const mongoose = require('mongoose');

// Define the Lesson schema
const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course', // Reference to the Course model
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Use a unique index to ensure a lesson can only be associated with one course
LessonSchema.index({ course: 1 });

// Check if the model has already been defined to prevent OverwriteModelError
const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
