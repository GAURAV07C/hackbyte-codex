"use client";
import { useState, useEffect } from "react";
import { LiveWebinarCard } from "./webinar/LiveWebinarCard";
import { UpcomingWebinarCard } from "./webinar/UpcomingWebinarCard";
import { LoadingState } from "./webinar/LoadingState";
import { EmptyState } from "./webinar/EmptyState";
import { useWebinars } from "@/hooks/useWebinars";

export function LiveWebinars() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState(new Date());
  const { liveWebinars, upcomingWebinars, loading, error } = useWebinars();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

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
              <LiveWebinarCard
                key={webinar.id}
                webinar={webinar}
                index={index}
              />
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
            <UpcomingWebinarCard
              key={webinar.id}
              webinar={webinar}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* No webinars message */}
      {liveWebinars.length === 0 && upcomingWebinars.length === 0 && (
        <EmptyState />
      )}
    </div>
  );
}
