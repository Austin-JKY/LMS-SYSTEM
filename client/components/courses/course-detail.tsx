"use client"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Star, Calendar, BookOpen, Play, FileText, Award, Edit, Trash2 } from "lucide-react"
import type { Course } from "@/types/user"
import Link from "next/link"
import { EnrollmentButton } from "./enrollment-button"
import { CourseReviews } from "./course-reviews"
import { isStudentEnrolled, getStudentProgress } from "@/lib/advanced-courses"

interface CourseDetailProps {
  course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
  const { user } = useAuth()

  const isEnrolled = user ? isStudentEnrolled(course.id, user.id) : false
  const progress = user ? getStudentProgress(user.id, course.id) : null

  const isInstructor = user?.id === course.instructorId
  const isAdmin = user?.role === "admin"
  const canEdit = isInstructor || isAdmin

  const lessons = course.lessons || [
    {
      id: "1",
      title: "Introduction to React",
      duration: 15,
      completed: true,
      type: "video" as const,
      description: "Overview",
      content: "",
      order: 1,
    },
    {
      id: "2",
      title: "Components and JSX",
      duration: 25,
      completed: true,
      type: "video" as const,
      description: "Learn JSX",
      content: "",
      order: 2,
    },
    {
      id: "3",
      title: "Props and State",
      duration: 30,
      completed: false,
      type: "video" as const,
      description: "State management",
      content: "",
      order: 3,
    },
    {
      id: "4",
      title: "Event Handling",
      duration: 20,
      completed: false,
      type: "video" as const,
      description: "Handle events",
      content: "",
      order: 4,
    },
    {
      id: "5",
      title: "React Hooks",
      duration: 35,
      completed: false,
      type: "video" as const,
      description: "Modern React",
      content: "",
      order: 5,
    },
  ]

  const mockAssignments = [
    { id: "1", title: "Build a Todo Component", dueDate: "2024-02-15", submitted: true },
    { id: "2", title: "Create a Weather App", dueDate: "2024-02-22", submitted: false },
  ]

  const completedLessons = progress?.completedLessons.length || 0
  const progressPercentage = progress?.progressPercentage || 0

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={course.thumbnail || "/placeholder.svg?height=400&width=800&query=course banner"}
            alt={course.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-lg opacity-90 mb-4">{course.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt={course.instructorName} />
                  <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{course.instructorName}</span>
              </div>
              <Badge variant="secondary">{course.enrolledStudents.length} students</Badge>
              {course.difficulty && <Badge variant="outline">{course.difficulty}</Badge>}
              {course.category && <Badge variant="outline">{course.category}</Badge>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{lessons.length} Lessons</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{course.duration || 8} Hours</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{course.enrolledStudents.length} Students</p>
                    </div>
                    <div className="text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Certificate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {course.learningObjectives && course.learningObjectives.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="lessons" className="space-y-4">
              {lessons.map((lesson, index) => {
                const isCompleted = progress?.completedLessons.includes(lesson.id) || false

                return (
                  <Card key={lesson.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.duration} min</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isCompleted && <Badge variant="secondary">Completed</Badge>}
                          <Badge variant="outline">{lesson.type}</Badge>
                          {isEnrolled ? (
                            <Button size="sm" variant={isCompleted ? "outline" : "default"} asChild>
                              <Link href={`/courses/${course.id}/learn`}>
                                <Play className="mr-2 h-3 w-3" />
                                {isCompleted ? "Review" : "Start"}
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" disabled>
                              <Play className="mr-2 h-3 w-3" />
                              Enroll to Access
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {assignment.submitted && <Badge variant="secondary">Submitted</Badge>}
                        <Button size="sm" variant="outline" disabled={!isEnrolled}>
                          {assignment.submitted ? "View Submission" : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <CourseReviews courseId={course.id} canReview={isEnrolled} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEnrolled ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} />
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}/learn`}>Continue Learning</Link>
                  </Button>
                </>
              ) : (
                <EnrollmentButton courseId={course.id} courseName={course.title} />
              )}

              {canEdit && (
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/courses/${course.id}/edit`}>
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">{new Date(course.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{course.duration || 8} hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Lessons</p>
                  <p className="text-sm text-muted-foreground">{lessons.length} lessons</p>
                </div>
              </div>
              {course.rating && (
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <p className="text-sm text-muted-foreground">
                      {course.rating}/5 ({course.reviewCount} reviews)
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Award className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Certificate</p>
                  <p className="text-sm text-muted-foreground">Upon completion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructor Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={course.instructorName} />
                  <AvatarFallback>{course.instructorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{course.instructorName}</p>
                  <p className="text-sm text-muted-foreground">Senior Developer</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Experienced developer with 8+ years in web development and React ecosystem.
              </p>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
