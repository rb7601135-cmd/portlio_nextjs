"use client";

import React, { useEffect } from "react";
import { ScrollTrigger } from "@/animations/gsapConfig";

export const SmoothScrollManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // When window loads or user refreshes, ensure ScrollTrigger recalculates trigger positions
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    // Also refresh after brief timeouts for asynchronous images / font loading
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return <>{children}</>;
};
