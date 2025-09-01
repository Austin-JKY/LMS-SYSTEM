// src/controllers/courseController.js
const Course = require("../models/Course");
const User = require("../models/User"); // We need the User model to check the role

// @desc    Create a new course
// @route   POST /api/v1/courses
// @access  Private (Instructor only)
const createCourse = async (req, res) => {
  // req.user comes from the authMiddleware, which has the user's decoded token payload
  const user = await User.findById(req.user.id);

  if (user.role !== "instructor") {
    return res.status(403).json({
      message: "Not authorized to create a course. Only instructors can.",
    });
  }

  const { title, description, price } = req.body;

  try {
    const course = new Course({
      title,
      description,
      instructor: req.user.id,
      price,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    // Fetch all courses and populate the instructor field to get the instructor's name
    const courses = await Course.find({}).populate("instructor", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single course by ID
// @route   GET /api/v1/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private (Instructor only, and must be the course owner)
const updateCourse = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the authenticated user is the instructor of the course
    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this course" });
    }

    // Update the course fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;

    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private (Instructor only, and must be the course owner)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the authenticated user is the instructor of the course
    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this course" });
    }

    await Course.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Course removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
