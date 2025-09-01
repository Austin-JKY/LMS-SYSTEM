// src/controllers/enrollmentController.js
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Enroll a user in a course
// @route   POST /api/v1/enrollments
// @access  Private
const enrollUserInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id; // Get the authenticated user's ID from the request

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({
            user: userId,
            course: courseId,
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'User is already enrolled in this course' });
        }

        // Create the new enrollment
        const enrollment = new Enrollment({
            user: userId,
            course: courseId,
        });

        const newEnrollment = await enrollment.save();
        res.status(201).json(newEnrollment);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all courses a user is enrolled in
// @route   GET /api/v1/enrollments/my-courses
// @access  Private
const getMyEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find all enrollments for the logged-in user and populate the course details
        const enrollments = await Enrollment.find({ user: userId }).populate({
            path: 'course',
            populate: {
                path: 'instructor',
                select: 'name email', // Only select the name and email of the instructor
            },
        });

        // Map the enrollments to an array of course objects
        const courses = enrollments.map(enrollment => enrollment.course);
        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Check if a user is enrolled in a specific course
// @route   GET /api/v1/enrollments/is-enrolled/:courseId
// @access  Private
const checkEnrollmentStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const enrollment = await Enrollment.findOne({
            user: userId,
            course: courseId,
        });

        if (enrollment) {
            return res.status(200).json({ isEnrolled: true, message: 'User is enrolled' });
        } else {
            return res.status(200).json({ isEnrolled: false, message: 'User is not enrolled' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    enrollUserInCourse,
    getMyEnrolledCourses,
    checkEnrollmentStatus,
};
