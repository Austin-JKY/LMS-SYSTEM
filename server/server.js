// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Import routes
const authRoutes = require("./src/routes/authRoutes");
const courseRoutes = require("./src/routes/v1/courseRoutes");
const lessonRoutes = require("./src/routes/v1/lessonRoutes");
const healthRoutes = require("./src/routes/healthRoutes");
const enrollmentRoutes = require("./src/routes/v1/enrollmentRoutes");
const userProfileRoutes = require("./src/routes/v1/userProfileRoutes");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/courses/:courseId/lessons", lessonRoutes);
app.use("/api", healthRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);
app.use("/api/v1/profiles", userProfileRoutes);

// Basic root route
app.get("/", (req, res) => {
  res.send("LMS Backend API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
