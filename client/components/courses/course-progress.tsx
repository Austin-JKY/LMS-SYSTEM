"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, PlayCircle, Clock, Award } from "lucide-react"
import type { Course, StudentProgress, Lesson } from "@/types/user"

interface CourseProgressProps {
  course: Course
  progress: StudentProgress
  onLessonClick: (lessonId: string) => void
}

export function CourseProgress({ course, progress, onLessonClick }: CourseProgressProps) {
  const getLessonIcon = (lesson: Lesson) => {
    if (progress.completedLessons.includes(lesson.id)) {
      return <CheckCircle className="h-4 w-4 text-green-600" />
    }
    if (lesson.id === progress.currentLesson) {
      return <PlayCircle className="h-4 w-4 text-blue-600" />
    }
    return <Clock className="h-4 w-4 text-gray-400" />
  }

  const getLessonStatus = (lesson: Lesson) => {
    if (progress.completedLessons.includes(lesson.id)) {
      return "completed"
    }
    if (lesson.id === progress.currentLesson) {
      return "current"
    }
    return "upcoming"
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Progress</span>
            <Badge variant={progress.progressPercentage === 100 ? "default" : "secondary"}>
              {progress.progressPercentage}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress.progressPercentage} className="w-full" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold">{progress.completedLessons.length}</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{course.lessons.length - progress.completedLessons.length}</div>
              <div className="text-muted-foreground">Remaining</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{Math.round(progress.timeSpent / 60)}h</div>
              <div className="text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{progress.certificateEarned ? "Yes" : "No"}</div>
              <div className="text-muted-foreground">Certificate</div>
            </div>
          </div>

          {progress.progressPercentage === 100 && !progress.certificateEarned && (
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
              <Award className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Congratulations! You can now claim your certificate.</span>
              <Button size="sm" className="ml-4">
                Get Certificate
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lesson List */}
      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {course.lessons.map((lesson) => {
              const status = getLessonStatus(lesson)
              return (
                <div
                  key={lesson.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    status === "completed"
                      ? "bg-green-50 border-green-200"
                      : status === "current"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => onLessonClick(lesson.id)}
                >
                  <div className="flex items-center gap-3">
                    {getLessonIcon(lesson)}
                    <div>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-sm text-muted-foreground">{lesson.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {lesson.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{lesson.duration}min</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
