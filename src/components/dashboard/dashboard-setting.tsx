import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

const Setting = () => {
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
}

export default Setting
