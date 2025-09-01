export type UserRole = "student" | "instructor" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructorId: string
  instructorName: string
  thumbnail?: string
  enrolledStudents: string[]
  createdAt: string
  updatedAt: string
  category: string
  tags: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in hours
  price: number
  rating: number
  reviewCount: number
  prerequisites: string[]
  learningObjectives: string[]
  lessons: Lesson[]
  isPublished: boolean
}

export interface Lesson {
  id: string
  title: string
  description: string
  type: "video" | "text" | "quiz" | "assignment"
  content: string
  duration: number // in minutes
  order: number
  isCompleted?: boolean
}

export interface Assignment {
  id: string
  courseId: string
  lessonId: string
  title: string
  description: string
  instructions: string
  dueDate: string
  maxPoints: number
  submissions: AssignmentSubmission[]
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  content: string
  submittedAt: string
  grade?: number
  feedback?: string
  status: "submitted" | "graded" | "late"
}

export interface CourseReview {
  id: string
  courseId: string
  studentId: string
  studentName: string
  rating: number
  comment: string
  createdAt: string
}

export interface StudentProgress {
  studentId: string
  courseId: string
  completedLessons: string[]
  currentLesson: string
  progressPercentage: number
  timeSpent: number // in minutes
  lastAccessedAt: string
  certificateEarned: boolean
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  enrolledAt: string
  progress: number
}
