"use client";

import { siteData } from "@/data/site-data";
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
  Activity,
  ChevronUp,
  User2,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const navigationItems = [
  {
    title: "Dashboard",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: LayoutDashboard,
        color: "text-blue-400",
        link: "/admin/dashboard",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        color: "text-pink-400",
        link: "/admin/dashboard/analytics",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        id: "webinars",
        label: "Webinars",
        icon: Video,
        color: "text-green-400",
        link: "/admin/dashboard/webniars",
      },
      {
        id: "users",
        label: "Users",
        icon: Users,
        color: "text-purple-400",
        link: "/admin/dashboard/user",
      },
      {
        id: "instructors",
        label: "Instructors",
        icon: GraduationCap,
        color: "text-yellow-400",
        link: "/admin/dashboard/instructors",
      },
      {
        id: "content",
        label: "Content",
        icon: FileText,
        color: "text-indigo-400",
        link: "/admin/dashboard/content",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
        color: "text-orange-400",
        link: "/admin/dashboard/notification",
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        color: "text-gray-400",
        link: "/admin/dashboard/setting",
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;
  const logout = () => {
    /* implement logout logic */
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Image src={"/logo.png"} alt="logo" width={90} height={90} />
          </div>
          <div>
            <span className="text-xl font-bold text-white">
              {siteData.company.name}
            </span>
            <div className="text-xs text-red-400 font-semibold">
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={user?.image || "/placeholder.svg"}
              alt={user?.name ?? undefined}
            />
            <AvatarFallback className="bg-blue-600 text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-semibold">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {navigationItems.map((section) => (
          <div key={section.title} className="px-4">
            <div className="text-gray-400 font-semibold text-xs uppercase my-2">
              {section.title}
            </div>
            <ul>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.id;
                return (
                  <Link href={item.link} key={item.id}>
                    <li>
                      <button
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? "text-white" : item.color
                          }`}
                        />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Activity className="h-4 w-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">
            System Online
          </span>
        </div>
        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <div>Uptime: 99.9%</div>
          <div>Last backup: 2 hours ago</div>
        </div>

        {/* User Menu */}
        <div className="relative group">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm bg-gray-800 hover:bg-gray-700 text-white">
            <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() ?? ""}
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">{user?.name}</div>
              <span className="bg-red-600 text-xs text-white rounded px-1">
                Admin
              </span>
            </div>
            <ChevronUp className="h-4 w-4" />
          </button>

          {/* Dropdown */}
          <div className="absolute bottom-12 right-0 hidden group-hover:block bg-gray-800 rounded-lg shadow-lg w-48">
            <button className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm">
              <User2 className="h-4 w-4 mr-2" /> Account
            </button>
            <button className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </button>
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
