"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { UserManagement } from "@/components/admin/user-managment";

export default function AdminUsersPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  );
}
