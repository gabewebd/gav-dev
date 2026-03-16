"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Aurora Blobs Animation (Organic floating)
    const blobs = gsap.utils.toArray('.aurora-blob');
    blobs.forEach((blob: any) => {
      gsap.to(blob, {
        x: () => gsap.utils.random(-150, 150),
        y: () => gsap.utils.random(-150, 150),
        scale: () => gsap.utils.random(0.8, 1.3),
        rotation: () => gsap.utils.random(-30, 30),
        duration: () => gsap.utils.random(8, 15),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // 2. Blob Scroll-Triggered Movement
    // Acid Green: Drifts from Top-Left gently towards the Center/Bottom-Right
    gsap.to('.blob-wrapper-1', {
      x: "40vw", // Reduced from 90vw to keep it on screen
      y: "40vh", // Reduced from 110vh to keep it on screen
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      }
    });

    // Electric Blue: Drifts from Right gently towards the Bottom-Left
    gsap.to('.blob-wrapper-2', {
      x: "-40vw", // Reduced from -100vw to keep it on screen
      y: "30vh",  // Reduced from 100vh to keep it on screen
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* ── AURORA BLOBS ── */}
      <div className="absolute inset-0 overflow-visible mix-blend-screen opacity-50">
        <div className="blob-wrapper-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]">
          <div className="aurora-blob w-full h-full bg-[#BFFF00] rounded-full blur-[100px] md:blur-[140px] opacity-60 md:opacity-40" />
        </div>
        <div className="blob-wrapper-2 absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]">
          <div className="aurora-blob w-full h-full bg-[#2563EB] rounded-full blur-[120px] md:blur-[160px] opacity-50 md:opacity-30" />
        </div>
      </div>

      {/* ── STATIC NOISE GRAIN ── */}
      <div className="absolute inset-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
        <svg className="w-full h-full">
          <filter id="global-static-noise">
            <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#global-static-noise)" />
        </svg>
      </div>

      {/* ── NATIVE NOISE LAYER (from Projects Page) ── */}
      <div className="absolute inset-0 opacity-[0.16] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="global-native-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#global-native-noise)" />
        </svg>
      </div>
    </div>
  );
}