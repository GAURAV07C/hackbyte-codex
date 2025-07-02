/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Users, ExternalLink, CheckCircle, LinkIcon } from "lucide-react"
import { motion } from "framer-motion"

import { useState, useEffect } from "react"

// Simple notification handler (replace with your own or a library as needed)
function showNotification({
  title,
  message,
  
  duration,
 
  onAction,
}: {
  title: string
  message: string
  type?: string
  priority?: string
  duration?: number
  actionLabel?: string
  onAction?: () => void
}) {
  // For demonstration, use the browser Notification API if available
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, { body: message })
      if (onAction) {
        notification.onclick = () => {
          onAction()
          notification.close()
        }
      }
      setTimeout(() => notification.close(), duration || 4000)
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission()
    }
  } else {
    // Fallback: alert
    alert(`${title}\n${message}`)
    if (onAction) onAction()
  }
}

export function MyWebinarsTab() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [registeredWebinars, setRegisteredWebinars] = useState<any[]>([])
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Set up reminder notifications
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()

      registeredWebinars.forEach((webinar) => {
        const timeUntilStart = webinar.startDateTime.getTime() - now.getTime()
        const tenMinutesInMs = 10 * 60 * 1000

        // Show reminder notification if webinar starts in 10 minutes
        if (timeUntilStart <= tenMinutesInMs && timeUntilStart > 0 && !webinar.reminderSent) {
          showNotification({
            title: "⏰ Webinar Starting Soon!",
            message: `${webinar.title} starts in 10 minutes. Get ready to join!`,
            type: "reminder",
            priority: "high",
            duration: 10000,
            actionLabel: "Join Now",
            onAction: () => handleJoinWebinar(webinar),
          })
        }
      })
    }

    const interval = setInterval(checkReminders, 60000) // Check every minute
    checkReminders() // Check immediately

    return () => clearInterval(interval)
  }, [registeredWebinars])

  const handleJoinWebinar = (webinar: any) => {
    // Always allow joining for registered users
    window.open(webinar.meetingLink, "_blank", "noopener,noreferrer")

    if (webinar.status === "live") {
      showNotification({
        title: "🔴 Joining Live Session",
        message: `${webinar.title} is now opening in a new tab`,
        type: "live",
        priority: "high",
        duration: 3000,
      })
    } else {
      showNotification({
        title: "🔗 Opening Meeting Room",
        message: `${webinar.title} meeting room opened. You may need to wait for the host to start.`,
        type: "reminder",
        priority: "medium",
        duration: 5000,
      })
    }
  }

  const copyMeetingLink = (webinar: any) => {
    navigator.clipboard.writeText(webinar.meetingLink)
    showNotification({
      title: "📋 Link Copied",
      message: "Meeting link copied to clipboard",
      type: "update",
      priority: "low",
      duration: 2000,
    })
  }

  const getTimeUntilStart = (startDateTime: Date) => {
    const now = new Date()
    const diff = startDateTime.getTime() - now.getTime()

    if (diff <= 0) return "Live Now"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `Starts in ${days}d ${hours}h`
    if (hours > 0) return `Starts in ${hours}h ${minutes}m`
    if (minutes > 0) return `Starts in ${minutes}m`
    return "Starting soon"
  }

  const getStatusBadge = (webinar: any) => {
    switch (webinar.status) {
      case "live":
        return (
          <Badge className="bg-red-600 text-white animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full mr-1" />
            LIVE NOW
          </Badge>
        )
      case "upcoming":
        return <Badge className="bg-blue-600 text-white">Upcoming</Badge>
      case "ended":
        return <Badge className="bg-gray-600 text-white">Ended</Badge>
      default:
        return null
    }
  }

  const getJoinButtonText = (webinar: any) => {
    if (webinar.status === "live") {
      return "Join Live Now"
    } else if (webinar.status === "upcoming") {
      return "Join Meeting Room"
    } else {
      return "Meeting Ended"
    }
  }

  const getJoinButtonStyle = (webinar: any) => {
    if (webinar.status === "live") {
      return "bg-red-600 hover:bg-red-700 text-white"
    } else if (webinar.status === "upcoming") {
      return "bg-blue-600 hover:bg-blue-700 text-white"
    } else {
      return "bg-gray-600 text-gray-400 cursor-not-allowed"
    }
  }

  const liveWebinars = registeredWebinars.filter((w) => w.status === "live")
  const upcomingWebinars = registeredWebinars.filter((w) => w.status === "upcoming")

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{liveWebinars.length}</div>
            <div className="text-gray-400">Live Now</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{upcomingWebinars.length}</div>
            <div className="text-gray-400">Upcoming</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{registeredWebinars.length}</div>
            <div className="text-gray-400">Total Registered</div>
          </CardContent>
        </Card>
      </div>

      {/* All Registered Webinars */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">My Registered Webinars</h2>
        <div className="space-y-4">
          {registeredWebinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`${webinar.status === "live" ? "bg-gradient-to-r from-red-900/20 to-gray-800 border-red-600/30 border-2" : "bg-gray-800"} border-gray-700`}
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-3">
                      <div className="flex items-center space-x-3 mb-3">
                        {getStatusBadge(webinar)}
                        <Badge className="bg-blue-600 text-white">{webinar.category}</Badge>
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Registered
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{webinar.title}</h3>
                      <p className="text-gray-300 mb-3">{webinar.description}</p>

                      <div className="flex items-center mb-3">
                        <Avatar className="mr-3 w-10 h-10">
                          <AvatarImage src={webinar.instructorImage || "/placeholder.svg"} alt={webinar.instructor} />
                          <AvatarFallback>
                            {webinar.instructor
                              .split(" ")
                              .map((n: any[]) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white text-sm">{webinar.instructor}</p>
                          <p className="text-xs text-gray-400">{webinar.instructorTitle}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                          <span>{webinar.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-400" />
                          <span>{webinar.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-blue-400" />
                          <span>{webinar.attendees} registered</span>
                        </div>
                      </div>

                      {/* Meeting Link Display - Always show for registered users */}
                      {webinar.status !== "ended" && (
                        <div className="bg-gray-700 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <LinkIcon className="h-4 w-4 text-blue-400 mr-2" />
                              <span className="text-sm text-gray-300">Meeting Link:</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyMeetingLink(webinar)}
                              className="text-blue-400 hover:text-blue-300 text-xs"
                            >
                              Copy Link
                            </Button>
                          </div>
                          <div className="text-xs text-blue-400 mt-1 font-mono break-all">{webinar.meetingLink}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                      {/* Countdown Timer or Status */}
                      <div className="bg-gray-700 rounded-lg p-3 text-center">
                        <div
                          className={`font-semibold text-sm ${webinar.status === "live" ? "text-red-400" : webinar.status === "upcoming" ? "text-blue-400" : "text-gray-400"}`}
                        >
                          {getTimeUntilStart(webinar.startDateTime)}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">{webinar.startDateTime.toLocaleDateString()}</div>
                      </div>

                      {/* Join Button - Always show for non-ended webinars */}
                      {webinar.status !== "ended" ? (
                        <Button
                          size="lg"
                          className={getJoinButtonStyle(webinar)}
                          onClick={() => handleJoinWebinar(webinar)}
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          {getJoinButtonText(webinar)}
                        </Button>
                      ) : (
                        <Button size="lg" disabled className="bg-gray-600 text-gray-400 cursor-not-allowed">
                          Meeting Ended
                        </Button>
                      )}

                      <div className="text-center text-xs text-gray-400">
                        {webinar.status === "live"
                          ? "Join the live session now"
                          : webinar.status === "upcoming"
                            ? "You can join early and wait"
                            : "This webinar has ended"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* No registered webinars */}
      {registeredWebinars.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Registered Webinars</h3>
          <p className="text-gray-400 mb-4">You haven&lsquo;t registered for any webinars yet</p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              // Navigate to live webinars tab
              console.log("Navigate to live webinars")
            }}
          >
            Browse Available Webinars
          </Button>
        </div>
      )}
    </div>
  )
}
