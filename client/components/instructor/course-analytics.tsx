"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getInstructorAnalytics } from "@/lib/advanced-courses"
import { Users, DollarSign, Star, BookOpen } from "lucide-react"

interface CourseAnalyticsProps {
  instructorId: string
}

export function CourseAnalytics({ instructorId }: CourseAnalyticsProps) {
  const analytics = getInstructorAnalytics(instructorId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Course Analytics</h2>
        <p className="text-muted-foreground">Track your teaching performance and student engagement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Published courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">From course sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageRating}</div>
            <p className="text-xs text-muted-foreground">Student satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analytics.courses.map((course) => (
              <div key={course.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{course.difficulty}</Badge>
                    <Badge variant="secondary">${course.price}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium">{course.enrolledStudents.length}</div>
                    <div className="text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="font-medium">{course.rating}/5</div>
                    <div className="text-muted-foreground">Rating</div>
                  </div>
                  <div>
                    <div className="font-medium">{course.reviewCount}</div>
                    <div className="text-muted-foreground">Reviews</div>
                  </div>
                  <div>
                    <div className="font-medium">${course.price * course.enrolledStudents.length}</div>
                    <div className="text-muted-foreground">Revenue</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Enrollment Progress</span>
                    <span>{course.enrolledStudents.length}/100</span>
                  </div>
                  <Progress value={(course.enrolledStudents.length / 100) * 100} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
