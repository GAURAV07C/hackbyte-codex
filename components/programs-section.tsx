import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Star, CheckCircle } from "lucide-react";
import Image from "next/image";
import { siteData } from "@/data/site-data";

export function ProgramsSection() {
  return (
    <section id="programs" className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8">
            Executive Programs
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Intensive masterclasses led by industry titans who&apos;ve built
            billion-dollar companies and shaped entire industries
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {siteData.programs.map((program, index) => (
            <Card
              key={index}
              className="bg-white dark:bg-slate-900 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <CardContent className="p-0">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={program.instructorImage || "/placeholder.svg"}
                        alt={program.instructor}
                        width={80}
                        height={80}
                        className="rounded-full border-4 border-slate-100 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                          {program.instructor}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {program.instructorTitle}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-amber-500 fill-current" />
                          <span className="text-xs text-slate-500 ml-1">
                            Expert Instructor
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {program.level}
                      </div>
                      <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {program.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-6">
                    <Badge className="mb-3 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                      {program.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {program.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                      <span>{program.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-2 text-slate-500" />
                      <span>{program.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Users className="h-4 w-4 mr-2 text-slate-500" />
                      <span>{program.participants} enrolled</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-2 text-slate-500" />
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-3">
                      Key Learning Outcomes:
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {program.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-slate-600 dark:text-slate-400"
                        >
                          <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold py-3">
                    Reserve Your Seat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
