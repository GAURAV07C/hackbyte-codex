"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bell, X, Check, CheckCheck, Award, Video, Calendar, BookOpen, SettingsIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  type: "live" | "certificate" | "reminder" | "update" | "purchase" | "system"
  read: boolean
  priority: "high" | "medium" | "low"
  actionUrl?: string
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "🔴 Live Webinar Starting Now!",
      message: "AI & Machine Learning Mastery is starting. Join now!",
      time: "Just now",
      type: "live",
      read: false,
      priority: "high",
      actionUrl: "/dashboard?tab=live",
    },
    {
      id: 2,
      title: "🎓 Certificate Ready",
      message: "Your Digital Marketing Essentials certificate is ready for download",
      time: "5 minutes ago",
      type: "certificate",
      read: false,
      priority: "medium",
      actionUrl: "/dashboard?tab=certificates",
    },
    {
      id: 3,
      title: "⏰ Webinar Reminder",
      message: "Full-Stack Development Bootcamp starts in 1 hour",
      time: "1 hour ago",
      type: "reminder",
      read: false,
      priority: "medium",
      actionUrl: "/dashboard?tab=live",
    },
    {
      id: 4,
      title: "📚 New Content Added",
      message: "Additional resources added to Leadership Development course",
      time: "2 hours ago",
      type: "update",
      read: true,
      priority: "low",
      actionUrl: "/dashboard?tab=purchased",
    },
    {
      id: 5,
      title: "💳 Purchase Confirmed",
      message: "Successfully enrolled in Project Management Best Practices",
      time: "1 day ago",
      type: "purchase",
      read: true,
      priority: "medium",
      actionUrl: "/dashboard?tab=purchased",
    },
    {
      id: 6,
      title: "🎯 Webinar Completed",
      message: "Congratulations! You've completed Data Analysis Fundamentals",
      time: "2 days ago",
      type: "certificate",
      read: true,
      priority: "medium",
      actionUrl: "/dashboard?tab=certificates",
    },
    {
      id: 7,
      title: "🔔 System Update",
      message: "New features added to your dashboard. Check them out!",
      time: "3 days ago",
      type: "system",
      read: false,
      priority: "low",
      actionUrl: "/dashboard?tab=settings",
    },
  ])

  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityUnread = notifications.filter((n) => !n.read && n.priority === "high").length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.actionUrl) {
      // Handle navigation to specific section
      console.log(`Navigate to: ${notification.actionUrl}`)
    }
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
        return <BookOpen className="h-4 w-4 text-green-400" />
      case "purchase":
        return <CheckCheck className="h-4 w-4 text-purple-400" />
      case "system":
        return <SettingsIcon className="h-4 w-4 text-gray-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-blue-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getTimeColor = (time: string) => {
    if (time.includes("Just now") || time.includes("minutes ago")) {
      return "text-green-400"
    } else if (time.includes("hour")) {
      return "text-yellow-400"
    } else {
      return "text-gray-500"
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-gray-700 transition-colors"
      >
        <motion.div
          animate={highPriorityUnread > 0 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: highPriorityUnread > 0 ? Number.POSITIVE_INFINITY : 0, duration: 2 }}
        >
          <Bell className="h-5 w-5 text-gray-300" />
        </motion.div>
        {unreadCount > 0 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
            <Badge
              className={`h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs ${
                highPriorityUnread > 0 ? "bg-red-600 animate-pulse" : "bg-blue-600"
              }`}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 z-50"
          >
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center text-lg">
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                    {unreadCount > 0 && <Badge className="ml-2 bg-blue-600 text-white">{unreadCount} new</Badge>}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        <CheckCheck className="h-3 w-3 mr-1" />
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <Separator className="bg-gray-700" />

              <CardContent className="p-0">
                <ScrollArea className="h-96">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-700">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 hover:bg-gray-700/50 transition-colors cursor-pointer border-l-4 ${getPriorityColor(
                            notification.priority,
                          )} ${!notification.read ? "bg-gray-700/30" : ""}`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4
                                      className={`text-sm font-semibold ${
                                        !notification.read ? "text-white" : "text-gray-300"
                                      }`}
                                    >
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{notification.message}</p>
                                  <div className="flex items-center justify-between">
                                    <span className={`text-xs font-medium ${getTimeColor(notification.time)}`}>
                                      {notification.time}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                      {notification.priority === "high" && (
                                        <Badge className="bg-red-600/20 text-red-400 text-xs px-2 py-0">Urgent</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-1 ml-2">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        markAsRead(notification.id)
                                      }}
                                      className="h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteNotification(notification.id)
                                    }}
                                    className="h-6 px-2 text-xs text-gray-400 hover:text-red-400"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No notifications</p>
                      <p className="text-gray-500 text-sm mt-1">You&lsquo;re all caught up!</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>

              {notifications.length > 0 && (
                <>
                  <Separator className="bg-gray-700" />
                  <div className="p-3 bg-gray-800/50">
                    <Button
                      variant="ghost"
                      className="w-full text-blue-400 hover:text-blue-300 text-sm"
                      onClick={() => {
                        setIsOpen(false)
                        // Navigate to full notifications page
                        console.log("Navigate to notifications page")
                      }}
                    >
                      View All Notifications
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
