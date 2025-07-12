"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { siteData } from "@/data/site-data"
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">Frequently Asked Questions</h2>
            <p className="text-lg md:text-xl text-gray-300 px-4">Everything you need to know about our live webinar sessions</p>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {siteData.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border border-gray-700 overflow-hidden">
                  <Button
                    variant="ghost"
                    className="w-full px-6 md:px-8 py-4 md:py-6 text-left flex items-center justify-between hover:bg-gray-700 transition-colors h-auto"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-base md:text-lg font-semibold text-white pr-4 text-left">{item.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-blue-400 flex-shrink-0" />
                    </motion.div>
                  </Button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="px-6 md:px-8 pb-4 md:pb-6 pt-0">
                          <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.answer}</p>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
