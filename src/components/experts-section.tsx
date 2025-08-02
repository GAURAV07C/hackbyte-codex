"use client";

import { useEffect, useState } from "react";
import { Linkedin, MapPin, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { getAllCampusLead } from "@/data/user";

export function ExpertsSection() {
  interface campusLeadData {
    id: string;
    name: string;
    image: string;
    linkedin: string;
    collegeLocation: string;
    college: string;
    designation: string;
    currentYear: string;
    Bio: string;
  }

  const [experts, setExperts] = useState<campusLeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    async function fetchCampusLead() {
      try {
        const campusLead = await getAllCampusLead();
        if (campusLead.sucess) {
          setExperts(
            campusLead.data.map((item) => ({
              id: item.id ?? "",
              name: item.name ?? "",
              image: item.image ?? "/placeholder.svg",
              linkedin: item.linkedin ?? "",
              collegeLocation: item.collegeLocation ?? "",
              college: item.collegeName ?? "",
              designation: item.designation ?? "",
              currentYear: item.currentYear ?? "",
              Bio: item.Bio ?? "",
            }))
          );
        } else {
          setError("No data found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch campus leads.");
      } finally {
        setLoading(false);
      }
    }

    fetchCampusLead();
  }, []);

  const totalItems = [...experts, ...experts]; // repeat to scroll seamlessly

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="experts" className="py-24 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Club of <span className="text-[#5ac8a0]">HackByCodex</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Meet Our Campus Leads — the driving force behind HackByCodex’s
            vision and growth.
          </p>
        </div>

        <div
          className="relative overflow-x-clip"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() =>
            controls.start({
              x: ["0%", "-50%"],
              transition: {
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              },
            })
          }
        >
          <motion.div className="flex gap-6 w-max" animate={controls}>
            {totalItems.map((expert, index) => (
              <motion.div
                key={`${expert.id}-${index}`}
                className="min-w-[300px] max-w-[320px] flex-shrink-0"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-gray-800 border border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center flex flex-col h-full">
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className="w-28 h-28 mx-auto border-4 border-gray-600 shadow-lg">
                          <AvatarImage src={expert.image} alt={expert.name} />
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
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                        >
                          <Link href={expert.linkedin} target="_blank">
                            <Linkedin className="h-4 w-4" />
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    <div className="flex-grow mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {expert.name}
                      </h3>
                      <p className="text-base font-semibold text-gray-300 mb-2">
                        {expert.designation}
                      </p>
                      <p className="text-blue-400 font-medium mb-4 text-sm">
                        {expert.college}
                      </p>
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center justify-center">
                          <Building className="h-4 w-4 mr-2" />
                          <span>{expert.college}</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{expert.collegeLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-400">{expert.Bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
