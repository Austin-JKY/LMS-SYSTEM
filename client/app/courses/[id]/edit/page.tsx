import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CourseForm } from "@/components/courses/course-form"
import { getCourseById } from "@/lib/courses"
import { notFound } from "next/navigation"

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  const course = getCourseById(params.id)

  if (!course) {
    notFound()
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600 mt-2">Update your course information and content</p>
        </div>
        <CourseForm course={course} mode="edit" />
      </div>
    </DashboardLayout>
  )
}
