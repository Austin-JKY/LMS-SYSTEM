"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { getEnrolledCourses } from "@/lib/courses"
import { mockStudentProgress } from "@/lib/advanced-courses"

export function StudentDashboard() {
  const { user } = useAuth()

  const enrolledCourses = user ? getEnrolledCourses(user.id) : []
  const userProgress = user ? mockStudentProgress.filter((p) => p.studentId === user.id) : []

  const stats = {
    coursesEnrolled: enrolledCourses.length,
    coursesCompleted: userProgress.filter((p: { progressPercentage: number }) => p.progressPercentage === 100).length,
    totalHours: Math.round(userProgress.reduce((sum: number, p: { timeSpent: number }) => sum + p.timeSpent / 60, 0)),
    certificates: userProgress.filter((p) => p.certificateEarned).length,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your learning progress and continue your courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesEnrolled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHours}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificates}</div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
        </CardHeader>
        <CardContent>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Enrolled Courses</h3>
              <p className="text-muted-foreground mb-4">Start your learning journey by enrolling in a course!</p>
              <Button asChild>
                <Link href="/browse">Browse Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {enrolledCourses.map((course) => {
                const progress = userProgress.find((p) => p.courseId === course.id)
                const progressPercentage = progress?.progressPercentage || 0
                const currentLesson = progress?.currentLesson || "Getting Started"

                return (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">by {course.instructorName}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{progressPercentage}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      <p className="text-sm text-muted-foreground">Next: {currentLesson}</p>
                    </div>
                    <Button asChild>
                      <Link href={progressPercentage > 0 ? `/courses/${course.id}/learn` : `/courses/${course.id}`}>
                        {progressPercentage > 0 ? "Continue" : "Start"}
                      </Link>
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/browse">Browse New Courses</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/my-courses">My Courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
