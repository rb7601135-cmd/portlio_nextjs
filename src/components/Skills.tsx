"use client";

import React, { useRef, useEffect } from "react";
import { siteConfig } from "@/data/config";
import { skillsData } from "@/data/skills";
import { gsap, ScrollTrigger } from "@/animations/gsapConfig";
import { Layers, Cuboid as Cube, Server, Database } from "lucide-react";

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

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

      const categories = gridRef.current?.children;
      if (categories) {
        gsap.fromTo(
          categories,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "frontend":
        return <Layers className="w-5 h-5 text-[#ccff00]" />;
      case "motion-3d":
        return <Cube className="w-5 h-5 text-[#ccff00]" />;
      case "backend":
        return <Server className="w-5 h-5 text-[#ccff00]" />;
      case "tools":
        return <Database className="w-5 h-5 text-[#ccff00]" />;
      default:
        return <Layers className="w-5 h-5 text-[#ccff00]" />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#070709] border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-4">
            <span>// 03</span>
            <span className="w-8 h-px bg-[#ccff00]/40" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6">
            {siteConfig.skillsHeadline}
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Technologies and frameworks utilized to design, build, and deploy reliable digital software. Organized transparently without arbitrary percentage bars.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category) => (
            <div
              key={category.categoryKey}
              className="group p-6 sm:p-8 rounded-2xl bg-[#0c0e12] border border-white/[0.07] hover:border-[#ccff00]/30 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                      {getCategoryIcon(category.categoryKey)}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-neutral-500">
                    {category.skills.length} TOOLS
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-light leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/pill inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900/90 border border-white/[0.08] hover:border-[#ccff00] hover:bg-neutral-800 transition-all duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/70 group-hover/pill:bg-[#ccff00] transition-colors" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-200 group-hover/pill:text-white">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="hidden sm:inline font-mono text-[10px] text-neutral-500">
                        · {skill.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
