import { Webinar } from "@/types/webinar";
import { getTimeUntilStart } from "@/utils/dateTime";

interface CountdownTimerProps {
  webinar: Webinar;
}

export function CountdownTimer({ webinar }: CountdownTimerProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-3 mb-4">
      <div className="text-center">
        <div className="text-blue-400 font-semibold text-sm">
          {getTimeUntilStart(webinar.startDateTime)}
        </div>
        <div className="text-gray-400 text-xs mt-1">
          {webinar.startDateTime.toLocaleDateString()} at{" "}
          {webinar.startDateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
