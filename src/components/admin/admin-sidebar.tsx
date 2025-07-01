"use client"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Video,
  Users,
  GraduationCap,
  BarChart3,
  FileText,
  Bell,
  Settings,
  LogOut,
  Shield,
  Activity,
  ChevronUp,
  User2,
} from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  {
    title: "Dashboard",
    items: [
      { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-blue-400" },
      { id: "analytics", label: "Analytics", icon: BarChart3, color: "text-pink-400" },
    ],
  },
  {
    title: "Management",
    items: [
      { id: "webinars", label: "Webinars", icon: Video, color: "text-green-400" },
      { id: "users", label: "Users", icon: Users, color: "text-purple-400" },
      { id: "instructors", label: "Instructors", icon: GraduationCap, color: "text-yellow-400" },
      { id: "content", label: "Content", icon: FileText, color: "text-indigo-400" },
    ],
  },
  {
    title: "System",
    items: [
      { id: "notifications", label: "Notifications", icon: Bell, color: "text-orange-400" },
      { id: "settings", label: "Settings", icon: Settings, color: "text-gray-400" },
    ],
  },
]

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { user, logout } = useAuth()

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-3 px-2 py-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white h-6 w-6" />
              </div>
              <div>
                <span className="text-white font-bold text-lg">SkillSphere</span>
                <div className="text-xs text-red-400 font-semibold">Admin Panel</div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-gray-400 font-semibold">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeTab === item.id}
                        className={`transition-all duration-200 ${
                          activeTab === item.id
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "text-gray-300 hover:text-white hover:bg-gray-700"
                        }`}
                        onClick={() => onTabChange(item.id)}
                      >
                        <button className="w-full flex items-center">
                          <Icon className={`h-4 w-4 ${activeTab === item.id ? "text-white" : item.color}`} />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-2 px-2 py-2 mb-2">
              <Activity className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">System Online</span>
            </div>
            <div className="text-xs text-gray-400 px-2 space-y-1 mb-4">
              <div>Uptime: 99.9%</div>
              <div>Last backup: 2 hours ago</div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="rounded-lg bg-red-600 text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-red-600 text-white text-xs">Admin</Badge>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gray-800 border-gray-700"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <User2 className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-gray-700" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
