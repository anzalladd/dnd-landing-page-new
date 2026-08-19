import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/WorkSection";
import { AboutSection } from "@/components/AboutSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-[#00302E] selection:text-[#F7F5ED]">
      <Navbar />
      <Hero />
      <WorkSection />
      <AboutSection />
      <CapabilitiesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
