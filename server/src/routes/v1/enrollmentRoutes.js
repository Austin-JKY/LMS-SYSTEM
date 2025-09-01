// src/routes/v1/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const {
    enrollUserInCourse,
    getMyEnrolledCourses,
    checkEnrollmentStatus,
} = require('../../controllers/enrollmentController');
const { protect } = require('../../middleware/authmiddleware');

// Route for enrolling in a new course
// POST /api/v1/enrollments
router.post('/', protect, enrollUserInCourse);

// Route for getting a list of courses the user is enrolled in
// GET /api/v1/enrollments/my-courses
router.get('/my-courses', protect, getMyEnrolledCourses);

// Route for checking a user's enrollment status for a specific course
// GET /api/v1/enrollments/is-enrolled/:courseId
router.get('/is-enrolled/:courseId', protect, checkEnrollmentStatus);

module.exports = router;
