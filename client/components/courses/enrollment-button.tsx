"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { enrollStudent, unenrollStudent, isStudentEnrolled } from "@/lib/courses"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"

interface EnrollmentButtonProps {
  courseId: string
  courseName: string
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

export function EnrollmentButton({
  courseId,
  courseName,
  variant = "default",
  size = "default",
}: EnrollmentButtonProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  if (!user || user.role !== "student") {
    return null
  }

  const isEnrolled = isStudentEnrolled(courseId, user.id)

  const handleEnrollment = async () => {
    setIsLoading(true)

    try {
      if (isEnrolled) {
        const success = unenrollStudent(courseId, user.id)
        if (success) {
          toast({
            title: "Unenrolled Successfully",
            description: `You have been unenrolled from "${courseName}".`,
          })
        } else {
          throw new Error("Failed to unenroll")
        }
      } else {
        const success = enrollStudent(courseId, user.id)
        if (success) {
          toast({
            title: "Enrolled Successfully",
            description: `You are now enrolled in "${courseName}".`,
          })
        } else {
          throw new Error("Failed to enroll")
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleEnrollment}
      disabled={isLoading}
      variant={isEnrolled ? "outline" : variant}
      size={size}
      className="w-full"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : isEnrolled ? (
        <UserMinus className="h-4 w-4 mr-2" />
      ) : (
        <UserPlus className="h-4 w-4 mr-2" />
      )}
      {isLoading ? "Processing..." : isEnrolled ? "Unenroll" : "Enroll Now"}
    </Button>
  )
}
