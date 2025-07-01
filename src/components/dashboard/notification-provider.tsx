"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { NotificationToast } from "./notification-toast"

interface ToastNotification {
  id: number
  title: string
  message: string
  type: "live" | "certificate" | "reminder" | "update"
  priority: "high" | "medium" | "low"
  duration?: number
  actionLabel?: string
  onAction?: () => void
}

interface NotificationContextType {
  showNotification: (notification: Omit<ToastNotification, "id">) => void
  dismissNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ToastNotification[]>([])

  const showNotification = (notification: Omit<ToastNotification, "id">) => {
    const id = Date.now() + Math.random()
    setNotifications((prev) => [...prev, { ...notification, id }])
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random notifications for demo
      const randomNotifications = [
        {
          title: "🔴 Live Webinar Alert",
          message: "AI & Machine Learning session starting in 5 minutes!",
          type: "live" as const,
          priority: "high" as const,
          actionLabel: "Join Now",
          onAction: () => console.log("Joining live webinar"),
        },
        {
          title: "🎓 Certificate Ready",
          message: "Your certificate for Digital Marketing is ready",
          type: "certificate" as const,
          priority: "medium" as const,
          actionLabel: "Download",
          onAction: () => console.log("Downloading certificate"),
        },
        {
          title: "⏰ Upcoming Session",
          message: "Don't forget: Project Management webinar in 1 hour",
          type: "reminder" as const,
          priority: "medium" as const,
          actionLabel: "Set Reminder",
          onAction: () => console.log("Setting reminder"),
        },
      ]

      // Show random notification every 30 seconds (for demo)
      if (Math.random() > 0.7) {
        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)]
        showNotification(randomNotif)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider value={{ showNotification, dismissNotification }}>
      {children}
      <NotificationToast notifications={notifications} onDismiss={dismissNotification} />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
