"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Play,
  TrendingUp,
  Award,
  Video,
} from "lucide-react"
import { motion } from "framer-motion"

export function OverviewTab() {
  const stats = [
    { title: "Webinars Attended", value: "12", icon: Video, color: "text-blue-400" },
    { title: "Certificates Earned", value: "8", icon: Award, color: "text-green-400" },
    { title: "Hours Learned", value: "24", icon: Clock, color: "text-purple-400" },
    { title: "Skill Level", value: "Expert", icon: TrendingUp, color: "text-yellow-400" },
  ]

  const upcomingWebinars = [
    {
      id: 1,
      title: "AI & Machine Learning Mastery",
      instructor: "Dr. Sarah Chen",
      date: "Today",
      time: "7:00 PM EST",
      status: "live",
      attendees: 1250,
    },
    {
      id: 2,
      title: "Full-Stack Development Bootcamp",
      instructor: "Marcus Rodriguez",
      date: "Jan 18, 2025",
      time: "6:30 PM EST",
      status: "upcoming",
      attendees: 980,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Completed",
      item: "Digital Marketing Essentials",
      time: "2 hours ago",
      type: "completion",
    },
    {
      id: 2,
      action: "Joined",
      item: "Leadership Development Live Session",
      time: "1 day ago",
      type: "join",
    },
    {
      id: 3,
      action: "Downloaded",
      item: "Project Management Certificate",
      time: "3 days ago",
      type: "download",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Webinars + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Webinars */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Webinars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700 rounded-lg gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center flex-wrap space-x-2 mb-2">
                    <h4 className="font-semibold text-white">{webinar.title}</h4>
                    {webinar.status === "live" && (
                      <Badge className="bg-red-600 text-white flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">by {webinar.instructor}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>
                      {webinar.date} at {webinar.time}
                    </span>
                    <span>{webinar.attendees} registered</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className={`w-full sm:w-auto ${
                    webinar.status === "live" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {webinar.status === "live" ? (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      Join Live
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg"
              >
                <div
                  className={`w-2 h-2 mt-1 rounded-full ${
                    activity.type === "completion"
                      ? "bg-green-400"
                      : activity.type === "join"
                      ? "bg-blue-400"
                      : "bg-purple-400"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-white text-sm">
                    <span className="font-semibold">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
