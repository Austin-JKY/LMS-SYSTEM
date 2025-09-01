"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { createCourse, updateCourse } from "@/lib/courses"
import type { Course } from "@/types/user"
import { Upload, Save, X } from "lucide-react"

interface CourseFormProps {
  course?: Course
  mode: "create" | "edit"
}

export function CourseForm({ course, mode }: CourseFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    thumbnail: course?.thumbnail || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setError("")

    try {
      if (mode === "create") {
        const newCourse = createCourse({
          title: formData.title,
          description: formData.description,
          instructorId: user.id,
          instructorName: user.name,
          thumbnail: formData.thumbnail,
          enrolledStudents: [],
        })
        router.push(`/courses/${newCourse.id}`)
      } else if (mode === "edit" && course) {
        const updatedCourse = updateCourse(course.id, {
          title: formData.title,
          description: formData.description,
          thumbnail: formData.thumbnail,
        })
        if (updatedCourse) {
          router.push(`/courses/${updatedCourse.id}`)
        }
      }
    } catch (err) {
      setError("Failed to save course. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    if (course) {
      router.push(`/courses/${course.id}`)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{mode === "create" ? "Create New Course" : "Edit Course"}</CardTitle>
          <CardDescription>
            {mode === "create" ? "Fill in the details to create your new course" : "Update your course information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what students will learn in this course"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Course Thumbnail URL</Label>
              <div className="flex gap-2">
                <Input
                  id="thumbnail"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="Enter image URL or upload an image"
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {formData.thumbnail && (
                <div className="mt-2">
                  <img
                    src={formData.thumbnail || "/placeholder.svg"}
                    alt="Course thumbnail preview"
                    className="w-32 h-20 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : mode === "create" ? "Create Course" : "Update Course"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
