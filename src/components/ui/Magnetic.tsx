"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Magnetic({ 
  children, 
  strength = 0.25 
}: { 
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { 
        x: x * strength, 
        y: y * strength, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    };

    const handleLeave = () => {
      gsap.to(el, { 
        x: 0, 
        y: 0, 
        duration: 0.5, 
        ease: "elastic.out(1, 0.4)" 
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, { scope: ref });

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
