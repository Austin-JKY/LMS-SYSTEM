// src/routes/v1/lessonRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    createLesson,
    getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson,
} = require('../../controllers/lessonController');
const { protect } = require('../../middleware/authmiddleware');

// Route for getting all lessons for a course and creating a new lesson
// POST: /api/v1/courses/:courseId/lessons
// GET: /api/v1/courses/:courseId/lessons
router.route('/').post(protect, createLesson).get(getLessonsByCourse);

// Route for getting, updating, and deleting a single lesson
// GET: /api/v1/lessons/:id
// PUT: /api/v1/lessons/:id
// DELETE: /api/v1/lessons/:id
router.route('/:id').get(getLessonById).put(protect, updateLesson).delete(protect, deleteLesson);

module.exports = router;
