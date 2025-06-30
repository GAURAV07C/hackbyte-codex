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
};

export function TrustSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8">
            Why Industry Leaders Choose Us
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            The world's most successful professionals trust SkillSphere for
            their continued growth and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.trustFactors.map((factor, index) => {
            const IconComponent = iconMap[factor.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-center"
              >
                <div className="w-16 h-16 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-white dark:text-slate-900" />
                </div>
                <div className="mb-4">
                  <div className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm font-semibold">
                    {factor.metric}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {factor.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
