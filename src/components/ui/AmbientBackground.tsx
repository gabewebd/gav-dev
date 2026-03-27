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
      x: () => window.innerWidth < 768 ? "20vw" : "40vw",
      y: () => window.innerWidth < 768 ? "20vh" : "40vh",
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
      x: () => window.innerWidth < 768 ? "-20vw" : "-40vw",
      y: () => window.innerWidth < 768 ? "15vh" : "30vh",
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
      <div className="absolute inset-0 overflow-visible mix-blend-screen opacity-40">
        {/* Deeper, larger teal/blue glow */}
        <div className="blob-wrapper-1 absolute top-[-20%] left-[-20%] w-[120vw] h-[120vw] max-w-[1400px] max-h-[1400px]">
          <div className="aurora-blob w-full h-full bg-brand-accent rounded-full blur-[180px] md:blur-[240px] opacity-40 md:opacity-25" />
        </div>
        {/* Large, soft deep blue/purple glow */}
        <div className="blob-wrapper-2 absolute bottom-[-20%] right-[-10%] w-[130vw] h-[130vw] max-w-[1500px] max-h-[1500px]">
          <div className="aurora-blob w-full h-full bg-[#3B82F6] rounded-full blur-[200px] md:blur-[280px] opacity-50 md:opacity-30" />
        </div>
      </div>

    </div>
  );
}