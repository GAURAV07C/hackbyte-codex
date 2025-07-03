import React from "react";
import { NotificationsDropdown } from "./notifications-dropdown";

const DashboardUpper = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg",
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white capitalize"></h1>
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
  );
};

export default DashboardUpper;
