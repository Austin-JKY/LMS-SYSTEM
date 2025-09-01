import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Clock, Star } from "lucide-react"
import type { Course } from "@/types/user"
import Link from "next/link"
import { EnrollmentButton } from "./enrollment-button"

interface CourseCardProps {
  course: Course
  showEnrollButton?: boolean
  showEditButton?: boolean
}

export function CourseCard({ course, showEnrollButton = false, showEditButton = false }: CourseCardProps) {
  const enrolledCount = course.enrolledStudents.length

  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=350&query=course thumbnail"}
          alt={course.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {enrolledCount} enrolled
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" alt={course.instructorName} />
            <AvatarFallback className="text-xs">{course.instructorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{course.instructorName}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{enrolledCount} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>8 hours</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>4.8</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/courses/${course.id}`}>View Course</Link>
          </Button>
          {showEnrollButton && (
            <EnrollmentButton courseId={course.id} courseName={course.title} variant="outline" size="default" />
          )}
          {showEditButton && (
            <Button variant="outline" asChild>
              <Link href={`/courses/${course.id}/edit`}>Edit</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
