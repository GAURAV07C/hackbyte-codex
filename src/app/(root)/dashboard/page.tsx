"use client";

import { useState } from "react";
// import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { OverviewTab } from "@/components/dashboard/overview-tab";
import { LiveWebinarsTab } from "@/components/dashboard/live-webinars-tab";
import { MyWebinarsTab } from "@/components/dashboard/my-webinars-tab";
import { Card, CardContent } from "@/components/ui/card";
import { User, Settings, Award } from "lucide-react";

export default function DashboardPage() {
  // const { user } = useAuth(); 
  const [activeTab, setActiveTab] = useState("overview");
  // Define user type as object for now to avoid empty interface lint error
  const user: object[] = [];
  if (!user) {
    return null; // This will be handled by the auth redirect
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "live":
        return <LiveWebinarsTab />;
      case "purchased":
        return <MyWebinarsTab />;
      case "certificates":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Certificates
                </h3>
                <p className="text-gray-400">
                  Your earned certificates will appear here
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <User className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Profile Settings
                </h3>
                <p className="text-gray-400">Manage your profile information</p>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Settings</h3>
                <p className="text-gray-400">Configure your preferences</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <OverviewTab />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
}
