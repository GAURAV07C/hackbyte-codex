/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Video, Users, TrendingUp, Calendar, DollarSign, Activity, UserPlus, Plus } from "lucide-react"
import { motion } from "framer-motion"


export function AdminOverviewTab() {
  const webinars: any[] = []
  const users: any[] = []

  const stats = {
    totalWebinars: webinars.length,
    liveWebinars: webinars.filter((w) => w.status === "live").length,
    upcomingWebinars: webinars.filter((w) => w.status === "upcoming").length,
    completedWebinars: webinars.filter((w) => w.status === "completed").length,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    instructors: users.filter((u) => u.role === "instructor").length,
    totalRegistrations: webinars.reduce((sum, w) => sum + w.registered, 0),
    revenue: webinars.reduce((sum, w) => {
      const price = w.price === "Free" ? 0 : Number.parseFloat(w.price.replace("$", "")) || 0
      return sum + price * w.registered
    }, 0),
  }

  const recentWebinars = webinars.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  const recentUsers = users
    .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
    .slice(0, 5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white animate-pulse"
      case "upcoming":
        return "bg-blue-500 text-white"
      case "completed":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500 text-white"
      case "instructor":
        return "bg-purple-500 text-white"
      case "user":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome to your admin dashboard</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Webinars</p>
                  <p className="text-3xl font-bold text-white">{stats.totalWebinars}</p>
                  <p className="text-xs text-blue-400 mt-1">+12% from last month</p>
                </div>
                <Video className="h-10 w-10 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-xs text-green-400 mt-1">+8% from last month</p>
                </div>
                <Users className="h-10 w-10 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">${stats.revenue.toLocaleString()}</p>
                  <p className="text-xs text-purple-400 mt-1">+15% from last month</p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Sessions</p>
                  <p className="text-3xl font-bold text-white">{stats.liveWebinars}</p>
                  <p className="text-xs text-red-400 mt-1">Live now</p>
                </div>
                <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Webinar Status</h3>
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Live</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white font-semibold">{stats.liveWebinars}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Upcoming</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-white font-semibold">{stats.upcomingWebinars}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-white font-semibold">{stats.completedWebinars}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">User Statistics</h3>
              <Users className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Users</span>
                <span className="text-white font-semibold">{stats.activeUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Instructors</span>
                <span className="text-white font-semibold">{stats.instructors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Registrations</span>
                <span className="text-white font-semibold">{stats.totalRegistrations}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">System Health</h3>
              <Activity className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Server Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-400 font-semibold">Online</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Uptime</span>
                <span className="text-white font-semibold">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Backup</span>
                <span className="text-white font-semibold">2h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Video className="mr-2 h-5 w-5 text-blue-400" />
              Recent Webinars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentWebinars.map((webinar) => (
              <div key={webinar.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={webinar.instructorImage || "/placeholder.svg"} alt={webinar.instructor} />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {webinar.instructor
                        .split(" ")
                        .map((n: any[]) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">{webinar.title}</p>
                    <p className="text-gray-400 text-xs">{webinar.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(webinar.status)} variant="secondary">
                    {webinar.status}
                  </Badge>
                  <span className="text-gray-400 text-xs">{webinar.registered} registered</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-green-400" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-green-600 text-white text-xs">
                      {user.name
                        .split(" ")
                        .map((n: any[]) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRoleColor(user.role)} variant="secondary">
                    {user.role}
                  </Badge>
                  <span className="text-gray-400 text-xs">{new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white h-20 flex flex-col items-center justify-center">
              <Video className="h-6 w-6 mb-2" />
              Create Webinar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-20 flex flex-col items-center justify-center">
              <UserPlus className="h-6 w-6 mb-2" />
              Add User
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white h-20 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Analytics
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white h-20 flex flex-col items-center justify-center">
              <Activity className="h-6 w-6 mb-2" />
              System Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
