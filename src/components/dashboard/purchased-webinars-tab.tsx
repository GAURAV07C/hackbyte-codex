"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Play, Download, Star, Clock, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function PurchasedWebinarsTab() {
  const purchasedWebinars = [
    {
      id: 1,
      title: "Digital Marketing Essentials",
      instructor: "Michael Chen",
      instructorImage: "/placeholder.svg?height=60&width=60",
      purchaseDate: "Dec 15, 2024",
      completionDate: "Dec 20, 2024",
      duration: "2.5 hours",
      progress: 100,
      status: "completed",
      category: "Marketing",
      rating: 5,
      certificateAvailable: true,
      recordingUrl: "#",
    },
    {
      id: 2,
      title: "Leadership Development",
      instructor: "Sarah Johnson",
      instructorImage: "/placeholder.svg?height=60&width=60",
      purchaseDate: "Dec 10, 2024",
      completionDate: null,
      duration: "2 hours",
      progress: 75,
      status: "in-progress",
      category: "Leadership",
      rating: null,
      certificateAvailable: false,
      recordingUrl: "#",
    },
    {
      id: 3,
      title: "Data Analysis Fundamentals",
      instructor: "Dr. Emily Rodriguez",
      instructorImage: "/placeholder.svg?height=60&width=60",
      purchaseDate: "Nov 28, 2024",
      completionDate: "Dec 5, 2024",
      duration: "3 hours",
      progress: 100,
      status: "completed",
      category: "Analytics",
      rating: 5,
      certificateAvailable: true,
      recordingUrl: "#",
    },
    {
      id: 4,
      title: "Project Management Best Practices",
      instructor: "James Wilson",
      instructorImage: "/placeholder.svg?height=60&width=60",
      purchaseDate: "Nov 20, 2024",
      completionDate: null,
      duration: "2.5 hours",
      progress: 30,
      status: "in-progress",
      category: "Management",
      rating: null,
      certificateAvailable: false,
      recordingUrl: "#",
    },
  ]

  const handleWatchRecording = (webinar: any) => {
    alert(`Opening recording for: ${webinar.title}`)
  }

  const handleDownloadCertificate = (webinar: any) => {
    alert(`Downloading certificate for: ${webinar.title}`)
  }

  const handleRateWebinar = (webinar: any, rating: number) => {
    alert(`Rating ${webinar.title}: ${rating} stars`)
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{purchasedWebinars.length}</div>
            <div className="text-gray-400">Total Purchased</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {purchasedWebinars.filter((w) => w.status === "completed").length}
            </div>
            <div className="text-gray-400">Completed</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {purchasedWebinars.filter((w) => w.certificateAvailable).length}
            </div>
            <div className="text-gray-400">Certificates</div>
          </CardContent>
        </Card>
      </div>

      {/* Webinars List */}
      <div className="space-y-4">
        {purchasedWebinars.map((webinar, index) => (
          <motion.div
            key={webinar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Webinar Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-blue-600 text-white">{webinar.category}</Badge>
                      {webinar.status === "completed" && (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{webinar.title}</h3>

                    <div className="flex items-center mb-3">
                      <Avatar className="mr-3 w-10 h-10">
                        <AvatarImage src={webinar.instructorImage || "/placeholder.svg"} alt={webinar.instructor} />
                        <AvatarFallback>
                          {webinar.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white text-sm">{webinar.instructor}</p>
                        <p className="text-xs text-gray-400">Instructor</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Purchased: {webinar.purchaseDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Duration: {webinar.duration}</span>
                      </div>
                      {webinar.completionDate && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                          <span>Completed: {webinar.completionDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">{webinar.progress}%</span>
                      </div>
                      <Progress value={webinar.progress} className="h-2" />
                    </div>

                    {webinar.rating && (
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">Your Rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < webinar.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleWatchRecording(webinar)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Recording
                    </Button>

                    {webinar.certificateAvailable && (
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        onClick={() => handleDownloadCertificate(webinar)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Certificate
                      </Button>
                    )}

                    {!webinar.rating && webinar.status === "completed" && (
                      <div className="pt-2">
                        <p className="text-xs text-gray-400 mb-2">Rate this webinar:</p>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => handleRateWebinar(webinar, i + 1)}
                              className="text-gray-600 hover:text-yellow-400 transition-colors"
                            >
                              <Star className="h-4 w-4" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
