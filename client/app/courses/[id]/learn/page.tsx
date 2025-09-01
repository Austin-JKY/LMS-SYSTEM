"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CourseProgress } from "@/components/courses/course-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getEnhancedCourseById, getStudentProgress, updateLessonProgress } from "@/lib/advanced-courses"
import { useAuth } from "@/lib/auth"
import { ArrowLeft, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CourseLearnPage() {
  const params = useParams()
  const courseId = params.id as string
  const { user } = useAuth()

  const course = getEnhancedCourseById(courseId)
  const progress = user ? getStudentProgress(user.id, courseId) : null
  const [currentLessonId, setCurrentLessonId] = useState(progress?.currentLesson || course?.lessons[0]?.id)

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  if (!progress) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need to enroll in this course to access the content.</p>
          <Button asChild>
            <Link href={`/courses/${courseId}`}>View Course Details</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const currentLesson = course.lessons.find((lesson) => lesson.id === currentLessonId)

  const handleLessonClick = (lessonId: string) => {
    setCurrentLessonId(lessonId)
  }

  const handleMarkComplete = () => {
    if (user && currentLessonId) {
      updateLessonProgress(user.id, courseId, currentLessonId)
      // Move to next lesson
      const currentIndex = course.lessons.findIndex((lesson) => lesson.id === currentLessonId)
      if (currentIndex < course.lessons.length - 1) {
        setCurrentLessonId(course.lessons[currentIndex + 1].id)
      }
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${courseId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground">Learning Mode</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {currentLesson && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {progress.completedLessons.includes(currentLesson.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Play className="h-5 w-5 text-blue-600" />
                      )}
                      {currentLesson.title}
                    </CardTitle>
                    <Badge variant="outline">{currentLesson.type}</Badge>
                  </div>
                  <p className="text-muted-foreground">{currentLesson.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lesson Content */}
                  <div className="min-h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
                    {currentLesson.type === "video" && (
                      <div className="text-center">
                        <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Video Player Placeholder</p>
                        <p className="text-sm text-gray-500">Duration: {currentLesson.duration} minutes</p>
                      </div>
                    )}
                    {currentLesson.type === "text" && (
                      <div className="p-6 text-left max-w-none">
                        <div className="prose">
                          <p>{currentLesson.content}</p>
                        </div>
                      </div>
                    )}
                    {currentLesson.type === "quiz" && (
                      <div className="text-center">
                        <div className="text-2xl mb-4">📝</div>
                        <p className="text-gray-600">Interactive Quiz</p>
                        <p className="text-sm text-gray-500">Test your knowledge</p>
                      </div>
                    )}
                  </div>

                  {/* Lesson Actions */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Lesson {course.lessons.findIndex((l) => l.id === currentLesson.id) + 1} of {course.lessons.length}
                    </div>
                    {!progress.completedLessons.includes(currentLesson.id) && (
                      <Button onClick={handleMarkComplete}>Mark as Complete</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Course Progress */}
          <div className="space-y-6">
            <CourseProgress course={course} progress={progress} onLessonClick={handleLessonClick} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
