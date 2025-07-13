import {
  ShieldCheck,
  TrendingUp,
  Award,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import { siteData } from "@/data/site-data";

const iconMap = {
  "shield-check": ShieldCheck,
  "trending-up": TrendingUp,
  award: Award,
  globe: Globe,
  users: Users,
  zap: Zap,
} as const;

type IconName = keyof typeof iconMap;

export function TrustSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            Why Industry Leaders Choose Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            The world&apos;s most successful professionals trust SkillSphere for
            their continued growth and development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 max-w-6xl mx-auto">
          {siteData.trustFactors.map((factor, index) => {
            const iconKey = factor.icon as IconName;
            const IconComponent = iconMap[iconKey];

            if (!IconComponent) {
              console.warn(`Icon "${factor.icon}" not found in iconMap.`);
              return null;
            }

            return (
              <div
                key={index}
                className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-slate-900" />
                </div>
                <div className="mb-3 sm:mb-4">
                  <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-900/30 text-amber-300 rounded-full text-xs sm:text-sm font-semibold">
                    {factor.metric}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  {factor.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {factor.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
