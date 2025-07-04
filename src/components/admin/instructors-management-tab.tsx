"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  Search,
  Edit,
  Eye,
  Mail,
  Calendar,
  Users,
  Video,
  Star,
  TrendingUp,
  UserPlus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
export function InstructorsManagementTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const instructors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah@skillsphere.com",
      title: "AI Research Director, Google",
      specialization: "AI & Machine Learning",
      joinedDate: "2024-01-10",
      totalWebinars: 12,
      totalStudents: 2450,
      rating: 4.9,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Leading AI researcher with 10+ years of experience in machine learning and deep learning.",
      upcomingWebinars: 3,
      completedWebinars: 9,
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus@skillsphere.com",
      title: "Senior Developer, Netflix",
      specialization: "Full-Stack Development",
      joinedDate: "2024-01-08",
      totalWebinars: 8,
      totalStudents: 1890,
      rating: 4.8,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Full-stack developer specializing in React, Node.js, and cloud architecture.",
      upcomingWebinars: 2,
      completedWebinars: 6,
    },
    {
      id: 3,
      name: "Emma Thompson",
      email: "emma@skillsphere.com",
      title: "Marketing Director, Shopify",
      specialization: "Digital Marketing",
      joinedDate: "2024-01-05",
      totalWebinars: 15,
      totalStudents: 3200,
      rating: 4.7,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Digital marketing expert with expertise in growth hacking and conversion optimization.",
      upcomingWebinars: 4,
      completedWebinars: 11,
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@skillsphere.com",
      title: "UX Director, Adobe",
      specialization: "UI/UX Design",
      joinedDate: "2024-01-12",
      totalWebinars: 6,
      totalStudents: 1560,
      rating: 4.9,
      status: "active",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Award-winning UX designer with a passion for creating intuitive user experiences.",
      upcomingWebinars: 1,
      completedWebinars: 5,
    },
  ];

  const handleCreateInstructor = () => {};

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      instructor.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: instructors.length,
    active: instructors.filter((i) => i.status === "active").length,
    totalWebinars: instructors.reduce((sum, i) => sum + i.totalWebinars, 0),
    totalStudents: instructors.reduce((sum, i) => sum + i.totalStudents, 0),
    avgRating: (
      instructors.reduce((sum, i) => sum + i.rating, 0) / instructors.length
    ).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Instructor Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage instructors, their profiles, and performance
          </p>
        </div>

        {/*  */}

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center">
                <Video className="mr-2 h-5 w-5 text-red-400" />
                Create New In
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
                    className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                    placeholder="Enter webinar title"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">
                    Category *
                  </Label>
                  <Select>
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
                    className="bg-gray-700 border-gray-600 text-white focus:border-red-500"
                  />
                </div>
                <div>
                  <Label htmlFor="duration" className="text-gray-300">
                    Duration
                  </Label>
                  <Input
                    id="duration"
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
                  <Select>
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
                <Button
                  onClick={handleCreateInstructor}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Webinar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/*  */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Instructors</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active</p>
                <p className="text-2xl font-bold text-white">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Webinars</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalWebinars}
                </p>
              </div>
              <Video className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Students</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalStudents.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">
                  {stats.avgRating}
                </p>
              </div>
              <Star className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInstructors.map((instructor, index) => (
          <motion.div
            key={instructor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={instructor.avatar || "/placeholder.svg"}
                      alt={instructor.name}
                    />
                    <AvatarFallback className="bg-gray-600 text-white text-lg">
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {instructor.name}
                      </h3>
                      <Badge className="bg-green-500 text-white">
                        {instructor.status}
                      </Badge>
                    </div>

                    <p className="text-gray-300 text-sm mb-1">
                      {instructor.title}
                    </p>
                    <p className="text-blue-400 text-sm font-medium mb-3">
                      {instructor.specialization}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {instructor.bio}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-xs">
                              Total Webinars
                            </p>
                            <p className="text-white font-bold">
                              {instructor.totalWebinars}
                            </p>
                          </div>
                          <Video className="h-5 w-5 text-blue-400" />
                        </div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-xs">Students</p>
                            <p className="text-white font-bold">
                              {instructor.totalStudents.toLocaleString()}
                            </p>
                          </div>
                          <Users className="h-5 w-5 text-green-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-gray-400 text-xs">Rating</p>
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-white font-bold">
                            {instructor.rating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Upcoming</p>
                        <p className="text-white font-bold">
                          {instructor.upcomingWebinars}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Completed</p>
                        <p className="text-white font-bold">
                          {instructor.completedWebinars}
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{instructor.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Joined: {instructor.joinedDate}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredInstructors.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            No instructors found
          </h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
