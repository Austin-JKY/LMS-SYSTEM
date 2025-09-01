"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CourseOversight } from "@/components/admin/course-oversligh"

export default function AdminCoursesPage() {
  return (
    <DashboardLayout>
      <CourseOversight />
    </DashboardLayout>
  )
}
