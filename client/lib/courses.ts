"use client"

import type { Course } from "@/types/user"

// Mock courses data
export const mockCourses: Course[] = [
  {
      id: "1",
      title: "Introduction to React",
      description: "Learn the fundamentals of React including components, props, state, and hooks. Perfect for beginners who want to start building modern web applications.",
      instructorId: "2",
      instructorName: "John Instructor",
      thumbnail: "/react-course.png",
      enrolledStudents: ["3", "4", "5"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
      category: "",
      tags: [],
      difficulty: "beginner",
      duration: 0,
      price: 0,
      rating: 0,
      reviewCount: 0,
      prerequisites: [],
      learningObjectives: [],
      lessons: [],
      isPublished: false
  },
  {
      id: "2",
      title: "Advanced JavaScript Concepts",
      description: "Deep dive into advanced JavaScript topics including closures, prototypes, async programming, and ES6+ features.",
      instructorId: "2",
      instructorName: "John Instructor",
      thumbnail: "/javascript-course.png",
      enrolledStudents: ["3", "6"],
      createdAt: "2024-01-05T00:00:00Z",
      updatedAt: "2024-01-20T00:00:00Z",
      category: "",
      tags: [],
      difficulty: "beginner",
      duration: 0,
      price: 0,
      rating: 0,
      reviewCount: 0,
      prerequisites: [],
      learningObjectives: [],
      lessons: [],
      isPublished: false
  },
  {
      id: "3",
      title: "UI/UX Design Fundamentals",
      description: "Master the principles of user interface and user experience design. Learn design thinking, wireframing, and prototyping.",
      instructorId: "7",
      instructorName: "Mike Designer",
      thumbnail: "/design-course-concept.png",
      enrolledStudents: ["3"],
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-25T00:00:00Z",
      category: "",
      tags: [],
      difficulty: "beginner",
      duration: 0,
      price: 0,
      rating: 0,
      reviewCount: 0,
      prerequisites: [],
      learningObjectives: [],
      lessons: [],
      isPublished: false
  },
  {
      id: "4",
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js, Express, and MongoDB. Learn API development and database integration.",
      instructorId: "2",
      instructorName: "John Instructor",
      thumbnail: "/nodejs-course.png",
      enrolledStudents: [],
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-30T00:00:00Z",
      category: "",
      tags: [],
      difficulty: "beginner",
      duration: 0,
      price: 0,
      rating: 0,
      reviewCount: 0,
      prerequisites: [],
      learningObjectives: [],
      lessons: [],
      isPublished: false
  },
  {
      id: "5",
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis, visualization, and machine learning using pandas, matplotlib, and scikit-learn.",
      instructorId: "8",
      instructorName: "Dr. Sarah Wilson",
      thumbnail: "/python-data-science.png",
      enrolledStudents: ["4", "5", "6"],
      createdAt: "2024-01-20T00:00:00Z",
      updatedAt: "2024-02-05T00:00:00Z",
      category: "",
      tags: [],
      difficulty: "beginner",
      duration: 0,
      price: 0,
      rating: 0,
      reviewCount: 0,
      prerequisites: [],
      learningObjectives: [],
      lessons: [],
      isPublished: false
  },
]

export function getCourses(): Course[] {
  return mockCourses
}

export function getCourseById(id: string): Course | undefined {
  return mockCourses.find((course) => course.id === id)
}

export function getCoursesByInstructor(instructorId: string): Course[] {
  return mockCourses.filter((course) => course.instructorId === instructorId)
}

export function createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
  const newCourse: Course = {
    ...courseData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockCourses.push(newCourse)
  return newCourse
}

export function updateCourse(id: string, updates: Partial<Course>): Course | null {
  const courseIndex = mockCourses.findIndex((course) => course.id === id)
  if (courseIndex === -1) return null

  mockCourses[courseIndex] = {
    ...mockCourses[courseIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockCourses[courseIndex]
}

export function deleteCourse(id: string): boolean {
  const courseIndex = mockCourses.findIndex((course) => course.id === id)
  if (courseIndex === -1) return false

  mockCourses.splice(courseIndex, 1)
  return true
}

export function enrollStudent(courseId: string, studentId: string): boolean {
  const course = getCourseById(courseId)
  if (!course) return false

  if (!course.enrolledStudents.includes(studentId)) {
    course.enrolledStudents.push(studentId)
    updateCourse(courseId, { enrolledStudents: course.enrolledStudents })
    return true
  }
  return false
}

export function unenrollStudent(courseId: string, studentId: string): boolean {
  const course = getCourseById(courseId)
  if (!course) return false

  const index = course.enrolledStudents.indexOf(studentId)
  if (index > -1) {
    course.enrolledStudents.splice(index, 1)
    updateCourse(courseId, { enrolledStudents: course.enrolledStudents })
    return true
  }
  return false
}

export function isStudentEnrolled(courseId: string, studentId: string): boolean {
  const course = getCourseById(courseId)
  return course ? course.enrolledStudents.includes(studentId) : false
}

export function getEnrolledCourses(studentId: string): Course[] {
  return mockCourses.filter((course) => course.enrolledStudents.includes(studentId))
}

export function getEnrollmentStats(courseId: string) {
  const course = getCourseById(courseId)
  if (!course) return null

  return {
    totalEnrolled: course.enrolledStudents.length,
    enrolledStudents: course.enrolledStudents,
  }
}
