"use client"

import type { Course, CourseReview, StudentProgress } from "@/types/user"

// Enhanced mock courses with advanced features
export const enhancedMockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React including components, props, state, and hooks. Perfect for beginners who want to start building modern web applications.",
    instructorId: "2",
    instructorName: "John Instructor",
    thumbnail: "/react-course.png",
    enrolledStudents: ["3", "4", "5"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend", "Components"],
    difficulty: "beginner",
    duration: 12,
    price: 99,
    rating: 4.8,
    reviewCount: 156,
    prerequisites: ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
    learningObjectives: [
      "Understand React components and JSX",
      "Master state management with hooks",
      "Build interactive user interfaces",
      "Deploy React applications",
    ],
    lessons: [
      {
        id: "1-1",
        title: "Introduction to React",
        description: "Overview of React and its ecosystem",
        type: "video",
        content: "Welcome to React! In this lesson...",
        duration: 45,
        order: 1,
      },
      {
        id: "1-2",
        title: "Your First Component",
        description: "Creating and rendering React components",
        type: "video",
        content: "Let's create your first React component...",
        duration: 60,
        order: 2,
      },
      {
        id: "1-3",
        title: "Knowledge Check",
        description: "Test your understanding of React basics",
        type: "quiz",
        content: "Quiz content here...",
        duration: 15,
        order: 3,
      },
    ],
    isPublished: true,
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    description:
      "Deep dive into advanced JavaScript topics including closures, prototypes, async programming, and ES6+ features.",
    instructorId: "2",
    instructorName: "John Instructor",
    thumbnail: "/javascript-course.png",
    enrolledStudents: ["3", "6"],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    category: "Programming",
    tags: ["JavaScript", "ES6", "Async", "Advanced"],
    difficulty: "advanced",
    duration: 18,
    price: 149,
    rating: 4.9,
    reviewCount: 89,
    prerequisites: ["Intermediate JavaScript", "Understanding of functions and objects"],
    learningObjectives: [
      "Master closures and scope",
      "Understand prototypal inheritance",
      "Work with async/await and Promises",
      "Use advanced ES6+ features",
    ],
    lessons: [
      {
        id: "2-1",
        title: "Closures and Scope",
        description: "Understanding JavaScript closures",
        type: "video",
        content: "Closures are one of the most important...",
        duration: 75,
        order: 1,
      },
      {
        id: "2-2",
        title: "Async Programming",
        description: "Promises, async/await, and event loop",
        type: "video",
        content: "Asynchronous programming in JavaScript...",
        duration: 90,
        order: 2,
      },
    ],
    isPublished: true,
  },
]

// Mock student progress data
export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: "3",
    courseId: "1",
    completedLessons: ["1-1", "1-2"],
    currentLesson: "1-3",
    progressPercentage: 67,
    timeSpent: 105,
    lastAccessedAt: "2024-01-20T10:30:00Z",
    certificateEarned: false,
  },
  {
    studentId: "3",
    courseId: "2",
    completedLessons: ["2-1"],
    currentLesson: "2-2",
    progressPercentage: 50,
    timeSpent: 75,
    lastAccessedAt: "2024-01-19T14:15:00Z",
    certificateEarned: false,
  },
]

// Mock course reviews
export const mockCourseReviews: CourseReview[] = [
  {
    id: "1",
    courseId: "1",
    studentId: "3",
    studentName: "Jane Student",
    rating: 5,
    comment: "Excellent course! The instructor explains concepts clearly and the hands-on projects are very helpful.",
    createdAt: "2024-01-18T00:00:00Z",
  },
  {
    id: "2",
    courseId: "1",
    studentId: "4",
    studentName: "Bob Student",
    rating: 4,
    comment: "Great introduction to React. Would love to see more advanced topics covered.",
    createdAt: "2024-01-17T00:00:00Z",
  },
]

// Advanced course functions
export function getEnhancedCourseById(id: string): Course | undefined {
  return enhancedMockCourses.find((course) => course.id === id)
}

export function getStudentProgress(studentId: string, courseId: string): StudentProgress | undefined {
  return mockStudentProgress.find((progress) => progress.studentId === studentId && progress.courseId === courseId)
}

export function updateLessonProgress(studentId: string, courseId: string, lessonId: string): boolean {
  const progress = getStudentProgress(studentId, courseId)
  if (!progress) return false

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)

    const course = getEnhancedCourseById(courseId)
    if (course) {
      progress.progressPercentage = Math.round((progress.completedLessons.length / course.lessons.length) * 100)
    }

    progress.lastAccessedAt = new Date().toISOString()
  }

  return true
}

export function getCourseReviews(courseId: string): CourseReview[] {
  return mockCourseReviews.filter((review) => review.courseId === courseId)
}

export function addCourseReview(review: Omit<CourseReview, "id" | "createdAt">): CourseReview {
  const newReview: CourseReview = {
    ...review,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  mockCourseReviews.push(newReview)
  return newReview
}

export function getCoursesByCategory(category: string): Course[] {
  return enhancedMockCourses.filter((course) => course.category === category)
}

export function getCoursesByDifficulty(difficulty: Course["difficulty"]): Course[] {
  return enhancedMockCourses.filter((course) => course.difficulty === difficulty)
}

export function searchCourses(query: string): Course[] {
  const lowercaseQuery = query.toLowerCase()
  return enhancedMockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      course.category.toLowerCase().includes(lowercaseQuery),
  )
}

export function getInstructorAnalytics(instructorId: string) {
  const instructorCourses = enhancedMockCourses.filter((course) => course.instructorId === instructorId)

  const totalStudents = instructorCourses.reduce((sum, course) => sum + course.enrolledStudents.length, 0)
  const totalRevenue = instructorCourses.reduce((sum, course) => sum + course.price * course.enrolledStudents.length, 0)
  const averageRating = instructorCourses.reduce((sum, course) => sum + course.rating, 0) / instructorCourses.length

  return {
    totalCourses: instructorCourses.length,
    totalStudents,
    totalRevenue,
    averageRating: Math.round(averageRating * 10) / 10,
    courses: instructorCourses,
  }
}

export function isStudentEnrolled(courseId: string, studentId: string): boolean {
  const course = getEnhancedCourseById(courseId)
  return course ? course.enrolledStudents.includes(studentId) : false
}
