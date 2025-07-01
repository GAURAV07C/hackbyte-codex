"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Plus, Search, Edit, Trash2, Eye, ImageIcon, Video, File, Upload, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function ContentManagementTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pages")

  const pages = [
    {
      id: 1,
      title: "Home Page",
      slug: "/",
      status: "published",
      lastModified: "2024-01-20",
      author: "Admin",
      views: 15420,
    },
    {
      id: 2,
      title: "About Us",
      slug: "/about",
      status: "published",
      lastModified: "2024-01-18",
      author: "Admin",
      views: 3240,
    },
    {
      id: 3,
      title: "Privacy Policy",
      slug: "/privacy",
      status: "draft",
      lastModified: "2024-01-15",
      author: "Admin",
      views: 890,
    },
    {
      id: 4,
      title: "Terms of Service",
      slug: "/terms",
      status: "published",
      lastModified: "2024-01-12",
      author: "Admin",
      views: 1250,
    },
  ]

  const mediaFiles = [
    {
      id: 1,
      name: "hero-background.jpg",
      type: "image",
      size: "2.4 MB",
      uploadDate: "2024-01-20",
      url: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "webinar-intro.mp4",
      type: "video",
      size: "45.2 MB",
      uploadDate: "2024-01-19",
      url: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "course-materials.pdf",
      type: "document",
      size: "1.8 MB",
      uploadDate: "2024-01-18",
      url: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "instructor-avatar.png",
      type: "image",
      size: "456 KB",
      uploadDate: "2024-01-17",
      url: "/placeholder.svg?height=100&width=100",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500 text-white"
      case "draft":
        return "bg-yellow-500 text-white"
      case "archived":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-400" />
      case "video":
        return <Video className="h-5 w-5 text-purple-400" />
      case "document":
        return <File className="h-5 w-5 text-green-400" />
      default:
        return <File className="h-5 w-5 text-gray-400" />
    }
  }

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredMedia = mediaFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Management</h1>
          <p className="text-gray-400 mt-1">Manage website pages, media files, and content</p>
        </div>
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Page
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="pageTitle" className="text-gray-300">
                    Page Title
                  </Label>
                  <Input
                    id="pageTitle"
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <Label htmlFor="pageSlug" className="text-gray-300">
                    URL Slug
                  </Label>
                  <Input id="pageSlug" className="bg-gray-700 border-gray-600 text-white" placeholder="/page-url" />
                </div>
                <div>
                  <Label htmlFor="pageContent" className="text-gray-300">
                    Content
                  </Label>
                  <Textarea
                    id="pageContent"
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter page content..."
                    rows={8}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                    Save as Draft
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Publish</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        <Button
          variant={activeTab === "pages" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "pages"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("pages")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Pages
        </Button>
        <Button
          variant={activeTab === "media" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "media"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("media")}
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          Media Library
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

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <div className="space-y-4">
          {filteredPages.map((page, index) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{page.title}</h3>
                        <Badge className={getStatusColor(page.status)}>{page.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          <span>{page.slug}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Modified: {page.lastModified}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          <span>{page.views.toLocaleString()} views</span>
                        </div>
                        <div>
                          <span>Author: {page.author}</span>
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

      {/* Media Tab */}
      {activeTab === "media" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    {file.type === "image" ? (
                      <Image
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white font-medium truncate">{file.name}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{file.size}</span>
                      <span>{file.uploadDate}</span>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent flex-1"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent flex-1"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 bg-transparent flex-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty States */}
      {activeTab === "pages" && filteredPages.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No pages found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or create a new page</p>
        </div>
      )}

      {activeTab === "media" && filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No media files found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or upload new media</p>
        </div>
      )}
    </div>
  )
}
