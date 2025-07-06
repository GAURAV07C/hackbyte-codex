import { useState, useEffect } from "react";
import { Webinar } from "@/types/webinar";
import { getAllWebniars } from "@/actions/webniarAction";

export function useWebinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWebinars() {
      try {
        setLoading(true);
        setError(null);
        const result = await getAllWebniars();
        console.log("data", result);

        if (result && result.success && Array.isArray(result.webniars)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedWebinars: Webinar[] = result.webniars.map((item: any) => {
            // Create startDateTime from date and time
            const dateStr = item.date
              ? new Date(item.date).toISOString().split("T")[0]
              : "";
            const timeStr = item.time || "00:00";
            const startDateTime = new Date(`${dateStr}T${timeStr}:00`);

            return {
              id: item.id,
              title: item.title,
              instructor: item.instructor?.user?.name || "Unknown",
              instructorTitle:
                item.instructor?.specialization || item.instructor?.title || "",
              instructorImage:
                item.instructor?.user?.image ||
                `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
              date: item.date ? new Date(item.date).toLocaleDateString() : "",
              time: item.time || "",
              startDateTime,
              duration: item.duration ? `${item.duration}h` : "1h",
              description: item.description,
              category: item.category,
              level: item.level,
              maxAttendees: item.maxAttendees,
              attendees: Array.isArray(item.attendees)
                ? item.attendees.length
                : 0,
              price: item.price,
              status: item.status,
              meetingLink:
                item.meetingLink ||
                `https://meet.google.com/sample-link-${item.id}`,
              createdBy: item.creator?.name || "",
            };
          });
          setWebinars(mappedWebinars);
        }
      } catch (error) {
        console.error("Error fetching webinars:", error);
        setError("Failed to load webinars");
      } finally {
        setLoading(false);
      }
    }

    fetchWebinars();
  }, []);

  const liveWebinars = webinars.filter((w) => w.status === "LIVE");
  const upcomingWebinars = webinars.filter((w) => w.status === "UPCOMING");

  return {
    webinars,
    liveWebinars,
    upcomingWebinars,
    loading,
    error,
  };
}
