import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from 'lucide-react'
import { siteData } from "@/data/site-data"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

  return (
    <section id="stories" className="py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8">Success Stories</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Real transformations from professionals who joined our live webinars and applied their learning
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {siteData.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gray-900 border border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex mb-3 md:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <Star className="h-4 md:h-5 w-4 md:w-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="text-gray-300 italic mb-4 md:mb-6 leading-relaxed text-sm md:text-base flex-grow">
                    &quot;{testimonial.content}&quot;
                  </blockquote>

                  <div className="flex items-center mb-3 md:mb-4">
                    <Avatar className="mr-3 md:mr-4 w-12 h-12 md:w-14 md:h-14">
                      <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-white text-sm md:text-base">{testimonial.name}</p>
                      <p className="text-xs md:text-sm text-gray-400">{testimonial.title}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="pt-3 md:pt-4 border-t border-gray-700">
                    <div className="text-center">
                      <Badge className="bg-green-600/20 text-green-400 border border-green-600/30 text-xs md:text-sm">
                        {testimonial.outcome}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
