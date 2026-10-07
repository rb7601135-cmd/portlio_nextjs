"use client";

import React, { useRef, useEffect } from "react";
import { siteConfig } from "@/data/config";
import { journeyData } from "@/data/journey";
import { gsap, ScrollTrigger } from "@/animations/gsapConfig";
import { GraduationCap, Code, Rocket, CheckCircle2 } from "lucide-react";

export const Journey: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animated Timeline Line Drawing
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: itemsContainerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.5,
            },
          }
        );
      }

      // Staggered Milestones
      const items = itemsContainerRef.current?.querySelectorAll(".journey-item");
      if (items) {
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Education":
        return <GraduationCap className="w-4 h-4 text-[#ccff00]" />;
      case "Development":
        return <Code className="w-4 h-4 text-[#ccff00]" />;
      default:
        return <Rocket className="w-4 h-4 text-[#ccff00]" />;
    }
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#070709] border-t border-white/[0.04]"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="text-left mb-16 sm:mb-24">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-4">
            <span>// 04</span>
            <span className="w-8 h-px bg-[#ccff00]/40" />
            <span>PROGRESSION & LEARNING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6">
            {siteConfig.journeyHeadline}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            The ongoing trajectory of formal software engineering education, self-directed exploration, and hands-on system building.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={itemsContainerRef} className="relative pl-6 sm:pl-10">
          {/* Animated Connecting Vertical Line */}
          <div
            ref={timelineLineRef}
            className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#ccff00] via-[#ccff00]/40 to-transparent will-change-transform"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {journeyData.map((item, idx) => (
              <div
                key={item.id}
                className="journey-item relative flex flex-col gap-4"
              >
                {/* Node Milestone Dot on Line */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-4 h-4 rounded-full bg-[#070709] border-2 border-[#ccff00] flex items-center justify-center shadow-[0_0_12px_#ccff00]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                </div>

                {/* Milestone Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0e12] border border-white/[0.07] hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-md bg-white/[0.04] border border-white/10">
                        {getTypeIcon(item.type)}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#ccff00]">
                        {item.type}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-neutral-400">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                    {item.title}
                  </h3>

                  <div className="text-sm font-mono text-neutral-400 mb-4">
                    {item.institution}
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-4 border-t border-white/[0.05] flex flex-col gap-2">
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-400 font-light"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
