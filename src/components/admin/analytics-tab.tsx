/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, DollarSign, Video, Calendar, Download, Eye } from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsTab() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+23.5%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "New Users",
      value: "2,847",
      change: "+12.3%",
      changeType: "increase",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Webinar Views",
      value: "45,231",
      change: "+8.7%",
      changeType: "increase",
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Completion Rate",
      value: "87.2%",
      change: "+2.1%",
      changeType: "increase",
      icon: TrendingUp,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
  ]

  const topWebinars = [
    {
      id: 1,
      title: "React Advanced Patterns",
      instructor: "John Smith",
      views: 2450,
      revenue: "$12,250",
      rating: 4.9,
      completionRate: "92%",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Sarah Johnson",
      views: 1890,
      revenue: "$9,450",
      rating: 4.8,
      completionRate: "89%",
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Mike Wilson",
      views: 1650,
      revenue: "$8,250",
      rating: 4.7,
      completionRate: "85%",
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Emily Davis",
      views: 1420,
      revenue: "$7,100",
      rating: 4.9,
      completionRate: "91%",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "registration",
      message: "New user registered for React Advanced Patterns",
      time: "2 minutes ago",
      user: "John Doe",
    },
    {
      id: 2,
      type: "completion",
      message: "User completed UI/UX Design Fundamentals",
      time: "5 minutes ago",
      user: "Sarah Smith",
    },
    {
      id: 3,
      type: "payment",
      message: "Payment received for Digital Marketing Strategy",
      time: "10 minutes ago",
      amount: "$199",
    },
    {
      id: 4,
      type: "webinar",
      message: "New webinar scheduled: Advanced JavaScript",
      time: "15 minutes ago",
      instructor: "Mike Johnson",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <Users className="h-4 w-4 text-blue-400" />
      case "completion":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-yellow-400" />
      case "webinar":
        return <Video className="h-4 w-4 text-purple-400" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Track performance, revenue, and user engagement</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{stat.change}</Badge>
                        <span className="text-gray-400 text-xs ml-2">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Webinars */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Top Performing Webinars
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topWebinars.map((webinar, index) => (
              <div key={webinar.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{webinar.title}</h4>
                  <p className="text-gray-400 text-sm">by {webinar.instructor}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {webinar.views.toLocaleString()} views
                    </span>
                    <span className="text-xs text-green-400">{webinar.revenue}</span>
                    <span className="text-xs text-yellow-400">★ {webinar.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-500 text-white mb-2">{webinar.completionRate}</Badge>
                  <p className="text-xs text-gray-400">completion</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                    {activity.user && <span className="text-blue-400 text-xs">• {activity.user}</span>}
                    {activity.instructor && <span className="text-purple-400 text-xs">• {activity.instructor}</span>}
                    {activity.amount && <span className="text-green-400 text-xs">• {activity.amount}</span>}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart Placeholder */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Revenue chart would be displayed here</p>
              <p className="text-gray-500 text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Growth Chart Placeholder */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">User growth chart would be displayed here</p>
              <p className="text-gray-500 text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
