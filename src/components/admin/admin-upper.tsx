import React from "react";

import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { auth } from "@/lib/auth";
import { Shield } from "lucide-react";
const AdminUpper = async () => {
  const session = await auth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-800 border-b border-gray-700 px-4">
      <div className="flex items-center gap-2">
        <Separator orientation="vertical" className="mr-2 h-4 bg-gray-600" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="#"
                className="text-gray-400 hover:text-white"
              >
                Admin Panel
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block text-gray-600" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white font-semibold">
                hi
              </BreadcrumbPage>
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
          <span className="text-sm">Welcome, {session?.user?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminUpper;
