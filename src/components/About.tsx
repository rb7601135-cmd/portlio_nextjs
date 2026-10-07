"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/config";
import { gsap, ScrollTrigger, smoothScrollTo } from "@/animations/gsapConfig";
import { MagneticButton } from "./MagneticButton";
import { ArrowDown, Code2, Cpu, Globe2 } from "lucide-react";

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        imageCardRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const corePillars = [
    {
      icon: <Code2 className="w-5 h-5 text-[#ccff00]" />,
      title: "Full-Stack Web Engineering",
      desc: "Robust backends, database schema design, and modular Next.js application architectures.",
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[#ccff00]" />,
      title: "Interactive 3D & Creative Motion",
      desc: "Crafting fluid spatial experiences with Three.js, React Three Fiber, and ScrollTrigger.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#ccff00]" />,
      title: "Emerging Tech & AI Exploration",
      desc: "Building experimental prototypes with computer vision, gesture tracking, and modern APIs.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#070709] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Subtle structural grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Index Marker */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-12">
          <span>// 01</span>
          <span className="w-8 h-px bg-[#ccff00]/40" />
          <span>ABOUT THE DEVELOPER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Profile Card with verified photo */}
          <div ref={imageCardRef} className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative metallic border frame */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/20 via-[#ccff00]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity blur-[2px]" />

              <div className="relative rounded-2xl bg-[#0c0e12] border border-white/10 p-6 overflow-hidden">
                {/* Photo container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-neutral-900 border border-white/10">
                  <Image
                    src="/avatar.jpg"
                    alt={siteConfig.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12] via-transparent to-transparent opacity-70" />

                  {/* Corner Accent Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#ccff00]/30 font-mono text-[10px] text-[#ccff00] uppercase">
                    Verified
                  </div>
                </div>

                {/* Developer Profile Metadata */}
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-neutral-500">DEVELOPER</span>
                    <span className="text-white font-medium">{siteConfig.name}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-neutral-500">EDUCATION</span>
                    <span className="text-neutral-300">Minhaj University Lahore</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-neutral-500">DEGREE</span>
                    <span className="text-neutral-300">BS Software Engineering</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">LOCATION</span>
                    <span className="text-[#ccff00]">Lahore, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Copy & Core Pillars */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-8">
              {siteConfig.aboutHeadline}
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-light mb-10">
              {siteConfig.aboutBio}
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
              {corePillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#ccff00]/30 transition-colors flex flex-col justify-between"
                >
                  <div className="mb-4">{pillar.icon}</div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to Projects Section */}
            <MagneticButton>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#work");
                }}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-extrabold uppercase text-xs tracking-wider hover:bg-[#ccff00] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]"
              >
                <span>VIEW SELECTED PROJECTS</span>
                <ArrowDown className="w-4 h-4 text-black" />
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
