import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, ArrowRight, Calendar, Users } from 'lucide-react'
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <section className="py-24 bg-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <p className="text-red-400 text-xs md:text-sm font-semibold uppercase mb-6 md:mb-8">NEXT LIVE SESSION STARTING SOON</p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-white">Ready to Join Live?</h2>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-gray-300 max-w-3xl mx-auto px-4">
              Don&apos;t miss our next live webinar session. Join thousands of professionals learning cutting-edge skills in
              real-time.
            </p>
          </motion.div>

          {/* Next Session Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="bg-gray-900 border border-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">AI & Machine Learning Mastery</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-300 mb-4 md:mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 md:w-5 h-4 md:h-5 mr-2 text-blue-400" />
                    <span className="text-sm md:text-base">January 15, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 md:w-5 h-4 md:h-5 mr-2 text-blue-400" />
                    <span className="text-sm md:text-base">1,250+ Registered</span>
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">7:00 PM EST</div>
                <p className="text-gray-400 text-sm md:text-base">Free to attend • Interactive Q&A • Certificate included</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 font-semibold text-white w-full sm:w-auto">
                Join Live Webinar
                <ArrowRight className="ml-2 h-5 md:h-6 w-5 md:w-6" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 font-semibold bg-transparent w-full sm:w-auto"
              >
                <Phone className="h-5 md:h-6 w-5 md:w-6 mr-2" />
                Get Reminder
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-3 gap-6 md:gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { value: "12,000+", label: "Live Attendees" },
              { value: "94%", label: "Satisfaction Rate" },
              { value: "50+", label: "Expert Sessions" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-gray-900 border border-gray-700">
                  <CardContent className="p-4 md:p-6">
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold text-blue-400 mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
