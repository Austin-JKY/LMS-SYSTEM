"use client"

import { useAuth } from "@/lib/auth"
import { getEnrolledCourses } from "@/lib/courses"
import { CourseCard } from "@/components/courses/course-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award } from "lucide-react"

export function EnrolledCourses() {
  const { user } = useAuth()

  if (!user || user.role !== "student") {
    return null
  }

  const enrolledCourses = getEnrolledCourses(user.id)

  if (enrolledCourses.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Enrolled Courses</h3>
          <p className="text-muted-foreground">Start learning by enrolling in your first course!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <Badge variant="secondary" className="text-sm">
          {enrolledCourses.length} Course{enrolledCourses.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="relative">
            <CourseCard course={course} />
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">Enrolled</Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Course Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{enrolledCourses.length}</div>
              <div className="text-sm text-blue-600">Courses Enrolled</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-green-600">Courses Completed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{enrolledCourses.length}</div>
              <div className="text-sm text-orange-600">In Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
