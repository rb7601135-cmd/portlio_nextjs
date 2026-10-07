"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/config";
import { gsap, ScrollTrigger, smoothScrollTo } from "@/animations/gsapConfig";
import { MagneticButton } from "./MagneticButton";
import { CSSFallbackOrb } from "./Scene3D";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

// Lazy-load the interactive 3D scene without SSR to avoid hydration discrepancies
const DynamicScene3D = dynamic(
  () => import("./Scene3D").then((mod) => mod.Scene3D),
  {
    ssr: false,
    loading: () => <CSSFallbackOrb />,
  }
);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine3Ref = useRef<HTMLHeadingElement>(null);
  const supportingTextRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Check prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      // Staggered line-by-line cinematic entrance with explicit fromTo
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.1 }
      )
        .fromTo(
          [
            headlineLine1Ref.current,
            headlineLine2Ref.current,
            headlineLine3Ref.current,
          ],
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.12,
            duration: 1.1,
          },
          "-=0.6"
        )
        .fromTo(
          supportingTextRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          availabilityRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
    }, heroRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-[#070709]"
    >
      {/* Background Architectural Blueprint Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Editorial Typography & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Label */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono tracking-widest text-[#ccff00] uppercase mb-6 sm:mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>{siteConfig.eyebrow}</span>
            </div>

            {/* Headline - Split into 3 dramatic editorial lines */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-extrabold tracking-[-0.04em] leading-[0.98] text-white uppercase mb-8">
              <span className="block overflow-hidden py-1">
                <span ref={headlineLine1Ref} className="block will-change-transform">
                  I BUILD DIGITAL
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span
                  ref={headlineLine2Ref}
                  className="block will-change-transform text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f0fe] to-[#999999]"
                >
                  EXPERIENCES THAT
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span
                  ref={headlineLine3Ref}
                  className="block will-change-transform text-[#ccff00] underline decoration-white/20 underline-offset-8 decoration-wavy decoration-1"
                >
                  FEEL DIFFERENT.
                </span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              ref={supportingTextRef}
              className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed mb-8"
            >
              {siteConfig.supportingText}
            </p>

            {/* Editable Availability Status Label */}
            <div
              ref={availabilityRef}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-neutral-400 mb-9 px-3.5 py-2 rounded-lg bg-neutral-900/60 border border-white/[0.06]"
            >
              <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] animate-pulse" />
              <span>STATUS:</span>
              <span className="text-white font-medium">
                {siteConfig.availability.label}
              </span>
            </div>

            {/* CTA Action Buttons with Magnetic Pull */}
            <div
              ref={actionsRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto"
            >
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#work"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("#work");
                  }}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#ccff00] text-black font-extrabold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_30px_rgba(204,255,0,0.35)] hover:shadow-[0_0_45px_rgba(204,255,0,0.6)] hover:bg-[#d8ff33] transition-all duration-300"
                >
                  <span>EXPLORE MY WORK</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </MagneticButton>

              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("#contact");
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/15 hover:border-white/30 font-bold tracking-wider uppercase text-xs sm:text-sm transition-all duration-300"
                >
                  <span>LET&apos;S TALK</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ccff00]" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Large Interactive 3D Chrome Orb */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <DynamicScene3D />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="max-w-7xl mx-auto px-5 sm:px-8 w-full z-10 flex items-center justify-between text-neutral-500 font-mono text-xs uppercase tracking-widest pt-6 border-t border-white/[0.04]"
      >
        <span className="hidden sm:inline-block">BILAL.DEV / PORTFOLIO / 2026</span>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("#about");
          }}
          className="flex items-center gap-2 hover:text-[#ccff00] transition-colors mx-auto sm:mx-0 group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#ccff00]" />
        </a>
        <span className="hidden sm:inline-block">LAHORE, PK · UTC+5</span>
      </div>
    </section>
  );
};
