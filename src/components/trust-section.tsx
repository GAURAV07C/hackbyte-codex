// components/TrustSection.tsx
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

interface TrustFactor {
  icon: IconName;
  title: string;
  metric: string;
  description: string;
}

export function TrustSection() {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Why Industry Leaders Choose Us
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            The world&apos;s most successful professionals trust SkillSphere for
            their continued growth and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-16 w-[80%] mx-auto">
          {siteData.trustFactors.map((factor, index) => {


            const iconKey = factor.icon as IconName;
            const IconComponent = iconMap[iconKey];

            if (!IconComponent) {
              console.warn(`Icon "${factor.icon}" not found in iconMap.`);
              return null; // or a fallback component if desired
            }

            return (
              <div
                key={index}
                className="bg-slate-900 p-8 rounded-2xl border border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-center"
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-slate-900" />
                </div>
                <div className="mb-4">
                  <div className="inline-block px-4 py-2 bg-amber-900/30 text-amber-300 rounded-full text-sm font-semibold">
                    {factor.metric}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {factor.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
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
