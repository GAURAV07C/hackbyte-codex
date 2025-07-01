"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  role: "user" | "admin" | "instructor"
  avatar?: string
  joinedDate: string
  lastLogin?: string
  status: "active" | "inactive" | "banned"
  webinarsAttended?: number
  totalSpent?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@skillsphere.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "2024-01-01",
    lastLogin: "2024-01-20",
    status: "active",
    webinarsAttended: 0,
    totalSpent: "$0",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "2024-01-15",
    lastLogin: "2024-01-20",
    status: "active",
    webinarsAttended: 5,
    totalSpent: "$1,247",
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    email: "sarah@skillsphere.com",
    role: "instructor",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "2024-01-10",
    lastLogin: "2024-01-19",
    status: "active",
    webinarsAttended: 12,
    totalSpent: "$2,890",
  },
  {
    id: 4,
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "2024-01-05",
    lastLogin: "2024-01-18",
    status: "inactive",
    webinarsAttended: 2,
    totalSpent: "$399",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedDate: "2024-01-12",
    lastLogin: "2024-01-20",
    status: "active",
    webinarsAttended: 8,
    totalSpent: "$1,567",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("skillsphere_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        localStorage.removeItem("skillsphere_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    const foundUser = mockUsers.find((u) => u.email === email)

    if (
      foundUser &&
      ((email === "admin@skillsphere.com" && password === "admin123") ||
        (email === "john@example.com" && password === "password123") ||
        (email === "sarah@skillsphere.com" && password === "instructor123") ||
        (email === "mike@example.com" && password === "password123") ||
        (email === "emily@example.com" && password === "password123"))
    ) {
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString().split("T")[0] }
      setUser(updatedUser)
      localStorage.setItem("skillsphere_user", JSON.stringify(updatedUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      role: "user",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
      status: "active",
      webinarsAttended: 0,
      totalSpent: "$0",
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("skillsphere_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("skillsphere_user", JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("skillsphere_user")
    router.push("/") // Redirect to home page
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Export mock users for admin functionality
export { mockUsers }
