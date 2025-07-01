/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Webinar {
  id: number
  title: string
  instructor: string
  instructorTitle: string
  instructorImage: string
  date: string
  time: string
  duration: string
  description: string
  category: string
  level: string
  attendees: number
  maxAttendees: number
  price: string
  status: "upcoming" | "live" | "ended"
  startDateTime: Date
  endDateTime: Date
  meetingLink: string
  isRegistered?: boolean
  registrationDate?: string
  reminderSent?: boolean
}

interface WebinarContextType {
  webinars: Webinar[]
  registeredWebinars: Webinar[]
  registerForWebinar: (webinarId: number) => void
  joinLiveWebinar: (webinarId: number) => void
  isRegistered: (webinarId: number) => boolean
  getLiveWebinars: () => Webinar[]
  getUpcomingWebinars: () => Webinar[]
  checkReminders: () => void
}

const WebinarContext = createContext<WebinarContextType | undefined>(undefined)

export function WebinarProvider({ children }: { children: ReactNode }) {
  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: 1,
      title: "AI & Machine Learning Mastery",
      instructor: "Dr. Sarah Chen",
      instructorTitle: "AI Research Director, Google",
      instructorImage: "/placeholder.svg?height=80&width=80",
      date: "January 15, 2025",
      time: "7:00 PM EST",
      duration: "2 hours",
      description: "Master AI fundamentals and build real-world ML projects with hands-on coding sessions",
      category: "Technology",
      level: "Intermediate",
      attendees: 1250,
      maxAttendees: 2000,
      price: "Free",
      status: "live",
      startDateTime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      endDateTime: new Date(Date.now() + 125 * 60 * 1000), // 2 hours 5 minutes from now
      meetingLink: "https://meet.skillsphere.com/ai-ml-mastery-live",
      reminderSent: false,
    },
    {
      id: 2,
      title: "Full-Stack Development Bootcamp",
      instructor: "Marcus Rodriguez",
      instructorTitle: "Senior Developer, Netflix",
      instructorImage: "/placeholder.svg?height=80&width=80",
      date: "January 18, 2025",
      time: "6:30 PM EST",
      duration: "3 hours",
      description: "From zero to deployment in modern web technologies - React, Node.js, and cloud deployment",
      category: "Development",
      level: "Beginner",
      attendees: 980,
      maxAttendees: 1500,
      price: "Free",
      status: "upcoming",
      startDateTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      endDateTime: new Date(Date.now() + 195 * 60 * 1000), // 3 hours 15 minutes from now
      meetingLink: "https://meet.skillsphere.com/fullstack-bootcamp-live",
      reminderSent: false,
    },
    {
      id: 3,
      title: "Digital Marketing Strategy 2025",
      instructor: "Emma Thompson",
      instructorTitle: "Marketing Director, Shopify",
      instructorImage: "/placeholder.svg?height=80&width=80",
      date: "January 22, 2025",
      time: "8:00 PM EST",
      duration: "2.5 hours",
      description: "Latest growth hacking techniques and digital marketing strategies that actually work in 2025",
      category: "Marketing",
      level: "Intermediate",
      attendees: 750,
      maxAttendees: 1200,
      price: "Free",
      status: "upcoming",
      startDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      endDateTime: new Date(Date.now() + 4.5 * 60 * 60 * 1000), // 4.5 hours from now
      meetingLink: "https://meet.skillsphere.com/digital-marketing-2025-live",
      reminderSent: false,
    },
    {
      id: 4,
      title: "Data Science & Analytics Deep Dive",
      instructor: "Prof. James Wilson",
      instructorTitle: "Data Science Lead, Amazon",
      instructorImage: "/placeholder.svg?height=80&width=80",
      date: "January 25, 2025",
      time: "7:30 PM EST",
      duration: "3 hours",
      description: "Turn data into actionable business insights with Python, SQL, and advanced analytics",
      category: "Analytics",
      level: "Advanced",
      attendees: 1100,
      maxAttendees: 1800,
      price: "Free",
      status: "upcoming",
      startDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      endDateTime: new Date(Date.now() + 27 * 60 * 60 * 1000), // 27 hours from now
      meetingLink: "https://meet.skillsphere.com/data-science-deep-dive-live",
      reminderSent: false,
    },
  ])

  const [registeredWebinarIds, setRegisteredWebinarIds] = useState<number[]>([1, 2]) // User is registered for webinars 1 and 2
  const [reminderCallbacks] = useState<((webinar: Webinar) => void)[]>([])

  // Add reminder callback function

  // Update webinar status based on current time
  useEffect(() => {
    const updateWebinarStatus = () => {
      const now = new Date()
      setWebinars((prev) =>
        prev.map((webinar) => {
          if (now >= webinar.startDateTime && now <= webinar.endDateTime) {
            return { ...webinar, status: "live" as const }
          } else if (now > webinar.endDateTime) {
            return { ...webinar, status: "ended" as const }
          } else {
            return { ...webinar, status: "upcoming" as const }
          }
        }),
      )
    }

    updateWebinarStatus()
    const interval = setInterval(updateWebinarStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Check for reminders (10 minutes before start)
  const checkReminders = () => {
    const now = new Date()

    webinars.forEach((webinar) => {
      if (registeredWebinarIds.includes(webinar.id) && !webinar.reminderSent) {
        const timeUntilStart = webinar.startDateTime.getTime() - now.getTime()
        const tenMinutesInMs = 10 * 60 * 1000 // 10 minutes in milliseconds

        // Send reminder if webinar starts in 10 minutes or less (and hasn't started yet)
        if (timeUntilStart <= tenMinutesInMs && timeUntilStart > 0) {
          // Mark reminder as sent
          setWebinars((prev) => prev.map((w) => (w.id === webinar.id ? { ...w, reminderSent: true } : w)))

          // Call all reminder callbacks
          reminderCallbacks.forEach((callback) => callback(webinar))
        }
      }
    })
  }

  // Check reminders every minute
  useEffect(() => {
    const interval = setInterval(checkReminders, 60000) // Check every minute
    checkReminders() // Check immediately

    return () => clearInterval(interval)
  }, [webinars, registeredWebinarIds, reminderCallbacks])

  const registerForWebinar = (webinarId: number) => {
    if (!registeredWebinarIds.includes(webinarId)) {
      setRegisteredWebinarIds((prev) => [...prev, webinarId])
      setWebinars((prev) =>
        prev.map((webinar) =>
          webinar.id === webinarId
            ? {
                ...webinar,
                attendees: webinar.attendees + 1,
                isRegistered: true,
                registrationDate: new Date().toLocaleDateString(),
              }
            : webinar,
        ),
      )
    }
  }

  const joinLiveWebinar = (webinarId: number) => {
    const webinar = webinars.find((w) => w.id === webinarId)
    if (webinar && registeredWebinarIds.includes(webinarId)) {
      // Open webinar meeting link in new tab
      window.open(webinar.meetingLink, "_blank", "noopener,noreferrer")
    }
  }

  const isRegistered = (webinarId: number) => {
    return registeredWebinarIds.includes(webinarId)
  }

  const getLiveWebinars = () => {
    return webinars.filter((w) => w.status === "live")
  }

  const getUpcomingWebinars = () => {
    return webinars.filter((w) => w.status === "upcoming")
  }

  const registeredWebinars = webinars
    .filter((w) => registeredWebinarIds.includes(w.id))
    .map((w) => ({
      ...w,
      isRegistered: true,
      registrationDate: new Date().toLocaleDateString(),
    }))

  return (
    <WebinarContext.Provider
      value={{
        webinars,
        registeredWebinars,
        registerForWebinar,
        joinLiveWebinar,
        isRegistered,
        getLiveWebinars,
        getUpcomingWebinars,
        checkReminders,
      }}
    >
      {children}
    </WebinarContext.Provider>
  )
}

export function useWebinars() {
  const context = useContext(WebinarContext)
  if (context === undefined) {
    throw new Error("useWebinars must be used within a WebinarProvider")
  }
  return context
}
