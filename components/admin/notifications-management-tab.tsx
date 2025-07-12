/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Plus, Search, Send, Mail, Users, Calendar, Eye, Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export function NotificationsManagementTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("notifications")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    target: "all",
    scheduledDate: "",
  })

  const notifications = [
    {
      id: 1,
      title: "New Webinar Available",
      message: "Check out our latest React Advanced Patterns webinar",
      type: "info",
      target: "all",
      status: "sent",
      sentDate: "2024-01-20",
      recipients: 2450,
    },
    {
      id: 2,
      title: "System Maintenance",
      message: "Scheduled maintenance on January 25th from 2-4 AM EST",
      type: "warning",
      target: "all",
      status: "scheduled",
      scheduledDate: "2024-01-25",
      recipients: 2450,
    },
    {
      id: 3,
      title: "Welcome to SkillSphere",
      message: "Thank you for joining our learning platform",
      type: "success",
      target: "new_users",
      status: "active",
      sentDate: "2024-01-19",
      recipients: 145,
    },
  ]

  const emailCampaigns = [
    {
      id: 1,
      name: "Weekly Newsletter",
      subject: "This Week in SkillSphere",
      status: "active",
      subscribers: 2450,
      openRate: "24.5%",
      clickRate: "3.2%",
      lastSent: "2024-01-20",
    },
    {
      id: 2,
      name: "New Course Announcements",
      subject: "New Courses Added This Month",
      status: "draft",
      subscribers: 1890,
      openRate: "18.7%",
      clickRate: "2.8%",
      lastSent: "2024-01-15",
    },
    {
      id: 3,
      name: "Webinar Reminders",
      subject: "Don't Miss Tomorrow's Webinar",
      status: "active",
      subscribers: 3200,
      openRate: "32.1%",
      clickRate: "5.4%",
      lastSent: "2024-01-19",
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Welcome Email",
      type: "email",
      usage: 145,
      lastModified: "2024-01-18",
    },
    {
      id: 2,
      name: "Webinar Reminder",
      type: "notification",
      usage: 89,
      lastModified: "2024-01-17",
    },
    {
      id: 3,
      name: "Course Completion",
      type: "email",
      usage: 234,
      lastModified: "2024-01-16",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      case "info":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500 text-white"
      case "scheduled":
        return "bg-blue-500 text-white"
      case "draft":
        return "bg-yellow-500 text-white"
      case "active":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleCreateNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      alert("Please fill in all required fields")
      return
    }

    // Here you would typically send the notification to your backend
    console.log("Creating notification:", newNotification)

    setNewNotification({
      title: "",
      message: "",
      type: "info",
      target: "all",
      scheduledDate: "",
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications & Communications</h1>
          <p className="text-gray-400 mt-1">Manage notifications, email campaigns, and templates</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Notification</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-gray-300">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification((prev) => ({ ...prev, message: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter notification message..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="text-gray-300">
                    Type
                  </Label>
                  <Select
                    value={newNotification.type}
                    onValueChange={(value: any) => setNewNotification((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target" className="text-gray-300">
                    Target Audience
                  </Label>
                  <Select
                    value={newNotification.target}
                    onValueChange={(value: any) => setNewNotification((prev) => ({ ...prev, target: value }))}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="new_users">New Users</SelectItem>
                      <SelectItem value="active_users">Active Users</SelectItem>
                      <SelectItem value="instructors">Instructors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="scheduledDate" className="text-gray-300">
                  Schedule Date (Optional)
                </Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={newNotification.scheduledDate}
                  onChange={(e) => setNewNotification((prev) => ({ ...prev, scheduledDate: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateNotification} className="bg-red-600 hover:bg-red-700 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sent</p>
                <p className="text-2xl font-bold text-white">12,543</p>
              </div>
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Email Subscribers</p>
                <p className="text-2xl font-bold text-white">2,450</p>
              </div>
              <Mail className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Open Rate</p>
                <p className="text-2xl font-bold text-white">24.5%</p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Campaigns</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <Users className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        <Button
          variant={activeTab === "notifications" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "notifications"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
        <Button
          variant={activeTab === "campaigns" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "campaigns"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("campaigns")}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Campaigns
        </Button>
        <Button
          variant={activeTab === "templates" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "templates"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("templates")}
        >
          <Edit className="mr-2 h-4 w-4" />
          Templates
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                        <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                        <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                      </div>

                      <p className="text-gray-300 mb-3">{notification.message}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>{notification.recipients.toLocaleString()} recipients</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>
                            {notification.status === "scheduled"
                              ? `Scheduled: ${notification.scheduledDate}`
                              : `Sent: ${notification.sentDate}`}
                          </span>
                        </div>
                        <div>
                          <span>Target: {notification.target.replace("_", " ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Email Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-4">
          {emailCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      </div>

                      <p className="text-gray-300 mb-3">{campaign.subject}</p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>{campaign.subscribers.toLocaleString()} subscribers</span>
                        </div>
                        <div>
                          <span>Open Rate: {campaign.openRate}</span>
                        </div>
                        <div>
                          <span>Click Rate: {campaign.clickRate}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Last sent: {campaign.lastSent}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    <Badge className="bg-blue-500 text-white">{template.type}</Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Usage:</span>
                      <span className="text-white">{template.usage} times</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last modified:</span>
                      <span className="text-white">{template.lastModified}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
