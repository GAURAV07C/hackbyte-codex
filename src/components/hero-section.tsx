"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight, Calendar, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gray-900"
    >
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Live Badge */}
          <motion.div variants={itemVariants}>
            <Badge className="mb-8 bg-red-600/20 text-red-400 border border-red-600/30 text-sm px-6 py-2 font-medium">
              <motion.div
                className="w-2 h-2 bg-red-500 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              LIVE WEBINAR SERIES
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight text-white"
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Master Skills
            </motion.span>
            <br />
            <motion.span
              className="text-gray-400"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Live Online
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4"
          >
            Join live interactive webinars with industry experts. Learn
            cutting-edge skills, ask questions in real-time, and network with
            professionals worldwide.
          </motion.p>

          {/* Next Webinar Info */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border border-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <Calendar className="w-4 md:w-5 h-4 md:h-5 text-blue-400 mr-2" />
                  <span className="text-blue-400 font-semibold text-sm md:text-base">
                    Next Live Session
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  AI & Machine Learning Mastery
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Jan 15, 7:00 PM EST</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>1,250 Registered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-20 px-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 font-semibold w-full sm:w-auto"
              >
                Join Live Now
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 font-semibold bg-transparent w-full sm:w-auto"
              >
                <Play className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Watch Preview
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-4"
          >
            {[
              { value: "12,000+", label: "Live Attendees" },
              { value: "50+", label: "Expert Sessions" },
              { value: "94%", label: "Satisfaction" },
              { value: "30+", label: "Countries" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-gray-800 border border-gray-700">
                  <CardContent className="text-center p-4 md:p-6">
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-400 text-xs md:text-sm font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
