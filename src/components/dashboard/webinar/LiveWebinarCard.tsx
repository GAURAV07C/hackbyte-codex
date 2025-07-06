import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Webinar } from "@/types/webinar";
import { WebinarBadges } from "./WebinarBadges";
import { InstructorInfo } from "./InstructorInfo";
import { WebinarStats } from "./WebinarStats";
import { MeetingLink } from "./MeetingLink";
import { WebinarActions } from "./WebinarActions";
import { isRegistered } from "@/utils/registration";

interface LiveWebinarCardProps {
  webinar: Webinar;
  index: number;
}

export function LiveWebinarCard({ webinar, index }: LiveWebinarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-gradient-to-r from-orange-900/20 to-gray-800 border-red-600/30 border-2">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <WebinarBadges webinar={webinar} isLive={true} />
            <div className="text-right">
              <div className="text-sm text-gray-400">
                {webinar.attendees}/{webinar.maxAttendees} attendees
              </div>
              {webinar.price && (
                <div className="text-sm text-green-400 font-semibold">
                  ₹{webinar.price}
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-2">
                {webinar.title}
              </h3>
              <p className="text-gray-300 mb-4">{webinar.description}</p>

              <InstructorInfo webinar={webinar} size="lg" />
              <WebinarStats webinar={webinar} isLive={true} />

              {isRegistered(webinar.id) && <MeetingLink webinar={webinar} />}
            </div>

            <WebinarActions webinar={webinar} isLive={true} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
