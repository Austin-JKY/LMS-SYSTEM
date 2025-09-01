// src/controllers/lessonController.js
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Add a new lesson to a course
// @route   POST /api/v1/courses/:courseId/lessons
// @access  Private (Instructor only, and must own the course)
const createLesson = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { courseId } = req.params;
        const userId = req.user.id; // User ID from the auth middleware

        // 1. Find the user and check their role
        const user = await User.findById(userId);
        if (!user || user.role !== 'instructor') {
            return res.status(403).json({ message: 'Not authorized to create a lesson.' });
        }

        // 2. Find the course and verify the instructor owns it
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        // Important security check: ensure the authenticated user is the course's instructor
        if (course.instructor.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to add a lesson to this course.' });
        }

        // 3. Create the new lesson
        const lesson = new Lesson({
            title,
            content,
            course: courseId,
        });

        const createdLesson = await lesson.save();
        res.status(201).json(createdLesson);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all lessons for a specific course
// @route   GET /api/v1/courses/:courseId/lessons
// @access  Public
const getLessonsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find all lessons that belong to the specified course
        const lessons = await Lesson.find({ course: courseId }).sort('createdAt');

        res.status(200).json(lessons);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a single lesson by ID
// @route   GET /api/v1/lessons/:id
// @access  Public
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        res.status(200).json(lesson);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a lesson
// @route   PUT /api/v1/lessons/:id
// @access  Private (Instructor only, and must own the course)
const updateLesson = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;

        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        // Find the course the lesson belongs to
        const course = await Course.findById(lesson.course);
        if (!course || course.instructor.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this lesson.' });
        }

        // Update lesson fields
        lesson.title = title || lesson.title;
        lesson.content = content || lesson.content;

        const updatedLesson = await lesson.save();
        res.status(200).json(updatedLesson);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a lesson
// @route   DELETE /api/v1/lessons/:id
// @access  Private (Instructor only, and must own the course)
const deleteLesson = async (req, res) => {
    try {
        const userId = req.user.id;

        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found.' });
        }

        // Find the course the lesson belongs to
        const course = await Course.findById(lesson.course);
        if (!course || course.instructor.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this lesson.' });
        }

        await Lesson.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Lesson removed successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    createLesson,
    getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson,
};
