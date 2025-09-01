"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const renderDashboard = () => {
    switch (user.role) {
      case "student":
        return <StudentDashboard />
      case "instructor":
        return <InstructorDashboard />
      case "admin":
        return <AdminDashboard />
      default:
        return <StudentDashboard />
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}
