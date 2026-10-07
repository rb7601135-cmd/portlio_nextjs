"use client";

import React, { useRef, useEffect } from "react";
import { siteConfig } from "@/data/config";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { gsap, ScrollTrigger } from "@/animations/gsapConfig";
import { ArrowUpRight } from "lucide-react";

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      // Reveal Heading
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

      // Staggered Project Cards Entrance
      const cards = cardsContainerRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#070709] border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-4">
              <span>// 02</span>
              <span className="w-8 h-px bg-[#ccff00]/40" />
              <span>PROJECT PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              {siteConfig.workHeadline}
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-neutral-400 font-light">
            A curated showcase of engineering experiments, full-stack applications, and interactive digital experiences.
          </p>
        </div>

        {/* 2-Column Responsive Project Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10"
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub Repository Explorer Note */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900/30 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Interested in experimental source code & ongoing commits?
            </h3>
            <p className="text-sm text-neutral-400">
              Explore Bilal&apos;s GitHub profile for open-source repositories, algorithms, and experiments.
            </p>
          </div>

          <a
            href={siteConfig.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white text-white hover:text-black font-mono text-xs uppercase tracking-wider border border-white/10 transition-all duration-300 shrink-0"
          >
            <span>VISIT GITHUB REPOSITORY</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
