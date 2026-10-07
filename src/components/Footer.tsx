"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/config";
import { smoothScrollTo } from "@/animations/gsapConfig";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative py-16 bg-[#040507] border-t border-white/[0.06] text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between pb-12 border-b border-white/[0.05]">
          {/* Left: Brand & Motto */}
          <div className="md:col-span-5 flex flex-col items-start gap-2">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-base tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
              <span>{siteConfig.logo}</span>
            </div>
            <p className="text-neutral-500 text-xs tracking-wider uppercase">
              {siteConfig.footerText}
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="md:col-span-4 flex items-center gap-6 md:justify-center">
            <a
              href={`mailto:${siteConfig.socialLinks.email}`}
              className="flex items-center gap-2 hover:text-[#ccff00] transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#ccff00] transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#ccff00] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Right: Back To Top Button */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={() => smoothScrollTo("#hero")}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#ccff00] hover:text-[#ccff00] transition-all duration-200 text-neutral-300"
            >
              <span className="text-xs uppercase tracking-wider">Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-[#ccff00]" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-600 text-[11px]">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>BUILT WITH NEXT.JS · GSAP · THREE.JS · TAILWIND</span>
            <span>·</span>
            <span>LAHORE, PAKISTAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
