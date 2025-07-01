/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  Video,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  DollarSign,
  Clock,
  ExternalLink,
  MoreHorizontal,
  Play,
  Pause,
  Settings,
  Copy,
  Share,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { useAdmin } from "@/lib/admin-context"

export function WebinarsManagementTab() {
  const { webinars, addWebinar, updateWebinar, deleteWebinar } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingWebinar, setEditingWebinar] = useState<any>(null)
  const [newWebinar, setNewWebinar] = useState({
    title: "",
    instructor: "",
    instructorTitle: "",
    date: "",
    time: "",
    duration: "",
    description: "",
    category: "",
    level: "",
    maxAttendees: "",
    price: "Free",
  })

  const handleCreateWebinar = () => {
    if (!newWebinar.title || !newWebinar.instructor || !newWebinar.date || !newWebinar.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const webinar = {
      title: newWebinar.title,
      instructor: newWebinar.instructor,
      instructorTitle: newWebinar.instructorTitle,
      instructorImage: "/placeholder.svg?height=40&width=40",
      date: newWebinar.date,
      time: newWebinar.time,
      duration: newWebinar.duration,
      description: newWebinar.description,
      category: newWebinar.category,
      level: newWebinar.level,
      maxAttendees: Number.parseInt(newWebinar.maxAttendees) || 100,
      registered: 0,
      price: newWebinar.price,
      status: "upcoming" as const,
      meetingLink: `https://meet.skillsphere.com/${newWebinar.title.toLowerCase().replace(/\s+/g, "-")}`,
      createdBy: "admin",
    }

    addWebinar(webinar)
    setNewWebinar({
      title: "",
      instructor: "",
      instructorTitle: "",
      date: "",
      time: "",
      duration: "",
      description: "",
      category: "",
      level: "",
      maxAttendees: "",
      price: "Free",
    })
    setIsCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Webinar created successfully!",
    })
  }

  const handleEditWebinar = () => {
    if (!editingWebinar) return

    updateWebinar(editingWebinar.id, editingWebinar)
    setIsEditDialogOpen(false)
    setEditingWebinar(null)
    toast({
      title: "Success",
      description: "Webinar updated successfully!",
    })
  }

  const handleDeleteWebinar = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteWebinar(id)
      toast({
        title: "Success",
        description: "Webinar deleted successfully!",
      })
    }
  }

  const handleJoinWebinar = (webinar: any) => {
    window.open(webinar.meetingLink, "_blank", "noopener,noreferrer")
    toast({
      title: "Joining Webinar",
      description: `Opening meeting for "${webinar.title}"`,
    })
  }

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link Copied",
      description: "Meeting link copied to clipboard!",
    })
  }

  const handleChangeStatus = (id: number, newStatus: string) => {
    updateWebinar(id, { status: newStatus as any })
    toast({
      title: "Status Updated",
      description: `Webinar status changed to ${newStatus}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white animate-pulse"
      case "upcoming":
        return "bg-blue-500 text-white"
      case "completed":
        return "bg-green-500 text-white"
      case "cancelled":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const filteredWebinars = webinars.filter((webinar) => {
    const matchesSearch =
      webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || webinar.status === filterStatus
    const matchesCategory = filterCategory === "all" || webinar.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: webinars.length,
    live: webinars.filter((w) => w.status === "live").length,
    upcoming: webinars.filter((w) => w.status === "upcoming").length,
    completed: webinars.filter((w) => w.status === "completed").length,
    totalRegistrations: webinars.reduce((sum, w) => sum + w.registered, 0),
  }

  const categories = [...new Set(webinars.map((w) => w.category))].filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Webinar Management</h1>
          <p className="text-gray-400 mt-1">Create, manage, and monitor all webinars</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create New Webinar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center">
                  <Video className="mr-2 h-5 w-5 text-red-400" />
                  Create New Webinar
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={newWebinar.title}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, title: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                      placeholder="Enter webinar title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-gray-300">
                      Category *
                    </Label>
                    <Select
                      value={newWebinar.category}
                      onValueChange={(value) => setNewWebinar((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instructor" className="text-gray-300">
                      Instructor Name *
                    </Label>
                    <Input
                      id="instructor"
                      value={newWebinar.instructor}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, instructor: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                      placeholder="Enter instructor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructorTitle" className="text-gray-300">
                      Instructor Title
                    </Label>
                    <Input
                      id="instructorTitle"
                      value={newWebinar.instructorTitle}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, instructorTitle: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                      placeholder="e.g., Senior Developer, Google"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-300">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newWebinar.date}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, date: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-gray-300">
                      Time *
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newWebinar.time}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, time: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-gray-300">
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      value={newWebinar.duration}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, duration: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="level" className="text-gray-300">
                      Level
                    </Label>
                    <Select
                      value={newWebinar.level}
                      onValueChange={(value) => setNewWebinar((prev) => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maxAttendees" className="text-gray-300">
                      Max Attendees
                    </Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={newWebinar.maxAttendees}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, maxAttendees: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-gray-300">
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={newWebinar.price}
                      onChange={(e) => setNewWebinar((prev) => ({ ...prev, price: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                      placeholder="Free or $99"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newWebinar.description}
                    onChange={(e) => setNewWebinar((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                    placeholder="Enter webinar description..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateWebinar} className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Webinar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Webinars</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <Video className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Live Now</p>
                <p className="text-2xl font-bold text-white">{stats.live}</p>
                <p className="text-xs text-red-400 mt-1">Active sessions</p>
              </div>
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Upcoming</p>
                <p className="text-2xl font-bold text-white">{stats.upcoming}</p>
                <p className="text-xs text-blue-400 mt-1">Scheduled</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
                <p className="text-xs text-green-400 mt-1">Finished</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Registrations</p>
                <p className="text-2xl font-bold text-white">{stats.totalRegistrations}</p>
                <p className="text-xs text-purple-400 mt-1">All webinars</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search webinars by title, instructor, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white focus:border-red-500"
              />
            </div>
            <div className="flex space-x-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Webinars List */}
      <div className="space-y-4">
        {filteredWebinars.map((webinar, index) => (
          <motion.div
            key={webinar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className={getStatusColor(webinar.status)}>{webinar.status.toUpperCase()}</Badge>
                      <Badge className="bg-blue-600 text-white">{webinar.category}</Badge>
                      {webinar.level && (
                        <Badge variant="outline" className="border-gray-500 text-gray-300">
                          {webinar.level}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 hover:text-red-400 transition-colors cursor-pointer">
                      {webinar.title}
                    </h3>
                    <p className="text-gray-300 mb-3 line-clamp-2">{webinar.description}</p>

                    <div className="flex items-center mb-3">
                      <Avatar className="mr-3 w-10 h-10">
                        <AvatarImage src={webinar.instructorImage || "/placeholder.svg"} alt={webinar.instructor} />
                        <AvatarFallback className="bg-red-600 text-white">
                          {webinar.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white text-sm">{webinar.instructor}</p>
                        <p className="text-xs text-gray-400">{webinar.instructorTitle}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                        <span>{new Date(webinar.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-2 text-blue-400" />
                        <span>{webinar.time}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-2 text-blue-400" />
                        <span>
                          {webinar.registered}/{webinar.maxAttendees} registered
                        </span>
                        <div className="ml-2 w-16 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(webinar.registered / webinar.maxAttendees) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <DollarSign className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="font-semibold text-green-400">{webinar.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      onClick={() => handleJoinWebinar(webinar)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Join Meeting
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                      onClick={() => {
                        setEditingWebinar(webinar)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem
                          className="text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => handleCopyLink(webinar.meetingLink)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {webinar.status === "upcoming" && (
                          <DropdownMenuItem
                            className="text-green-400 hover:text-green-300 hover:bg-gray-700"
                            onClick={() => handleChangeStatus(webinar.id, "live")}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Live
                          </DropdownMenuItem>
                        )}
                        {webinar.status === "live" && (
                          <DropdownMenuItem
                            className="text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                            onClick={() => handleChangeStatus(webinar.id, "completed")}
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            End Session
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                          onClick={() => handleDeleteWebinar(webinar.id, webinar.title)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Edit className="mr-2 h-5 w-5 text-blue-400" />
              Edit Webinar
            </DialogTitle>
          </DialogHeader>
          {editingWebinar && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title" className="text-gray-300">
                    Title *
                  </Label>
                  <Input
                    id="edit-title"
                    value={editingWebinar.title}
                    onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category" className="text-gray-300">
                    Category *
                  </Label>
                  <Select
                    value={editingWebinar.category}
                    onValueChange={(value) => setEditingWebinar((prev: any) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-instructor" className="text-gray-300">
                    Instructor Name *
                  </Label>
                  <Input
                    id="edit-instructor"
                    value={editingWebinar.instructor}
                    onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, instructor: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-instructorTitle" className="text-gray-300">
                    Instructor Title
                  </Label>
                  <Input
                    id="edit-instructorTitle"
                    value={editingWebinar.instructorTitle || ""}
                    onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, instructorTitle: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-date" className="text-gray-300">
                    Date *
                  </Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingWebinar.date}
                    onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, date: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-time" className="text-gray-300">
                    Time *
                  </Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editingWebinar.time}
                    onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, time: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-duration" className="text-gray-300">
                    Duration
                  </Label>
                  <Input
                    id="edit-duration"
                    value={editingWebinar.duration || ""}
                    onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, duration: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingWebinar.description || ""}
                  onChange={(e) => setEditingWebinar((prev: any) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button onClick={handleEditWebinar} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Update Webinar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredWebinars.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No webinars found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || filterStatus !== "all" || filterCategory !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first webinar to get started"}
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Webinar
          </Button>
        </div>
      )}
    </div>
  )
}
