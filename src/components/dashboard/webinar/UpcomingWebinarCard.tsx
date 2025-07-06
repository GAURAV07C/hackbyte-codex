import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Webinar } from "@/types/webinar";
import { WebinarBadges } from "./WebinarBadges";
import { InstructorInfo } from "./InstructorInfo";
import { WebinarStats } from "./WebinarStats";
import { MeetingLink } from "./MeetingLink";
import { CountdownTimer } from "./CountdownTimer";
import { WebinarActions } from "./WebinarActions";
import { isRegistered } from "@/utils/registration";

interface UpcomingWebinarCardProps {
  webinar: Webinar;
  index: number;
}

export function UpcomingWebinarCard({
  webinar,
  index,
}: UpcomingWebinarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-gray-800 border-gray-700 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <WebinarBadges webinar={webinar} />
            <div className="text-right">
              {webinar.price && (
                <div className="text-sm text-green-400 font-semibold">
                  ₹{webinar.price}
                </div>
              )}
            </div>
          </div>

          <InstructorInfo webinar={webinar} size="sm" />

          <h3 className="text-lg font-bold text-white mb-2">{webinar.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {webinar.description}
          </p>

          <WebinarStats webinar={webinar} />

          {isRegistered(webinar.id) && <MeetingLink webinar={webinar} />}

          <CountdownTimer webinar={webinar} />
          <WebinarActions webinar={webinar} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
