// src/routes/v1/courseRoutes.js
const express = require('express');
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../../controllers/courseController');
const { protect } = require('../../middleware/authmiddleware'); // Import the auth middleware

// Public routes for fetching courses
router.route('/').get(getCourses);
router.route('/:id').get(getCourseById);

// Protected routes for creating, updating, and deleting
router.route('/').post(protect, createCourse);
router.route('/:id').put(protect, updateCourse).delete(protect, deleteCourse);

module.exports = router;
