"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Star, Settings, User, LogOut, Home, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { siteData } from "@/data/site-data"
import { NotificationsDropdown } from "./notifications-dropdown"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {

  
  // TODO: Replace with real user and logout logic from your auth provider
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg"
  }
  const logout = () => {
    // Implement logout logic here
    alert("Logged out")
  }
  const [] = useState([
    {
      id: 1,
      title: "New Webinar: AI & Machine Learning",
      message: "Starting in 30 minutes",
      time: "2 min ago",
      type: "live",
      read: false,
    },
    {
      id: 2,
      title: "Certificate Ready",
      message: "Your Digital Marketing certificate is ready for download",
      time: "1 hour ago",
      type: "certificate",
      read: false,
    },
    {
      id: 3,
      title: "Upcoming Session Reminder",
      message: "Project Management webinar tomorrow at 4 PM",
      time: "3 hours ago",
      type: "reminder",
      read: true,
    },
  ])

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "live", label: "Live Webinars", icon: Video },
    { id: "purchased", label: "My Webinars", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Star },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-xl font-bold text-white">{siteData.company.name}</span>
              <div className="text-xs text-gray-400">Dashboard</div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="bg-blue-600 text-white">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-semibold">{user?.name}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === item.id
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={() => onTabChange(item.id)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={logout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white capitalize">
                {activeTab === "overview"
                  ? "Dashboard Overview"
                  : activeTab === "live"
                    ? "Live Webinars"
                    : activeTab === "purchased"
                      ? "My Webinars"
                      : activeTab === "certificates"
                        ? "Certificates"
                        : activeTab === "profile"
                          ? "Profile"
                          : "Settings"}
              </h1>
              <p className="text-gray-400">Welcome back, {user?.name}</p>
            </div>

            <div className="flex items-center space-x-4">

              {/* Notifications */}
              <div className="relative">
                <NotificationsDropdown />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
