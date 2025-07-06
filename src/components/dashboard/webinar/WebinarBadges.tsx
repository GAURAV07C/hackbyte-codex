import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Webinar } from "@/types/webinar";
import { isRegistered } from "@/utils/registration";

interface WebinarBadgesProps {
  webinar: Webinar;
  isLive?: boolean;
}

export function WebinarBadges({ webinar, isLive = false }: WebinarBadgesProps) {
  return (
    <div className="flex items-center space-x-2">
      {isLive && (
        <Badge className="bg-red-600 text-white animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full mr-1" />
          LIVE NOW
        </Badge>
      )}
      <Badge className="bg-blue-600 text-white">{webinar.category}</Badge>
      {isRegistered(webinar.id) && (
        <Badge className="bg-green-600 text-white">
          <CheckCircle className="w-3 h-3 mr-1" />
          Registered
        </Badge>
      )}
      {!isLive && webinar.level && (
        <Badge className="bg-gray-600 text-white">{webinar.level}</Badge>
      )}
    </div>
  );
}
