"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/data/config";
import { gsap, ScrollTrigger } from "@/animations/gsapConfig";
import { MagneticButton } from "./MagneticButton";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  FileText,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState<string>("");

  const sectionRef = useRef<HTMLElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);
  const infoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        infoBoxRef.current,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        formBoxRef.current,
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Your name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Your email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please include a message";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMessage(
          data.message ||
            "Your message was received! Bilal will follow up directly."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Failed to deliver message. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        "Network connection error. Please email directly at rb7601135@gmail.com"
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#070709] border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#ccff00] mb-12">
          <span>// 05</span>
          <span className="w-8 h-px bg-[#ccff00]/40" />
          <span>INITIATE CONTACT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Links & Headline */}
          <div ref={infoBoxRef} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6">
                {siteConfig.contactHeadline}
              </h2>

              <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-10">
                {siteConfig.contactCopy}
              </p>

              {/* Direct Links Tiles */}
              <div className="flex flex-col gap-4 mb-10">
                {/* Email Direct */}
                <a
                  href={`mailto:${siteConfig.socialLinks.email}`}
                  className="group p-4 rounded-xl bg-[#0c0e12] border border-white/[0.08] hover:border-[#ccff00]/40 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[#ccff00]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider block">
                        DIRECT EMAIL
                      </span>
                      <span className="text-sm font-medium text-white group-hover:text-[#ccff00] transition-colors">
                        {siteConfig.socialLinks.email}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                    Send ↗
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-[#0c0e12] border border-white/[0.08] hover:border-[#ccff00]/40 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[#ccff00]">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider block">
                        LINKEDIN PROFILE
                      </span>
                      <span className="text-sm font-medium text-white group-hover:text-[#ccff00] transition-colors">
                        linkedin.com/in/rana-bilal-4358213b4
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                    Connect ↗
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href={siteConfig.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-[#0c0e12] border border-white/[0.08] hover:border-[#ccff00]/40 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[#ccff00]">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider block">
                        GITHUB PROFILE
                      </span>
                      <span className="text-sm font-medium text-white group-hover:text-[#ccff00] transition-colors">
                        github.com/rb7601135-cmd
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                    Follow ↗
                  </span>
                </a>

                {/* Resume Document Link */}
                {siteConfig.socialLinks.resumeDoc && (
                  <a
                    href={siteConfig.socialLinks.resumeDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl bg-[#0c0e12] border border-white/[0.08] hover:border-[#ccff00]/40 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[#ccff00]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider block">
                          RESUME / CV
                        </span>
                        <span className="text-sm font-medium text-white group-hover:text-[#ccff00] transition-colors">
                          View Verified Resume (Google Doc)
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                      Open ↗
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] flex items-center gap-3 font-mono text-xs text-neutral-400">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
              <span>Response time: Typically within 24 business hours.</span>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div ref={formBoxRef} className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0e12] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[#ccff00]" />
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    Send A Direct Message
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">
                  ALL FIELDS REQUIRED
                </span>
              </div>

              {/* Status Feedback Banners */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/40 flex items-start gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#ccff00] font-mono uppercase mb-0.5">
                      Message Registered
                    </strong>
                    <span>{statusMessage}</span>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-3 text-xs sm:text-sm text-red-200">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-400 font-mono uppercase mb-0.5">
                      Delivery Notice
                    </strong>
                    <span>{statusMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Alex Henderson"
                    className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-500 focus:border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        : "border-white/10 focus:border-[#ccff00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 font-mono mt-1.5 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2"
                  >
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        : "border-white/10 focus:border-[#ccff00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-400 font-mono mt-1.5 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2"
                  >
                    Message / Project Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                    placeholder="Describe your idea, project scope, or opportunity..."
                    className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none transition-all resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        : "border-white/10 focus:border-[#ccff00] focus:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 font-mono mt-1.5 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 rounded-xl bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold tracking-wider uppercase text-xs sm:text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:shadow-[0_0_40px_rgba(204,255,0,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>SENDING INQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send className="w-4 h-4 text-black" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
