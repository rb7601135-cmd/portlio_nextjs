import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScrollManager } from "@/components/SmoothScrollManager";

export default function Home() {
  return (
    <SmoothScrollManager>
      <div className="relative min-h-screen bg-[#070709] text-[#f5f5f0] flex flex-col selection:bg-[#ccff00] selection:text-black">
      {/* Sticky / Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 1: Hero with Interactive 3D Chrome Orb */}
        <Hero />

        {/* Section 2: About with Verified Profile Card & Two-Column Editorial Layout */}
        <About />

        {/* Section 3: Selected Work with Configurable Project Cards */}
        <Projects />

        {/* Section 4: Skills Matrix (Transparent, No Fake Percentages) */}
        <Skills />

        {/* Section 5: Education & Progression Timeline */}
        <Journey />

        {/* Section 6: Contact Section with Validated Form & Documented Integration */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </SmoothScrollManager>
  );
}
