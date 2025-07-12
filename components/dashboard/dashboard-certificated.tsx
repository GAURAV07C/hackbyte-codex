import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import {  Award } from "lucide-react";
const Certificated = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-8 text-center">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Certificates</h3>
          <p className="text-gray-400">
            Your earned certificates will appear here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Certificated
