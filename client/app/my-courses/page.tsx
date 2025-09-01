"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { EnrolledCourses } from "@/components/enrollment/enrolled-courses";

export default function MyCoursesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">
            Track your learning progress and continue your studies
          </p>
        </div>

        <EnrolledCourses />
      </div>
    </DashboardLayout>
  );
}
