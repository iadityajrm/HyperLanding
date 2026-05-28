import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { VideoSection } from "@/components/VideoSection";
import { Pricing } from "@/components/Pricing";
import { Founder } from "@/components/Founder";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <BentoGrid />
        <VideoSection />
        <Pricing />
        <Founder />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
