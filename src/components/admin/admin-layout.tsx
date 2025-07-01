"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AdminSidebar } from "./admin-sidebar"
import { Shield } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const { user } = useAuth()

  const getTabTitle = (tab: string) => {
    const titles: Record<string, string> = {
      overview: "Overview",
      webinars: "Webinar Management",
      users: "User Management",
      instructors: "Instructor Management",
      analytics: "Analytics",
      content: "Content Management",
      notifications: "Notifications",
      settings: "Settings",
    }
    return titles[tab] || "Dashboard"
  }

  return (
    <SidebarProvider>
      <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-800 border-b border-gray-700 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 text-gray-400 hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-gray-600" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-gray-400 hover:text-white">
                    Admin Panel
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white font-semibold">{getTabTitle(activeTab)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="text-green-400 font-bold">1,250</div>
                <div className="text-gray-400 text-xs">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold">4</div>
                <div className="text-gray-400 text-xs">Live Now</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-bold">12</div>
                <div className="text-gray-400 text-xs">Scheduled</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="h-4 w-4 text-red-400" />
              <span className="text-sm">Welcome, {user?.name}</span>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-gray-900 min-h-screen">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-900 p-4">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
