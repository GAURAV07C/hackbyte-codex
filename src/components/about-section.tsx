// components/AboutSection.tsx
import { Crown, TrendingUp, Key, Target, Globe, Infinity, HelpCircle } from "lucide-react" // HelpCircle as fallback icon
import { siteData } from "@/data/site-data"

const iconMap = {
  crown: Crown,
  "trending-up": TrendingUp,
  key: Key,
  target: Target,
  globe: Globe,
  infinity: Infinity,
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 text-white mb-8">
            {siteData.about.title}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {siteData.about.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.about.features.map((feature, index) => {
            const IconComponent =
              iconMap[feature.icon as keyof typeof iconMap] || HelpCircle

            return (
              <div
                key={index}
                className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-slate-900" />
                </div>
                <div className="text-center mb-4">
                  <div className="inline-block px-4 py-2 bg-amber-900/30 text-amber-300 rounded-full text-sm font-semibold">
                    {feature.stats}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
