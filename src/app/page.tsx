"use client";
import { AboutSection } from "@/components/about-section";
import { CTASection } from "@/components/cta-section";
import { ExpertsSection } from "@/components/experts-section";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrustSection } from "@/components/trust-section";
import { WebinarsSection } from "@/components/webinars-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
      <WebinarsSection />
     
      <ExpertsSection />
      <TestimonialsSection />
      <TrustSection />
      <FAQSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
}
