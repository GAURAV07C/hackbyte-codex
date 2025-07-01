"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Webinar {
  id: number
  title: string
  instructor: string
  instructorTitle?: string
  instructorImage?: string
  date: string
  time: string
  duration?: string
  description?: string
  category: string
  level?: string
  maxAttendees: number
  registered: number
  price: string
  status: "live" | "upcoming" | "completed" | "cancelled"
  meetingLink: string
  createdBy?: string
}

interface User {
  id: number
  name: string
  email: string
  role: "user" | "instructor" | "admin"
  status: "active" | "inactive" | "banned"
  joinedDate: string
  lastLogin: string
  webinarsAttended: number
  avatar?: string
}

interface AdminContextType {
  webinars: Webinar[]
  users: User[]
  addWebinar: (webinar: Omit<Webinar, "id">) => void
  updateWebinar: (id: number, updates: Partial<Webinar>) => void
  deleteWebinar: (id: number) => void
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: number, updates: Partial<User>) => void
  deleteUser: (id: number) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: 1,
      title: "React Advanced Patterns",
      instructor: "John Smith",
      instructorTitle: "Senior React Developer, Meta",
      instructorImage: "/placeholder.svg?height=40&width=40",
      date: "2025-01-25",
      time: "14:00",
      duration: "2 hours",
      description: "Learn advanced React patterns including render props, compound components, and custom hooks.",
      category: "Development",
      level: "Advanced",
      maxAttendees: 100,
      registered: 45,
      price: "Free",
      status: "upcoming",
      meetingLink: "https://meet.skillsphere.com/react-advanced-patterns",
      createdBy: "admin",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Sarah Johnson",
      instructorTitle: "Lead Designer, Figma",
      instructorImage: "/placeholder.svg?height=40&width=40",
      date: "2025-01-26",
      time: "15:00",
      duration: "1.5 hours",
      description: "Master the fundamentals of UI/UX design with hands-on exercises.",
      category: "Design",
      level: "Beginner",
      maxAttendees: 150,
      registered: 89,
      price: "$49",
      status: "live",
      meetingLink: "https://meet.skillsphere.com/ui-ux-fundamentals",
      createdBy: "admin",
    },
    {
      id: 3,
      title: "Python Data Science Bootcamp",
      instructor: "Mike Chen",
      instructorTitle: "Data Scientist, Google",
      instructorImage: "/placeholder.svg?height=40&width=40",
      date: "2025-01-24",
      time: "10:00",
      duration: "3 hours",
      description: "Complete bootcamp covering Python for data science applications.",
      category: "Data Science",
      level: "Intermediate",
      maxAttendees: 200,
      registered: 156,
      price: "$99",
      status: "completed",
      meetingLink: "https://meet.skillsphere.com/python-data-science",
      createdBy: "admin",
    },
  ])

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinedDate: "2024-01-15",
      lastLogin: "2024-01-20",
      webinarsAttended: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "instructor",
      status: "active",
      joinedDate: "2024-01-10",
      lastLogin: "2024-01-19",
      webinarsAttended: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "user",
      status: "inactive",
      joinedDate: "2024-01-05",
      lastLogin: "2024-01-18",
      webinarsAttended: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "user",
      status: "active",
      joinedDate: "2024-01-12",
      lastLogin: "2024-01-20",
      webinarsAttended: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Admin User",
      email: "admin@skillsphere.com",
      role: "admin",
      status: "active",
      joinedDate: "2024-01-01",
      lastLogin: "2024-01-20",
      webinarsAttended: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const addWebinar = (webinar: Omit<Webinar, "id">) => {
    const newWebinar = {
      ...webinar,
      id: Date.now(),
    }
    setWebinars((prev) => [...prev, newWebinar])
  }

  const updateWebinar = (id: number, updates: Partial<Webinar>) => {
    setWebinars((prev) => prev.map((webinar) => (webinar.id === id ? { ...webinar, ...updates } : webinar)))
  }

  const deleteWebinar = (id: number) => {
    setWebinars((prev) => prev.filter((webinar) => webinar.id !== id))
  }

  const addUser = (user: Omit<User, "id">) => {
    const newUser = {
      ...user,
      id: Date.now(),
    }
    setUsers((prev) => [...prev, newUser])
  }

  const updateUser = (id: number, updates: Partial<User>) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...updates } : user)))
  }

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  return (
    <AdminContext.Provider
      value={{
        webinars,
        users,
        addWebinar,
        updateWebinar,
        deleteWebinar,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
