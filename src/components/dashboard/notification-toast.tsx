"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Bell, Video, Award, Calendar } from "lucide-react"

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

interface NotificationToastProps {
  notifications: ToastNotification[]
  onDismiss: (id: number) => void
}

export function NotificationToast({ notifications, onDismiss }: NotificationToastProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<ToastNotification[]>([])

  useEffect(() => {
    notifications.forEach((notification) => {
      setVisibleNotifications((prev) => {
        if (!prev.find((n) => n.id === notification.id)) {
          return [...prev, notification]
        }
        return prev
      })

      // Auto dismiss after duration
      const duration = notification.duration || (notification.priority === "high" ? 8000 : 5000)
      setTimeout(() => {
        handleDismiss(notification.id)
      }, duration)
    })
  }, [notifications])

  const handleDismiss = (id: number) => {
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== id))
    onDismiss(id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "live":
        return <Video className="h-5 w-5 text-red-400" />
      case "certificate":
        return <Award className="h-5 w-5 text-yellow-400" />
      case "reminder":
        return <Calendar className="h-5 w-5 text-blue-400" />
      default:
        return <Bell className="h-5 w-5 text-gray-400" />
    }
  }

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-500 bg-red-900/20"
      case "medium":
        return "border-l-4 border-l-yellow-500 bg-yellow-900/20"
      case "low":
        return "border-l-4 border-l-blue-500 bg-blue-900/20"
      default:
        return "border-l-4 border-l-gray-500 bg-gray-900/20"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className={`bg-gray-800 border-gray-700 shadow-2xl ${getPriorityStyles(notification.priority)}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-semibold text-white pr-2">{notification.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDismiss(notification.id)}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      {notification.priority === "high" && (
                        <Badge className="bg-red-600/20 text-red-400 text-xs">Urgent</Badge>
                      )}
                      {notification.actionLabel && notification.onAction && (
                        <Button
                          size="sm"
                          onClick={notification.onAction}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-6"
                        >
                          {notification.actionLabel}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
