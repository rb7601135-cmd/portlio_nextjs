import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register GSAP plugins on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
}

export { gsap, ScrollTrigger };

/**
 * Check if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Smooth scroll to element anchor without hijacking natural browser scroll physics
 */
export const smoothScrollTo = (targetId: string) => {
  if (typeof window === "undefined") return;
  const element = document.querySelector(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Refresh ScrollTrigger after DOM/images have rendered to ensure pixel-perfect trigger bounds
 */
export const refreshScrollTrigger = () => {
  if (typeof window !== "undefined") {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
};
