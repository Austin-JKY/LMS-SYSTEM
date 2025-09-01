"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">EduFlow</h1>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 text-balance">Modern Learning Management System</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            Empower education with our comprehensive platform designed for students, instructors, and administrators.
            Create, manage, and deliver exceptional learning experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Course Management</CardTitle>
              <CardDescription>
                Create and organize courses with rich content, assignments, and interactive materials.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>
                Track progress, participate in discussions, and collaborate with peers in a modern interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor learning outcomes with detailed analytics and personalized feedback systems.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Accounts */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Try Demo Accounts</CardTitle>
            <CardDescription>Experience different user roles with these demo accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Admin</p>
                <p>admin@lms.com</p>
                <p>admin123</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Instructor</p>
                <p>instructor@lms.com</p>
                <p>instructor123</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Student</p>
                <p>student@lms.com</p>
                <p>student123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
