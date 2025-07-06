import { Clock, Users, Calendar } from "lucide-react";
import { Webinar } from "@/types/webinar";

interface WebinarStatsProps {
  webinar: Webinar;
  isLive?: boolean;
}

export function WebinarStats({ webinar, isLive = false }: WebinarStatsProps) {
  if (isLive) {
    return (
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-blue-400" />
          <span>{webinar.duration}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-blue-400" />
          <span>{webinar.attendees} live now</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center text-sm text-gray-400">
        <Calendar className="h-4 w-4 mr-2 text-blue-400" />
        <span>{webinar.date}</span>
      </div>
      <div className="flex items-center text-sm text-gray-400">
        <Clock className="h-4 w-4 mr-2 text-blue-400" />
        <span>{webinar.time}</span>
      </div>
      <div className="flex items-center text-sm text-gray-400">
        <Users className="h-4 w-4 mr-2 text-blue-400" />
        <span>
          {webinar.attendees}/{webinar.maxAttendees} registered
        </span>
      </div>
    </div>
  );
}
