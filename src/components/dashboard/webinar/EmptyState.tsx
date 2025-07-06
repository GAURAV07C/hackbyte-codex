import { Calendar } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">
        No Webinars Available
      </h3>
      <p className="text-gray-400">
        Check back later for new webinar announcements
      </p>
    </div>
  );
}
