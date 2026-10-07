"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ChromeOrbMesh } from "./ChromeOrb";

export const Scene3D: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    // Check for WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (!mounted) {
    return <CSSFallbackOrb />;
  }

  // Fallback if WebGL unavailable or reduced motion requested
  if (!hasWebGL || prefersReduced) {
    return <CSSFallbackOrb />;
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[540px] flex items-center justify-center pointer-events-none select-none">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-radial from-[#ccff00]/10 via-transparent to-transparent opacity-40 blur-2xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full pointer-events-auto"
      >
        {/* Studio Lighting Rig */}
        <ambientLight intensity={0.9} color="#ffffff" />
        {/* Key Overhead Studio Light */}
        <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
        {/* Electric Lime Accent Rim Light */}
        <pointLight position={[-4, -2, 2]} intensity={4.5} color="#ccff00" distance={10} />
        {/* Cool Metallic Fill Light */}
        <pointLight position={[3, -4, -2]} intensity={2.5} color="#8ab4f8" distance={10} />
        {/* Subtle Bottom Uplight */}
        <directionalLight position={[0, -5, 2]} intensity={0.8} color="#9aa0a6" />

        <Suspense fallback={null}>
          <ChromeOrbMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};

/**
 * Lightweight, accessible CSS-only metallic fallback orb
 */
export const CSSFallbackOrb: React.FC = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[540px] flex items-center justify-center pointer-events-none select-none">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#161a20] via-[#3a4454] to-[#f0f4fa] shadow-[0_0_80px_rgba(204,255,0,0.15)] border border-white/20 overflow-hidden flex items-center justify-center animate-pulse">
        {/* Metallic Specular Highlight */}
        <div className="absolute top-6 left-10 w-24 h-16 rounded-full bg-white/40 blur-md transform -rotate-12" />
        {/* Electric Lime Accent Edge */}
        <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#ccff00]/25 blur-xl" />
        {/* Orbit Ring */}
        <div className="absolute inset-[-18px] rounded-full border border-[#ccff00]/40 transform rotate-45 pointer-events-none" />
      </div>
    </div>
  );
};
