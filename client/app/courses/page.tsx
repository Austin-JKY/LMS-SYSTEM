"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CourseCard } from "@/components/courses/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCourses, getCoursesByInstructor } from "@/lib/courses"
import { Search, Plus, Filter } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  if (!user) return null

  // Get courses based on user role
  const allCourses = user.role === "instructor" ? getCoursesByInstructor(user.id) : getCourses()

  // Filter courses based on search query
  const filteredCourses = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "popular":
        return b.enrolledStudents.length - a.enrolledStudents.length
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const getPageTitle = () => {
    switch (user.role) {
      case "instructor":
        return "My Courses"
      case "admin":
        return "All Courses"
      default:
        return "My Enrolled Courses"
    }
  }

  const getPageDescription = () => {
    switch (user.role) {
      case "instructor":
        return "Manage and track your created courses"
      case "admin":
        return "Manage all courses on the platform"
      default:
        return "Continue your learning journey"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-gray-600 mt-2">{getPageDescription()}</p>
          </div>
          {(user.role === "instructor" || user.role === "admin") && (
            <Button asChild>
              <Link href="/courses/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Link>
            </Button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showEnrollButton={user.role === "student" && !course.enrolledStudents.includes(user.id)}
                showEditButton={user.role === "instructor" && course.instructorId === user.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search terms or filters"
                    : user.role === "instructor"
                      ? "You haven't created any courses yet"
                      : "You're not enrolled in any courses yet"}
                </p>
              </div>
              {user.role === "instructor" ? (
                <Button asChild>
                  <Link href="/courses/create">Create Your First Course</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/browse">Browse Available Courses</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
