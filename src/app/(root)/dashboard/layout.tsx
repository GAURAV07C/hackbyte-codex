import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardUpper from "@/components/dashboard/dashboard-upper";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Sidebar - hide on small screens, show toggle if needed */}
      <div className="md:block hidden">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <DashboardUpper />
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default layout;
