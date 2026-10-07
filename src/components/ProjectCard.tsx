"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { ExternalLink, AlertCircle } from "lucide-react";
import { GithubIcon } from "./Icons";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl bg-[#0b0d11] border border-white/[0.08] hover:border-[#ccff00]/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
    >
      {/* Browser Bar Style Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/70 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700 group-hover:bg-[#ccff00]/60 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
          <span className="text-[#ccff00] font-semibold">{project.number}</span>
          <span>/</span>
          <span className="truncate max-w-[150px] sm:max-w-[200px]">
            {project.category}
          </span>
        </div>
      </div>

      {/* Project Image Frame with Subtle Parallax / Zoom */}
      <div className="relative aspect-[16/10] w-full bg-neutral-950 overflow-hidden border-b border-white/[0.05]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-transparent to-transparent opacity-60" />

        {/* Demo Status Overlay Banner if Demo is not yet deployed */}
        {!project.hasLiveDemo && (
          <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-2 text-[11px] font-mono text-neutral-300">
            <AlertCircle className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
            <span className="truncate">{project.demoStatusNote}</span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-tight mb-3">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Technologies & Configurable Links */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col gap-5">
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-neutral-300 tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links Row */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-300 hover:text-[#ccff00] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.hasLiveDemo && project.liveDemoUrl ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-black bg-[#ccff00] px-3.5 py-1.5 rounded-full hover:bg-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            ) : (
              <span className="text-xs font-mono text-neutral-500 italic">
                (Demo URL configurable)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
