/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Check, Award, Video, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  type: "live" | "certificate" | "reminder" | "update"
  read: boolean
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "🔴 Live Webinar Starting",
      message: "AI & Machine Learning Mastery starts in 5 minutes",
      time: "Just now",
      type: "live",
      read: false,
    },
    {
      id: 2,
      title: "🎓 Certificate Ready",
      message: "Your Digital Marketing certificate is ready for download",
      time: "1 hour ago",
      type: "certificate",
      read: false,
    },
    {
      id: 3,
      title: "⏰ Upcoming Session",
      message: "Project Management webinar tomorrow at 4 PM EST",
      time: "3 hours ago",
      type: "reminder",
      read: false,
    },
    {
      id: 4,
      title: "📚 New Content Available",
      message: "Additional resources added to Leadership Development",
      time: "1 day ago",
      type: "update",
      read: true,
    },
    {
      id: 5,
      title: "🎯 Webinar Completed",
      message: "You've successfully completed Data Analysis Fundamentals",
      time: "2 days ago",
      type: "certificate",
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "live":
        return <Video className="h-4 w-4 text-red-400" />
      case "certificate":
        return <Award className="h-4 w-4 text-yellow-400" />
      case "reminder":
        return <Calendar className="h-4 w-4 text-blue-400" />
      case "update":
        return <Bell className="h-4 w-4 text-green-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case "live":
        return "bg-red-600"
      case "certificate":
        return "bg-yellow-600"
      case "reminder":
        return "bg-blue-600"
      case "update":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="bg-gray-800 border-gray-700 max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
            {unreadCount > 0 && <Badge className="ml-2 bg-red-600 text-white">{unreadCount}</Badge>}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-blue-400 hover:text-blue-300">
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors ${
                  !notification.read ? "bg-gray-700/30" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`text-sm font-semibold ${!notification.read ? "text-white" : "text-gray-300"}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <div className="flex items-center space-x-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
                            >
                              Mark read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {notifications.length === 0 && (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
