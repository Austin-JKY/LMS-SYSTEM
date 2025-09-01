import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CourseForm } from "@/components/courses/course-form"

export default function CreateCoursePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Share your knowledge and create an engaging learning experience</p>
        </div>
        <CourseForm mode="create" />
      </div>
    </DashboardLayout>
  )
}
