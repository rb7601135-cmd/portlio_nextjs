"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/config";
import { smoothScrollTo } from "@/animations/gsapConfig";
import { MagneticButton } from "./MagneticButton";
import { Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["hero", "about", "work", "skills", "journey", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070709]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent py-5 sm:py-7 border-b border-white/[0.03]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 font-mono font-bold tracking-tight text-lg text-white hover:text-[#ccff00] transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_12px_#ccff00]" />
            <span className="text-xl tracking-tighter font-extrabold">
              {siteConfig.logo}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-black bg-[#ccff00] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.35)]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#ccff00] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </MagneticButton>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white hover:text-[#ccff00] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#070709]/98 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
            Navigation Index
          </span>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-3xl font-extrabold tracking-tight text-white hover:text-[#ccff00] transition-colors flex items-center justify-between py-2 border-b border-white/[0.05]"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-neutral-500">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00]">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
            <span>{siteConfig.availability.label}</span>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="w-full py-4 text-center rounded-xl bg-[#ccff00] text-black font-extrabold uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(204,255,0,0.3)]"
          >
            Start A Project · Let&apos;s Talk
          </a>
        </div>
      </div>
    </>
  );
};
