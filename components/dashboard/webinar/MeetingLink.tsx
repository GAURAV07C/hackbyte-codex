import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { Webinar } from "@/types/webinar";
import { showNotification } from "@/utils/notifications";

interface MeetingLinkProps {
  webinar: Webinar;
}

export function MeetingLink({ webinar }: MeetingLinkProps) {
  const copyMeetingLink = () => {
    navigator.clipboard.writeText(webinar.meetingLink);
    showNotification({
      title: "📋 Link Copied",
      message: "Meeting link copied to clipboard",
      type: "update",
      priority: "low",
      duration: 2000,
    });
  };

  return (
    <div className="bg-gray-700 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <LinkIcon className="h-4 w-4 text-blue-400 mr-2" />
          <span className="text-sm text-gray-300">Meeting Link:</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyMeetingLink}
          className="text-blue-400 hover:text-blue-300 text-xs"
        >
          Copy Link
        </Button>
      </div>
      <div className="text-xs text-blue-400 mt-1 font-mono break-all">
        {webinar.meetingLink}
      </div>
    </div>
  );
}
