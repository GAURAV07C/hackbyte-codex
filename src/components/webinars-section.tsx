"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Play } from "lucide-react";
import { webinarData } from "@/data/webinar-data";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { SignupDialog } from "./auth/signup-dialog";

export function WebinarsSection() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWebinarAction = (webinar: any) => {
    if (user) {
      if (webinar.status === "live") {
        alert(`Joining live webinar: ${webinar.topic}`);
      } else {
        alert(`Registering for: ${webinar.topic}`);
      }
    }
  };

  return (
    <section id="webinars" className="py-24 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">
            Live Webinar Sessions
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Join live sessions with industry experts and get your questions
            answered in real-time
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {webinarData.upcomingWebinars.map((webinar, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gray-900 border border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-4 md:p-6 flex flex-col h-full">
                  {webinar.status === "live" && (
                    <motion.div
                      className="flex items-center mb-3 md:mb-4"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      }}
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      <span className="text-red-400 text-xs font-semibold uppercase">
                        LIVE NOW
                      </span>
                    </motion.div>
                  )}

                  <Badge className="mb-3 md:mb-4 bg-blue-600 text-white text-xs w-fit">
                    {webinar.category}
                  </Badge>

                  <div className="flex items-center mb-4 md:mb-6">
                    <Avatar className="mr-3 w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarImage
                        src={webinar.speakerImage || "/placeholder.svg"}
                        alt={webinar.speaker}
                      />
                      <AvatarFallback>
                        {webinar.speaker
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white text-sm md:text-base">
                        {webinar.speaker}
                      </p>
                      <p className="text-xs md:text-sm text-gray-400">
                        Expert Speaker
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 flex-grow">
                    {webinar.topic}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 md:mb-6">
                    {webinar.description}
                  </p>

                  <div className="space-y-2 mb-4 md:mb-6">
                    <div className="flex items-center text-xs md:text-sm text-gray-400">
                      <Calendar className="h-3 md:h-4 w-3 md:w-4 mr-2 text-blue-400" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-gray-400">
                      <Clock className="h-3 md:h-4 w-3 md:w-4 mr-2 text-blue-400" />
                      <span>{webinar.time}</span>
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-gray-400">
                      <Users className="h-3 md:h-4 w-3 md:w-4 mr-2 text-blue-400" />
                      <span>{webinar.attendees} registered</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto"
                  >
                    {user ? (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base"
                        onClick={() => handleWebinarAction(webinar)}
                      >
                        {webinar.status === "live" ? (
                          <>
                            <Play className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                            Join Live
                          </>
                        ) : (
                          "Register Now"
                        )}
                      </Button>
                    ) : (
                      <SignupDialog>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base">
                          {webinar.status === "live" ? (
                            <>
                              <Play className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                              Join Live
                            </>
                          ) : (
                            "Register Now"
                          )}
                        </Button>
                      </SignupDialog>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
