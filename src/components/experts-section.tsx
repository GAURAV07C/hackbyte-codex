import { Linkedin, Award, MapPin, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteData } from "@/data/site-data";
import { motion } from "framer-motion";

export function ExpertsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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

  return (
    <section id="experts" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">
            Club of <span className="text-[#5ac8a0]">HackByCodex</span>{" "}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Meet Our Campus Lead — the driving force behind HackByCodex&lsquo;s vision
            and growth.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {siteData.experts.map((expert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gray-800 border border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 md:p-8 text-center flex flex-col h-full">
                  <div className="relative mb-4 md:mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Avatar className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto border-4 border-gray-600 shadow-lg">
                        <AvatarImage
                          src={expert.image || "/placeholder.svg"}
                          alt={expert.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {expert.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-3 rounded-full"
                      >
                        <Link href={expert.linkedin}>
                          <Linkedin className="h-3 md:h-4 w-3 md:w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                      {expert.name}
                    </h3>
                    <p className="text-base md:text-lg font-semibold text-gray-300 mb-1">
                      {expert.title}
                    </p>
                    <p className="text-blue-400 font-medium mb-3 md:mb-4 text-sm md:text-base">
                      {expert.specialization}
                    </p>

                    <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-400 mb-4">
                      <div className="flex items-center justify-center">
                        <Building className="h-3 md:h-4 w-3 md:w-4 mr-2" />
                        <span>{expert.company}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="h-3 md:h-4 w-3 md:w-4 mr-2" />
                        <span>{expert.location}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Award className="h-3 md:h-4 w-3 md:w-4 mr-2" />
                        <span>{expert.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 md:pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      {expert.achievements}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
