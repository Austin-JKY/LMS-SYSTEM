"use client"

import type { User } from "@/types/user"
import { getCourses } from "./courses"

// Mock users data for admin management
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "John Instructor",
    email: "john@example.com",
    role: "instructor",
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Jane Student",
    email: "jane@example.com",
    role: "student",
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Bob Student",
    email: "bob@example.com",
    role: "student",
    createdAt: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Alice Student",
    email: "alice@example.com",
    role: "student",
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    name: "Charlie Student",
    email: "charlie@example.com",
    role: "student",
    createdAt: "2024-01-06T00:00:00Z",
  },
  {
    id: "7",
    name: "Mike Designer",
    email: "mike@example.com",
    role: "instructor",
    createdAt: "2024-01-07T00:00:00Z",
  },
  {
    id: "8",
    name: "Dr. Sarah Wilson",
    email: "sarah@example.com",
    role: "instructor",
    createdAt: "2024-01-08T00:00:00Z",
  },
]

export function getAllUsers(): User[] {
  return mockUsers
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function getUsersByRole(role: User["role"]): User[] {
  return mockUsers.filter((user) => user.role === role)
}

export function createUser(userData: Omit<User, "id" | "createdAt">): User {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  mockUsers.push(newUser)
  return newUser
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) return null

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
  }
  return mockUsers[userIndex]
}

export function deleteUser(id: string): boolean {
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  if (userIndex === -1) return false

  mockUsers.splice(userIndex, 1)
  return true
}

export function getSystemStats() {
  const users = getAllUsers()
  const courses = getCourses()

  const totalUsers = users.length
  const totalStudents = users.filter((u) => u.role === "student").length
  const totalInstructors = users.filter((u) => u.role === "instructor").length
  const totalCourses = courses.length
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0)

  return {
    totalUsers,
    totalStudents,
    totalInstructors,
    totalCourses,
    totalEnrollments,
    averageEnrollmentsPerCourse: totalCourses > 0 ? Math.round(totalEnrollments / totalCourses) : 0,
  }
}

export function getRecentUsers(limit = 5): User[] {
  return mockUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
}
