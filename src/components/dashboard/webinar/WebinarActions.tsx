import { Button } from "@/components/ui/button";
import { ExternalLink, Bell } from "lucide-react";
import { Webinar } from "@/types/webinar";
import { isRegistered, registerForWebinar } from "@/utils/registration";
import { showNotification } from "@/utils/notifications";

interface WebinarActionsProps {
  webinar: Webinar;
  isLive?: boolean;
}

export function WebinarActions({
  webinar,
  isLive = false,
}: WebinarActionsProps) {
  const handleJoinWebinar = () => {
    if (!isRegistered(webinar.id)) {
      showNotification({
        title: "❌ Registration Required",
        message: "You need to register first to join this webinar",
        type: "reminder",
        priority: "high",
      });
      return;
    }

    window.open(webinar.meetingLink, "_blank", "noopener,noreferrer");

    if (webinar.status === "LIVE") {
      showNotification({
        title: "🔴 Joining Live Session",
        message: `${webinar.title} is now opening in a new tab`,
        type: "live",
        priority: "high",
        duration: 3000,
      });
    } else {
      showNotification({
        title: "🔗 Opening Meeting Room",
        message: `${webinar.title} meeting room opened. You may need to wait for the host to start.`,
        type: "reminder",
        priority: "medium",
        duration: 5000,
      });
    }
  };

  const handleRegister = () => {
    registerForWebinar(webinar.id);
    showNotification({
      title: "✅ Registration Confirmed",
      message: `You're registered for ${webinar.title}. You'll receive a reminder 10 minutes before it starts.`,
      type: "reminder",
      priority: "medium",
      actionLabel: "View My Webinars",
      onAction: () => console.log("Navigate to my webinars"),
    });
  };

  const handleSetReminder = () => {
    showNotification({
      title: "⏰ Reminder Set",
      message: `You'll be notified 10 minutes before ${webinar.title} starts`,
      type: "reminder",
      priority: "low",
    });
  };

  const getJoinButtonText = () => {
    if (webinar.status === "LIVE") {
      return "Join Live Now";
    } else {
      return "Join Meeting Room";
    }
  };

  const getJoinButtonStyle = () => {
    if (webinar.status === "LIVE") {
      return "bg-red-600 hover:bg-red-700 text-white";
    } else {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  if (isLive) {
    return (
      <div className="flex flex-col justify-center space-y-3">
        {isRegistered(webinar.id) ? (
          <Button
            size="lg"
            className={getJoinButtonStyle()}
            onClick={handleJoinWebinar}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {getJoinButtonText()}
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-red-400 text-sm mb-2">
              Registration required to join
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              onClick={handleRegister}
            >
              Register Now
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      {isRegistered(webinar.id) ? (
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleJoinWebinar}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Join Meeting Room
        </Button>
      ) : (
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleRegister}
        >
          Register Free
        </Button>
      )}
      <Button
        variant="outline"
        size="icon"
        className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
        onClick={handleSetReminder}
      >
        <Bell className="h-4 w-4" />
      </Button>
    </div>
  );
}
