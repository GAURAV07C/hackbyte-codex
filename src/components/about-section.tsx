import {
  Crown,
  TrendingUp,
  Key,
  Target,
  Globe,
  Infinity,
  HelpCircle,
} from "lucide-react"; // HelpCircle as fallback icon
import { siteData } from "@/data/site-data";

const iconMap = {
  crown: Crown,
  "trending-up": TrendingUp,
  key: Key,
  target: Target,
  globe: Globe,
  infinity: Infinity,
};

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            {siteData.about.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
            {siteData.about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteData.about.features.map((feature, index) => {
            const IconComponent =
              iconMap[feature.icon as keyof typeof iconMap] || HelpCircle;

            return (
              <div
                key={index}
                className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-slate-900" />
                </div>
                <div className="text-center mb-3 sm:mb-4">
                  <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-900/30 text-amber-300 rounded-full text-xs sm:text-sm font-semibold">
                    {feature.stats}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
