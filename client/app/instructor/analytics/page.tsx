"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CourseAnalytics } from "@/components/instructor/course-analytics"
import { useAuth } from "@/lib/auth"

export default function InstructorAnalyticsPage() {
  const { user } = useAuth()

  if (!user || user.role !== "instructor") {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">Only instructors can access this page.</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <CourseAnalytics instructorId={user.id} />
    </DashboardLayout>
  )
}
