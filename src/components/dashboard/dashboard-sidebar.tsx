"use client";

import { siteData } from "@/data/site-data";
import {
  BookOpen,
  Home,
  LogOut,
  Settings,
  Star,
  User,
  Video,
} from "lucide-react";
import React from "react";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home, link: "/dashboard" },
    {
      id: "live",
      label: "Live Webinars",
      icon: Video,
      link: "/dashboard/live-webinars",
    },
    {
      id: "purchased",
      label: "My Webinars",
      icon: BookOpen,
      link: "/dashboard/my-webinars",
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: Star,
      link: "/dashboard/certificates",
    },
    { id: "profile", label: "Profile", icon: User, link: "/dashboard/profile" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
             <Image src={"/logo.png"} alt="logo" width={90} height={90} />
          </div>
          <div>
            <span className="text-xl font-bold text-white">
              {siteData.company.name}
            </span>
            <div className="text-xs text-gray-400">Dashboard</div>
          </div>
        </div>
      </div>

      {/* User Info */}
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
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Link href={item.link}>
                  <Button
                    variant={pathname === item.link ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      pathname === item.link
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
