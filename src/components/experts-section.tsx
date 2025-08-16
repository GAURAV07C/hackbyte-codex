"use client";

import { useEffect, useState } from "react";
import {
  Linkedin,
  MapPin,
  Building,
  Gift,
  AlertCircle,
  Star,
  UserPlus,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { getAllCampusLead } from "@/data/user";
import Image from "next/image";

export function ExpertsSection() {
  interface campusLeadData {
    id: string;
    name: string;
    image: string;
    Collegeimage: string;
    linkedin: string;
    collegeLocation: string;
    college: string;
    designation: string;
    currentYear: string;
    Bio: string;
    lastMonthIncentive?: string;
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
              image: item.image ?? "",
              Collegeimage: item.Collegeimage ?? "/placeholder.svg",
              linkedin: item.linkedin ?? "",
              collegeLocation: item.collegeLocation ?? "",
              college: item.collegeName ?? "",
              designation: item.designation ?? "",
              currentYear: item.currentYear ?? "",
              Bio: item.Bio ?? "",
              lastMonthIncentive: item.lastMonthIncentive ?? "₹0",
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

  const totalItems = [...experts, ...experts];

  useEffect(() => {
    if (experts.length > 0) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      });
    }
  }, [controls, experts]);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-orange-100">
              <Loader2 className="h-6 w-6 animate-spin text-amber-400" />
              <span className="text-lg font-medium">
                Loading our amazing campus leads...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-red-400 bg-red-900/50 px-6 py-4 rounded-full border border-red-500/50">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      id="experts"
      className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f59e0b' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Building className="h-4 w-4" />
            Campus Leadership
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
              Campus Champions
            </span>
          </h2>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8">
            The passionate leaders driving innovation and growth across campuses
            nationwide
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-amber-400"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Apply for Campus Lead
            </Button>
          </motion.div>
        </div>

        <div
          className="relative w-[90%]"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() =>
            controls.start({
              x: ["0%", "-50%"],
              transition: {
                duration: 40,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            })
          }
        >
          <motion.div className="flex gap-8 w-max" animate={controls}>
            {totalItems.map((expert, index) => (
              <motion.div
                key={`${expert.id}-${index}`}
                className="min-w-[360px] max-w-[380px] flex-shrink-0"
                whileHover={{ scale: 1.03, y: -12 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="bg-slate-800/95 backdrop-blur-xl border-2 border-amber-500/50 rounded-3xl shadow-2xl hover:shadow-3xl hover:bg-slate-800 transition-all duration-500 h-full group overflow-hidden">
                  <CardContent className="p-8 text-center flex flex-col h-full relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/40 to-orange-500/40 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-500/30 to-red-500/30 rounded-full translate-y-8 -translate-x-8"></div>

                    <div className="relative mb-8">
                      <div className="relative">
                        <Avatar className="w-24 h-24 mx-auto border-4 border-amber-400 shadow-2xl ring-4 ring-orange-500/30">
                          <AvatarImage
                            src={expert.image || "/placeholder.svg"}
                            alt={expert.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-amber-600 to-orange-700 text-white">
                            {expert.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="absolute -bottom-3 -right-3">
                          <div className="w-14 h-14 bg-slate-700 rounded-full border-3 border-amber-400 shadow-xl flex items-center justify-center">
                            <Image
                              src={
                                expert.Collegeimage ||
                                "/placeholder.svg?height=32&width=32&query=college logo"
                              }
                              alt="college logo"
                              className="w-8 h-8 rounded-full object-cover"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                      </div>

                      {expert.linkedin && (
                        <motion.div
                          className="absolute -top-3 -right-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link href={expert.linkedin} target="_blank">
                            <Button
                              size="sm"
                              className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-xl border-2 border-orange-400"
                            >
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </Link>
                        </motion.div>
                      )}
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {expert.name}
                      </h3>
                      <p className="text-sm font-semibold text-slate-900 bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 rounded-full inline-block border-2 border-amber-500 shadow-lg">
                        <Star className="h-3 w-3 inline mr-1" />
                        {expert.designation}
                      </p>
                    </div>

                    <div className="space-y-4 text-sm text-orange-100 mb-6">
                      <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 px-5 py-3 rounded-2xl border-2 border-amber-500/50 shadow-lg">
                        <Building className="h-4 w-4 text-amber-400" />
                        <span className="font-semibold truncate text-white">
                          {expert.college}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-slate-700 to-slate-600 px-5 py-3 rounded-2xl border-2 border-orange-500/50 shadow-lg">
                        <MapPin className="h-4 w-4 text-orange-400" />
                        <span className="font-semibold text-white">
                          {expert.collegeLocation}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 bg-gradient-to-r from-emerald-400 to-green-400 px-5 py-3 rounded-2xl border-2 border-emerald-500 shadow-xl">
                        <Gift className="h-4 w-4 text-slate-800" />
                        <span>Last Month: {expert.lastMonthIncentive}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-amber-500/30">
                      <p className="text-sm text-orange-200 leading-relaxed line-clamp-3 font-medium">
                        {expert.Bio ||
                          "Passionate about driving innovation and building communities across campus."}
                      </p>
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
