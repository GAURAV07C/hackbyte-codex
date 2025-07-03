/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Users,
  Bell,
  ExternalLink,
  CheckCircle,
  LinkIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Displays a notification to the user.
 * Replace this stub with your actual notification logic or import.
 */
function showNotification({
  title,
  message,
}: {
  title: string;
  message: string;
  type?: string;
  priority?: string;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}) {
  // Example: Replace with your notification system (toast, snackbar, etc.)
  alert(`${title}\n${message}`);
}

type Webinar = {
  id: string;
  title: string;
  description: string;
  category: string;
  level?: string;
  instructor: string;
  instructorTitle?: string;
  instructorImage?: string;
  attendees: number;
  maxAttendees: number;
  status: "live" | "upcoming";
  duration?: string;
  meetingLink: string;
  date?: string;
  time?: string;
  startDateTime: Date;
};

export function LiveWebinars() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // TODO: Replace with real data fetching logic or import these functions from your data layer
  function getLiveWebinars(): Webinar[] {
    return [
      {
        id: "1",
        title: "AI for Developers",
        description: "Learn how to integrate AI into your web apps.",
        category: "Tech",
        instructor: "Jane Doe",
        instructorTitle: "Senior AI Engineer",
        instructorImage: "/placeholder.svg",
        attendees: 150,
        maxAttendees: 500,
        status: "live",
        duration: "1h 30m",
        meetingLink: "https://meet.google.com/test-live",
        startDateTime: new Date(new Date().getTime() - 5 * 60 * 1000), // 5 mins ago
      },
    ];
  }

  function getUpcomingWebinars(): Webinar[] {
    return [
      {
        id: "2",
        title: "Next.js Best Practices",
        description: "Master advanced Next.js features for production apps.",
        category: "Frontend",
        instructor: "John Smith",
        instructorTitle: "Lead Frontend Engineer",
        instructorImage: "/placeholder.svg",
        attendees: 200,
        maxAttendees: 500,
        status: "upcoming",
        duration: "2h",
        meetingLink: "https://meet.google.com/test-upcoming",
        date: "2025-07-05",
        time: "5:00 PM",
        startDateTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour from now
      },
    ];
  }

  const liveWebinars = getLiveWebinars();
  const upcomingWebinars = getUpcomingWebinars();

  const handleJoinWebinar = (webinar: any) => {
    if (!isRegistered(webinar.id)) {
      showNotification({
        title: "❌ Registration Required",
        message: "You need to register first to join this webinar",
        type: "reminder",
        priority: "high",
      });
      return;
    }

    // Always allow joining for registered users
    window.open(webinar.meetingLink, "_blank", "noopener,noreferrer");

    if (webinar.status === "live") {
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

  const handleRegister = (webinar: any) => {
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

  const copyMeetingLink = (webinar: any) => {
    navigator.clipboard.writeText(webinar.meetingLink);
    showNotification({
      title: "📋 Link Copied",
      message: "Meeting link copied to clipboard",
      type: "update",
      priority: "low",
      duration: 2000,
    });
  };

  const getTimeUntilStart = (startDateTime: Date) => {
    const now = new Date();
    const diff = startDateTime.getTime() - now.getTime();

    if (diff <= 0) return "Live Now";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `Starts in ${days}d ${hours}h`;
    if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
    if (minutes > 0) return `Starts in ${minutes}m`;
    return "Starting soon";
  };

  const getJoinButtonText = (webinar: any) => {
    if (webinar.status === "live") {
      return "Join Live Now";
    } else {
      return "Join Meeting Room";
    }
  };

  const getJoinButtonStyle = (webinar: any) => {
    if (webinar.status === "live") {
      return "bg-red-600 hover:bg-red-700 text-white";
    } else {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Now Section */}
      {liveWebinars.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse" />
            Live Now ({liveWebinars.length})
          </h2>
          <div className="grid gap-6">
            {liveWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-r from-orange-900/20 to-gray-800 border-red-600/30 border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-red-600 text-white animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-1" />
                          LIVE NOW
                        </Badge>
                        <Badge className="bg-blue-600 text-white">
                          {webinar.category}
                        </Badge>
                        {isRegistered(webinar.id) && (
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Registered
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          {webinar.attendees}/{webinar.maxAttendees} attendees
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {webinar.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {webinar.description}
                        </p>

                        <div className="flex items-center mb-4">
                          <Avatar className="mr-3 w-12 h-12">
                            <AvatarImage
                              src={
                                webinar.instructorImage || "/placeholder.svg"
                              }
                              alt={webinar.instructor}
                            />
                            <AvatarFallback>
                              {webinar.instructor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-white">
                              {webinar.instructor}
                            </p>
                            <p className="text-sm text-gray-400">
                              {webinar.instructorTitle}
                            </p>
                          </div>
                        </div>

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

                        {/* Meeting Link Display for Registered Users */}
                        {isRegistered(webinar.id) && (
                          <div className="bg-gray-700 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <LinkIcon className="h-4 w-4 text-blue-400 mr-2" />
                                <span className="text-sm text-gray-300">
                                  Meeting Link:
                                </span>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyMeetingLink(webinar)}
                                className="text-blue-400 hover:text-blue-300 text-xs"
                              >
                                Copy Link
                              </Button>
                            </div>
                            <div className="text-xs text-blue-400 mt-1 font-mono break-all">
                              {webinar.meetingLink}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-center space-y-3">
                        {isRegistered(webinar.id) ? (
                          <Button
                            size="lg"
                            className={getJoinButtonStyle(webinar)}
                            onClick={() => handleJoinWebinar(webinar)}
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            {getJoinButtonText(webinar)}
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
                              onClick={() => handleRegister(webinar)}
                            >
                              Register Now
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Webinars */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Upcoming Webinars ({upcomingWebinars.length})
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingWebinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-600 text-white">
                        {webinar.category}
                      </Badge>
                      {isRegistered(webinar.id) && (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Registered
                        </Badge>
                      )}
                    </div>
                    <Badge className="bg-gray-600 text-white">
                      {webinar.level}
                    </Badge>
                  </div>

                  <div className="flex items-center mb-4">
                    <Avatar className="mr-3 w-10 h-10">
                      <AvatarImage
                        src={webinar.instructorImage || "/placeholder.svg"}
                        alt={webinar.instructor}
                      />
                      <AvatarFallback>
                        {webinar.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {webinar.instructor}
                      </p>
                      <p className="text-xs text-gray-400">
                        {webinar.instructorTitle}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {webinar.description}
                  </p>

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

                  {/* Meeting Link Display for Registered Users */}
                  {isRegistered(webinar.id) && (
                    <div className="bg-gray-700 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <LinkIcon className="h-4 w-4 text-blue-400 mr-2" />
                          <span className="text-sm text-gray-300">
                            Meeting Link:
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyMeetingLink(webinar)}
                          className="text-blue-400 hover:text-blue-300 text-xs"
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="text-xs text-blue-400 mt-1 font-mono break-all">
                        {webinar.meetingLink}
                      </div>
                    </div>
                  )}

                  {/* Countdown Timer */}
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

                  <div className="flex space-x-2">
                    {isRegistered(webinar.id) ? (
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleJoinWebinar(webinar)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Join Meeting Room
                      </Button>
                    ) : (
                      <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleRegister(webinar)}
                      >
                        Register Free
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      onClick={() =>
                        showNotification({
                          title: "⏰ Reminder Set",
                          message: `You'll be notified 10 minutes before ${webinar.title} starts`,
                          type: "reminder",
                          priority: "low",
                        })
                      }
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* No webinars message */}
      {liveWebinars.length === 0 && upcomingWebinars.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            No Webinars Available
          </h3>
          <p className="text-gray-400">
            Check back later for new webinar announcements
          </p>
        </div>
      )}
    </div>
  );
}
// Simple registration logic using localStorage for demo purposes
function registerForWebinar(id: any) {
  const key = "registeredWebinars";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  if (!existing.includes(id)) {
    existing.push(id);
    localStorage.setItem(key, JSON.stringify(existing));
  }
}

// Helper to check registration status
function isRegistered(id: any) {
  const key = "registeredWebinars";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  return existing.includes(id);
}
