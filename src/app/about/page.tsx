"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Smile,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import HeroHeading from "@/components/ui/HeroHeading";
import PreviewLink from "@/components/ui/PreviewLink";
import Magnetic from "@/components/ui/Magnetic";
import { create } from "zustand";

interface CursorState {
  active: boolean;
  label: string;
  description: string;
  setActive: (active: boolean, label?: string, description?: string) => void;
}

const useCursorStore = create<CursorState>((set) => ({
  active: false,
  label: "",
  description: "",
  setActive: (active, label = "", description = "") => set({ active, label, description }),
}));

function CustomCursor() {
  const { active, label, description, setActive } = useCursorStore();
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastActiveRef = useRef(active);

  useEffect(() => {
    lastActiveRef.current = active;
  }, [active]);

  useGSAP(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.elementFromPoint(mousePosRef.current.x, mousePosRef.current.y);
      const isOver = !!el?.closest('[data-cursor-cert]');
      if (lastActiveRef.current !== isOver) {
        setActive(isOver, "View Certificate");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActive]);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.5,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [active]);

  useEffect(() => {
    setActive(false);
    return () => setActive(false);
  }, [setActive]);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:flex fixed top-0 left-0 z-[999] pointer-events-none flex-col items-center justify-center will-change-transform opacity-0 scale-50"
    >
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-brand-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-brand-dark/5">
        <span className="font-mori font-black text-[10px] md:text-xs uppercase tracking-[0.2em] text-brand-dark leading-none pt-0.5">
          {label}
        </span>
        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-brand-dark stroke-[2.5]" />
      </div>
    </div>
  );
}


import { FaFileAlt, FaGraduationCap } from "react-icons/fa";

import {
  SKILLS,
  FILTER_TABS,
  SOFT_SKILLS,
  INTERESTS,
  CERTIFICATIONS,
  type SkillCategory,
  EDUCATION,
  GOALS,
  EXPERIENCE,
} from "@/data/about";
import { PROJECTS_DATA } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── SOLID COMPUTER / DESKTOP MONITOR SVG ────────────────────────────────────
function ComputerSolidIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={className} fill="currentColor">
      <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V352H64V64H512z" />
    </svg>
  );
}

// ─── SMOOTH HEIGHT WRAPPER ────────────────────────────────────────────────────
function SmoothHeightWrapper({
  children,
  className,
  innerRef,
}: {
  children: React.ReactNode;
  className?: string;
  innerRef?: React.RefObject<HTMLDivElement>;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerMeasureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outerRef.current || !innerMeasureRef.current) return;
    outerRef.current.style.height = `${innerMeasureRef.current.offsetHeight}px`;
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerMeasureRef.current;
    if (!outer || !inner) return;

    const ro = new ResizeObserver(() => {
      gsap.to(outer, {
        height: inner.offsetHeight,
        duration: 0.5,
        ease: "power3.inOut",
      });
    });

    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerMeasureRef}>
        {children}
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const skillGridRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef2 = useRef<HTMLDivElement>(null);
  const timelineLineRef3 = useRef<HTMLDivElement>(null);
  const eduProgressDotRef = useRef<HTMLDivElement>(null);
  const expProgressDotRef = useRef<HTMLDivElement>(null);
  const goalProgressDotRef = useRef<HTMLDivElement>(null);
  const interestsSectionRef = useRef<HTMLElement>(null);

  const { setActive } = useCursorStore();

  const [activeFilter, setActiveFilter] = useState<SkillCategory>("frontend");
  const [activeInterest, setActiveInterest] = useState(0);
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const [activeCertIndex, setActiveCertIndex] = useState(0);

  const certs = CERTIFICATIONS.flatMap(group =>
    group.items.map(item => ({ ...item, issuer: group.issuer, year: group.year }))
  );

  // Grouped for the tray
  const issuers = CERTIFICATIONS.map((group) => ({
    name: group.issuer,
    year: group.year,
    firstIndex: certs.findIndex(c => c.issuer === group.issuer),
    image: group.items[0].image
  }));

  const nextCert = useCallback(() => {
    setActiveCertIndex((prev) => (prev + 1) % certs.length);
  }, [certs.length]);

  const prevCert = useCallback(() => {
    setActiveCertIndex((prev) => (prev - 1 + certs.length) % certs.length);
  }, [certs.length]);

  const filteredSkills = SKILLS.filter((s) => s.category === activeFilter);

  const handleFilterChange = useCallback((val: SkillCategory) => {
    if (!skillGridRef.current) { setActiveFilter(val); return; }
    gsap.to(Array.from(skillGridRef.current.children), {
      opacity: 0, y: 12, duration: 0.18, stagger: 0.03, ease: "power2.in",
      onComplete: () => setActiveFilter(val),
    });
  }, []);

  useEffect(() => {
    if (!skillGridRef.current) return;
    gsap.fromTo(
      Array.from(skillGridRef.current.children),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power3.out" }
    );
  }, [activeFilter]);


  useGSAP((ctx) => {
    const tl = gsap.timeline();
    tl.fromTo(".hero-reveal",
      { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12, ease: "power4.out" }
    );
    tl.fromTo(".profile-pic",
      { scale: 0.85, opacity: 0, filter: "blur(20px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.6, ease: "expo.out" }, "-=0.9"
    );
    tl.fromTo(".fade-in-element",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power2.out" }, "-=1"
    );
    tl.fromTo(".hero-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power4.inOut" }, "-=0.8");

    // ─── INTERESTS REVEAL (Simple Fade) ───
    ScrollTrigger.create({
      trigger: interestsSectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(".interest-card-wrapper", {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out"
        });
      },
      once: true
    });

    ScrollTrigger.create({
      trigger: ".skills-grid-wrapper",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".skill-row",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }
        );
      },
      once: true
    });

    gsap.fromTo(".filter-tab",
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".filter-row", start: "top 85%" }
      }
    );

    gsap.to('.hero-bg-icon', {
      y: "80vh",
      rotation: 25,
      scale: 1.4,
      ease: "none",
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom -80%", scrub: 1 }
    });

    gsap.utils.toArray(".bg-icon-parallax").forEach((icon: any) => {
      gsap.to(icon, {
        y: 160, rotation: 28, ease: "none",
        scrollTrigger: {
          trigger: icon.closest("section") || icon.parentElement,
          start: "top bottom", end: "bottom top", scrub: 1.5,
        },
      });
    });

    gsap.fromTo(".toggle-card",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".toggle-section", start: "top 80%" }
      }
    );

    gsap.fromTo(".cert-card-anim",
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".cert-list", start: "top 85%" }
      }
    );

    const eduCards = gsap.utils.toArray<HTMLElement>(".education-card");
    eduCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });

    const goalCards = gsap.utils.toArray<HTMLElement>(".goal-card");
    goalCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse" }
        }
      );
    });

    if (timelineLineRef2.current) {
      gsap.fromTo(timelineLineRef2.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".education-container",
            start: "top 45%",
            end: "bottom 45%",
            scrub: true
          }
        }
      );
    }

    if (expProgressDotRef.current) {
      gsap.fromTo(expProgressDotRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".history-container",
            start: "top 45%",
            end: "bottom 45%",
            scrub: true
          }
        }
      );
    }

    if (goalProgressDotRef.current) {
      gsap.fromTo(goalProgressDotRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".goals-container",
            start: "top 45%",
            end: "bottom 45%",
            scrub: true
          }
        }
      );
    }

    // ─── Solid Dot & Year Text Interaction ──────────────────────────
    const dotSelectors = ['.dot-interaction-edu', '.dot-interaction-exp', '.dot-interaction-goal'];
    dotSelectors.forEach(selector => {
      gsap.utils.toArray<HTMLElement>(selector).forEach(dot => {
        const container = dot.closest('.education-card, .group\\/goal');
        const yearText = container?.querySelector('.year-text');

        ScrollTrigger.create({
          trigger: dot,
          start: "top 45%",
          onEnter: () => {
            dot.classList.add('is-filled');
            if (selector === '.dot-interaction-goal') {
              yearText?.classList.add('text-[#bbf700]/[0.1]');
              yearText?.classList.remove('text-brand-white/[0.02]');
              const containerGoal = dot.closest('.group\\/goal');
              const divider = containerGoal?.querySelector('.goal-divider');
              const iconBox = containerGoal?.querySelector('.icon-box');
              const icon = iconBox?.querySelector('svg');
              divider?.classList.add('bg-[#bbf700]');
              divider?.classList.remove('bg-brand-white/10');
              iconBox?.classList.add('bg-[#bbf700]', 'border-[#bbf700]');
              iconBox?.classList.remove('bg-white/[0.02]', 'border-brand-white/10');
              icon?.classList.add('text-brand-dark');
              icon?.classList.remove('text-brand-white/30');
            } else {
              yearText?.classList.add('text-brand-accent');
              yearText?.classList.remove('text-brand-white/30');
            }
          },
          onLeaveBack: () => {
            dot.classList.remove('is-filled');
            if (selector === '.dot-interaction-goal') {
              yearText?.classList.remove('text-[#bbf700]/[0.1]');
              yearText?.classList.add('text-brand-white/[0.02]');
              const containerGoal = dot.closest('.group\\/goal');
              const divider = containerGoal?.querySelector('.goal-divider');
              const iconBox = containerGoal?.querySelector('.icon-box');
              const icon = iconBox?.querySelector('svg');
              divider?.classList.remove('bg-[#bbf700]');
              divider?.classList.add('bg-brand-white/10');
              iconBox?.classList.remove('bg-[#bbf700]', 'border-[#bbf700]');
              iconBox?.classList.add('bg-white/[0.02]', 'border-brand-white/10');
              icon?.classList.remove('text-brand-dark');
              icon?.classList.add('text-brand-white/30');
            } else {
              yearText?.classList.remove('text-brand-accent');
              yearText?.classList.add('text-brand-white/30');
            }
          },
        });
      });
    });

    // ─── Dynamic Background Section (Education & Experience) ────────────────
    const bgSections = gsap.utils.toArray<HTMLElement>(".background-content-section");
    bgSections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActiveBackgroundIndex(i);
        }
      });
    });


    gsap.set(".interest-card-wrapper", { scale: 0, y: 50, opacity: 0 });

    // ─── Soft skills: stagger rows in from left on scroll ────────────────────
    gsap.fromTo(".soft-skill-row",
      { opacity: 0, x: -28 },
      {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".soft-skills-list", start: "top 82%" },
      }
    );

    // ─── Global Style Injection ───────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
      .dot-marker.is-filled {
        background-color: #bbf700 !important;
        border-color: #bbf700 !important;
        box-shadow: 0 0 20px rgba(187,247,0,0.5) !important;
      }
      .dot-marker.is-filled .dot-inner {
        background-color: #bbf700 !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // Add cleanup to GSAP context
    ctx.add(() => {
      return () => {
        if (style.parentNode) style.parentNode.removeChild(style);
      };
    });

  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="relative overflow-x-clip pb-32 transition-colors duration-500"
    >
      <CustomCursor />

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        {/* ─── HERO ── */}
        <section className="hero-section pt-28 md:pt-40 mb-20 sm:mb-32 md:mb-48 relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-10 sm:gap-12 lg:gap-20">

            {/* Left Column: Profile Photo & Stats */}
            <div className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0 shrink-0 flex flex-col items-start">
              <div className="relative w-full max-h-[480px] sm:max-h-[500px] lg:max-h-none rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 bg-brand-white/5 profile-pic">
                <Image src="/assets/hero-photo.png" alt="Gabrielle Ainshley Velasquez - Full-Stack Developer Profile Portrait" width={800} height={1000} className="hidden lg:block w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out" priority sizes="480px" />
                <Image src="/assets/mobile-photo.png" alt="Gabrielle Ainshley Velasquez - Full-Stack Developer Profile Portrait" width={800} height={1000} className="block lg:hidden w-full h-auto object-cover grayscale-0 transition-all duration-1000 ease-out" priority sizes="(max-width: 640px) 240px, (max-width: 1024px) 380px" />
              </div>

              <div className="mt-8 sm:mt-10 flex w-full gap-8 sm:gap-12 fade-in-element">
                <div className="flex flex-col gap-1">
                  <span className="font-mori font-bold text-3xl sm:text-4xl text-brand-white tracking-tighter">3+</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted">Years Learning</span>
                </div>
                <div className="w-[1px] h-10 bg-brand-white/10 mt-2" />
                <div className="flex flex-col gap-1">
                  <span className="font-mori font-bold text-3xl sm:text-4xl text-brand-white tracking-tighter">{PROJECTS_DATA.length}</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted">Projects Built</span>
                </div>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="flex-1 flex flex-col relative z-10 w-full text-left">
              <SectionTag className="hero-reveal mb-4 sm:mb-6">Based in the Philippines</SectionTag>

              <HeroHeading>
                <div className="overflow-hidden py-1">
                  <span className="hero-reveal block mb-2">Hi, I&apos;m</span>
                </div>
                <div className="hero-reveal flex items-center justify-start gap-3 sm:gap-5 overflow-hidden py-2 -my-2">
                  <span className="text-brand-white">Gabrielle</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-brand-accent rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.25rem] shrink-0">
                    <Smile className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                  </span>
                </div>
              </HeroHeading>

              {/* Clean, Structured Biography Section */}
              <div className="flex flex-col gap-8 w-full max-w-3xl fade-in-element mt-6">
                <h3 className="text-xl md:text-2xl font-light text-body leading-relaxed">
                  A full-stack developer based in the <span className="text-brand-accent font-medium">Philippines 🇵🇭</span>, transforming deep-rooted curiosity into structurally robust digital experiences.
                </h3>

                <p className="text-sm md:text-base text-body leading-relaxed">
                  Currently in my third year studying <span className="text-brand-white font-medium">BS Information Technology</span> at Holy Angel University. My early foundation in web design and page builders shaped my eye for layout, which I now apply directly to modern full-stack engineering.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-3 transition-colors hover:bg-white/[0.04]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">Expertise</span>
                    <p className="text-sm text-body leading-relaxed">
                      Building modern web applications using <span className="text-brand-white font-medium">React, Next.js, PHP, and Node.js</span> for both frontend and backend systems.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-3 transition-colors hover:bg-white/[0.04]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Mission</span>
                    <p className="text-sm text-body leading-relaxed">
                      Approaching each project with clarity and precision to deliver efficient, maintainable solutions built for long-term impact.
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap items-center justify-start gap-3 sm:gap-4 fade-in-element">
                <Button href="/assets/gav-resume.pdf" target="_blank" rel="noopener noreferrer" icon={Download} iconPosition="left" className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm">
                  View Resume
                </Button>
                <Button href="/contact" variant="secondary" icon={ArrowRight} className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm">
                  Contact Me
                </Button>
              </div>
            </div>

          </div>
          <div className="hero-divider w-full h-[1px] bg-brand-white/10 mt-16 md:mt-24 origin-left" />
        </section>
      </div>

      {/* ─── BACKGROUND (EDUCATION & EXPERIENCE) ── */}
      <section className="relative py-16 sm:py-24 md:py-40 bg-transparent border-y border-brand-white/5 exhibition-section">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-32">
          {/* Sticky Reveal Sidebar */}
          <div className="hidden lg:flex lg:w-4/12 sticky top-40 h-[calc(100vh-15rem)] flex-col justify-center z-30 pointer-events-none">
            <div className="flex flex-col gap-6 relative pl-10 border-l border-brand-white/10">
              <div className="absolute left-10 -top-8 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Background</div>

              <div className={`nav-project-item relative py-2 cursor-default transition-all duration-500 will-change-transform ${activeBackgroundIndex === 0 ? 'opacity-100 translate-x-4' : 'opacity-30 translate-x-0 scale-[0.85] origin-left'}`}>
                <div className={`nav-dot absolute left-[-44px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent transition-all duration-500 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.8)] ${activeBackgroundIndex === 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                <div className="font-mori font-bold text-5xl xl:text-6xl text-brand-white">Academic</div>
              </div>
              <div className={`nav-project-item relative py-2 cursor-default transition-all duration-500 will-change-transform ${activeBackgroundIndex === 1 ? 'opacity-100 translate-x-4' : 'opacity-30 translate-x-0 scale-[0.85] origin-left'}`}>
                <div className={`nav-dot absolute left-[-44px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent transition-all duration-500 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.8)] ${activeBackgroundIndex === 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                <div className="font-mori font-bold text-5xl xl:text-6xl text-brand-white">Professional</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            {/* Education Content */}
            <div className="background-content-section w-full">
              <div className="lg:hidden flex items-center gap-4 mb-8">
                <SectionTitle className="!mb-0 text-3xl">Academic Background</SectionTitle>
              </div>

              <div className="relative ml-2 md:ml-4 education-container">
                {/* Wavelength Timeline Track */}
                <div className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-white/5" />

                {/* Filling Progress Line */}
                <div
                  ref={timelineLineRef2}
                  className="absolute top-0 left-0 w-[2px] md:w-[3px] bg-[#bbf700] origin-top z-10"
                  style={{ height: '0%' }} // Controlled by GSAP
                />

                <div className="relative w-full space-y-24 md:space-y-40 pt-6">
                  {EDUCATION.map((edu, i) => {
                    return (
                      <div
                        key={i}
                        className="education-card relative w-full pl-6 sm:pl-10 md:pl-24 group/edu"
                      >
                        {/* Wavelength Dot */}
                        <div className="absolute -left-[14px] md:-left-[18px] top-4 z-20">
                          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-brand-dark border-2 border-brand-white/10 flex items-center justify-center transition-all duration-700 dot-marker group-hover/edu:border-[#bbf700] group-hover/edu:bg-[#bbf700]/5 dot-interaction-edu">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-white/20 transition-all duration-500 group-hover/edu:bg-[#bbf700] dot-inner" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:gap-4 mb-6">
                          <span className="font-mono text-xs md:text-sm font-medium text-muted transition-colors duration-500 group-hover/edu:text-[#bbf700] year-text">{edu.period}</span>
                          <h3 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-brand-white leading-[1] transition-colors duration-500">{edu.degree}</h3>
                          <div className="flex items-center gap-3 text-sm md:text-base font-medium text-muted">
                            <span className="w-5 h-[1px] bg-brand-white/20" />
                            {edu.school}
                          </div>
                        </div>
                        <ul className="flex flex-col gap-4 max-w-2xl">
                          {edu.points.map((point, j) => (
                            <li key={j} className="flex items-start gap-4 text-sm md:text-base text-body font-light group-hover/edu:text-brand-white transition-colors">
                              <span className="text-brand-white/20 font-mono text-xs mt-1.5">0{j + 1}</span>
                              <p>{point}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Experience Content */}
            <div className="background-content-section w-full">
              <div className="lg:hidden flex items-center gap-4 mb-8">
                <SectionTitle className="!mb-0 text-3xl">Professional Experience</SectionTitle>
              </div>

              <div className="relative ml-2 md:ml-4 pb-8 md:pb-12 history-container">
                {/* Wavelength Timeline Track */}
                <div className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-white/5" />

                {/* Filling Progress Line */}
                <div
                  ref={expProgressDotRef}
                  className="absolute top-0 left-0 w-[2px] md:w-[3px] bg-[#bbf700] origin-top z-10"
                  style={{ height: '0%' }}
                />

                <div className="relative w-full space-y-24 md:space-y-40 pt-6">
                  {EXPERIENCE.map((exp, i) => {
                    return (
                      <div
                        key={i}
                        className="education-card relative w-full pl-6 sm:pl-10 md:pl-24 group/exp"
                      >
                        {/* Wavelength Dot */}
                        <div className="absolute -left-[14px] md:-left-[18px] top-4 z-20">
                          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-brand-dark border-2 border-brand-white/10 flex items-center justify-center transition-all duration-700 dot-marker group-hover/exp:border-[#bbf700] group-hover/exp:bg-[#bbf700]/5 dot-interaction-exp">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-white/20 transition-all duration-500 group-hover/exp:bg-[#bbf700] dot-inner" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 md:gap-4 mb-6">
                          <span className="font-mono text-xs md:text-sm font-medium text-brand-white/30 transition-colors duration-500 group-hover/exp:text-[#bbf700] year-text">{exp.period}</span>
                          <h3 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-brand-white leading-[1] transition-colors duration-500">{exp.role}</h3>
                          <div className="flex items-center gap-3 text-sm md:text-base font-medium text-brand-white/40">
                            <span className="w-5 h-[1px] bg-brand-white/20" />
                            {exp.company} / {exp.location}
                          </div>
                        </div>
                        <ul className="flex flex-col gap-4 max-w-2xl">
                          {exp.points.map((point, j) => (
                            <li key={j} className="flex items-start gap-4 text-sm md:text-base text-brand-white/60 font-light group-hover/exp:text-brand-white/80 transition-colors">
                              <span className="text-brand-white/20 font-mono text-xs mt-1.5">•</span>
                              <p>{point}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE STACK + SOFT SKILLS (MERGED) ── */}
      <section className="relative py-20 sm:py-24 md:py-32 border-b border-brand-ink/5 dark:border-brand-white/5 bg-transparent">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

          <div className="mb-10 sm:mb-14 md:mb-16 flex flex-col md:flex-row md:items-end gap-3 md:gap-16">
            <div className="flex flex-col gap-4">
              <SectionTag>Technical Skills</SectionTag>
              <SectionTitle>Core <br />Stack</SectionTitle>
            </div>
            <p className="text-sm md:text-base text-muted font-light max-w-xs pb-1">
              Primary frameworks and systems used in my development cycles.
            </p>
          </div>

          <div className="flex flex-nowrap overflow-x-auto hide-scrollbar items-center gap-3 mb-10 sm:mb-12 relative z-30 pb-4 md:pb-0 py-8 px-2 -mx-2">
            {FILTER_TABS.map((tab, idx) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleFilterChange(tab.value)}
                  className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-500 font-mori font-bold text-[11px] sm:text-sm tracking-tight ${isActive
                    ? "bg-[#bbf700] text-brand-dark border-[#bbf700]"
                    : "bg-brand-white/[0.03] text-brand-white/40 border-brand-white/10 hover:border-brand-white/30 hover:text-brand-white"
                    }`}
                >
                  <span className={`mr-2 opacity-50 tabular-nums`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          <SmoothHeightWrapper className="skills-grid-wrapper">
            <div
              ref={skillGridRef}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 pb-1"
            >
              {filteredSkills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`${skill.name}-${i}`}
                    className="skill-row group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-xl border border-brand-white/10 shadow-none bg-white/[0.02] backdrop-blur-sm hover:border-brand-white/20 hover:bg-brand-accent/[0.05] transition-all duration-300 cursor-default relative overflow-hidden"
                  >
                    {skill.learning && (
                      <span className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-brand-accent text-brand-dark leading-none z-10">
                        Soon
                      </span>
                    )}
                    <Icon className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 text-brand-white/60 group-hover:text-brand-accent transition-colors duration-300" />
                    <div className="flex flex-col items-center gap-1 w-full">
                      <span className="font-mori font-semibold tracking-tight text-xs sm:text-sm text-brand-white text-center leading-tight">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SmoothHeightWrapper>
        </div>
      </section>

      {/* ─── SOFT SKILLS ── */}
      <section className="relative py-24 md:py-40 bg-transparent border-b border-brand-ink/5 dark:border-brand-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
            <SectionTag className="mb-4 sm:mb-6 justify-center">The Human Element</SectionTag>
            <SectionTitle>Soft Skills</SectionTitle>
            <p className="mt-6 text-base md:text-lg text-brand-white/60 font-light max-w-xl">
              The interpersonal traits that shape how I work and collaborate.
            </p>
          </div>

          <ul className="soft-skills-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SOFT_SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <li
                  key={i}
                  className="soft-skill-row group flex flex-col gap-5 p-6 md:p-8 rounded-[2rem] border border-brand-white/10 bg-brand-white/[0.02] hover:border-brand-white/20 hover:bg-brand-accent/[0.05] transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-white/[0.03] flex items-center justify-center group-hover:bg-brand-accent/[0.1] transition-all duration-300">
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 text-brand-white/50 group-hover:text-brand-accent transition-colors duration-300"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold tabular-nums text-brand-white/20 transition-colors duration-300">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="font-mori font-bold text-xl md:text-2xl tracking-tight text-brand-white transition-colors duration-300">
                      {skill.title}
                    </h4>
                    <p className="text-sm md:text-base text-brand-white/60 font-light leading-relaxed transition-colors duration-300">
                      {skill.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─── INTERESTS (INTERACTIVE FANNED DECK) ── */}
      <section ref={interestsSectionRef} className="relative py-24 md:py-40 bg-transparent border-b border-brand-ink/5 dark:border-brand-white/5 overflow-hidden">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

          <div className="mb-16 text-center flex flex-col items-center">
            <SectionTag className="mb-4 sm:mb-6 justify-center">Beyond The Code</SectionTag>
            <SectionTitle>Personal Interests</SectionTitle>
          </div>

          <div className="w-full flex flex-col items-center">
            <div
              className="interests-fan flex justify-center items-center h-[280px] sm:h-[400px] lg:h-[450px] w-full relative -ml-12 sm:ml-0"
              style={{ perspective: "1200px" }}
            >
              {INTERESTS.map((item, idx) => {
                const isActive = activeInterest === idx;
                const offset = idx - (INTERESTS.length - 1) / 2;

                return (
                  <div
                    key={idx}
                    className="interest-card-wrapper relative shrink-0 -ml-16 sm:-ml-24 md:-ml-32 lg:-ml-40 first:ml-0"
                    style={{
                      transformOrigin: "center bottom",
                      zIndex: isActive ? 50 : 10 + idx
                    }}
                  >
                    <motion.div
                      onClick={() => setActiveInterest(idx)}
                      onMouseEnter={() => {
                        if (window.innerWidth >= 1024) {
                          setActiveInterest(idx);
                        }
                      }}
                      className="cursor-pointer"
                      animate={{
                        rotateZ: isActive ? 0 : offset * 6,
                        y: isActive ? -20 : Math.abs(offset) * 15,
                        scale: isActive ? 1.1 : 0.95,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    >
                      <div className={`w-[130px] h-[180px] sm:w-[240px] sm:h-[320px] lg:w-[300px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative transition-shadow duration-300 ${isActive ? "ring-2 ring-brand-accent shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          quality={95}
                          sizes="(max-width: 640px) 320px, (max-width: 1024px) 480px, 600px"
                          className="object-cover"
                        />
                        <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-50"}`} />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-12 h-[180px] sm:h-[140px] w-full max-w-2xl flex items-start justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInterest}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center text-center gap-3 sm:gap-4 px-4"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-white/10 flex items-center justify-center border border-brand-white/20">
                    {(() => {
                      const ActiveIcon = INTERESTS[activeInterest].icon;
                      return <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" strokeWidth={2} />;
                    })()}
                  </div>
                  <h3 className="font-mori font-bold text-2xl sm:text-3xl text-brand-white">
                    {INTERESTS[activeInterest].title}
                  </h3>
                  <p className="text-sm sm:text-base text-brand-white/70 font-light leading-relaxed">
                    {INTERESTS[activeInterest].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAREER GOALS ── */}
      <section className="relative py-24 sm:py-32 md:py-48 border-b border-brand-ink/5 dark:border-brand-white/5 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-32">

          <div className="w-full lg:w-4/12 lg:sticky lg:top-40 h-fit">
            <SectionTag className="mb-6">Objectives</SectionTag>
            <SectionTitle className="mb-8">My Career <br />Goals</SectionTitle>
            <p className="text-sm md:text-base lg:text-lg text-brand-white/60 font-light leading-relaxed max-w-xs">
              My mission is to build digital products that combine technical depth with human-centered design.
            </p>
          </div>

          <div className="w-full lg:w-8/12 lg:pt-6">
            <div className="relative ml-2 md:ml-4 pb-8 md:pb-12 goals-container">
              {/* Wavelength Timeline Track */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-white/5" />

              {/* Filling Progress Line */}
              <div
                ref={goalProgressDotRef}
                className="absolute top-0 left-0 w-[2px] md:w-[3px] bg-[#bbf700] origin-top z-10"
                style={{ height: '0%' }}
              />

              <div className="relative w-full space-y-32 md:space-y-48 pt-12">
                {GOALS.map((goal, i) => {
                  return (
                    <div
                      key={i}
                      className="group/goal relative w-full pl-6 sm:pl-10 md:pl-24"
                    >
                      {/* Wavelength Dot */}
                      <div className="absolute -left-[14px] md:-left-[18px] top-4 z-20">
                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-brand-dark border-2 border-brand-white/10 flex items-center justify-center transition-all duration-700 dot-marker group-hover/goal:border-[#bbf700] group-hover/goal:bg-[#bbf700]/5 dot-interaction-goal">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-white/20 transition-all duration-500 group-hover/goal:bg-[#bbf700] dot-inner" />
                        </div>
                      </div>

                      <div className="relative z-10 w-full">
                        <span className="absolute left-8 sm:left-12 -top-6 sm:-top-10 text-[4rem] sm:text-[6rem] md:text-[8rem] font-mori font-black text-brand-white/[0.02] select-none pointer-events-none group-hover/goal:text-[#bbf700]/[0.1] transition-colors duration-700 leading-none year-text">
                          {goal.num}
                        </span>
                        <div className="flex items-center gap-6 mb-8">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] border border-brand-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm transition-all duration-500 shrink-0 group-hover/goal:bg-[#bbf700] group-hover/goal:border-[#bbf700] icon-box">
                            <goal.icon className="w-6 h-6 md:w-8 md:h-8 text-brand-white/30 transition-colors duration-500 group-hover/goal:text-brand-dark" strokeWidth={1.5} />
                          </div>
                          <h3 className="font-mori font-bold text-3xl sm:text-5xl md:text-7xl tracking-tighter text-brand-white leading-[0.95] transition-colors duration-500">
                            {goal.title}
                          </h3>
                        </div>
                        <div className="w-full h-[1px] bg-brand-white/10 mb-10 transition-all duration-700 group-hover/goal:bg-[#bbf700] goal-divider" />
                        <p className="text-sm md:text-lg lg:text-xl text-brand-white/70 font-light leading-relaxed max-w-xl group-hover/goal:text-brand-white transition-colors">
                          {goal.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ── */}
      <section className="relative py-20 sm:py-24 md:py-40 border-t border-brand-ink/5 dark:border-brand-white/5 bg-transparent">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mb-10 sm:mb-14 md:mb-20">
            <SectionTag className="mb-4 sm:mb-6">Accreditations</SectionTag>
            <SectionTitle>Certifi&shy;cations</SectionTitle>
          </div>

          <div className="relative max-w-3xl mx-auto overflow-visible">
            {/* Pill-style Issuer Filters */}
            <div className="flex flex-nowrap overflow-x-auto hide-scrollbar items-center justify-start sm:justify-center gap-3 mb-10 sm:mb-12 relative z-30 pb-4 md:pb-0 py-8 px-2 -mx-2">
              {issuers.map((issuer, idx) => {
                const isGroupActive = certs[activeCertIndex].issuer === issuer.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCertIndex(issuer.firstIndex)}
                    className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-500 font-mori font-bold text-[11px] sm:text-sm tracking-tight ${isGroupActive
                      ? "bg-[#bbf700] text-brand-dark border-[#bbf700]"
                      : "bg-brand-white/[0.03] text-brand-white/40 border-brand-white/10 hover:border-brand-white/30 hover:text-brand-white"
                      }`}
                  >
                    {issuer.name} <span className={`ml-2 text-[10px] ${isGroupActive ? 'text-brand-dark/60' : 'text-brand-white/20'}`}>{issuer.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Main "Story" Card - Landscape Bond Paper Ratio */}
            <div
              className="relative aspect-square sm:aspect-[11/8.5] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-white/10 bg-brand-dark-alt shadow-[0_40px_100px_rgba(0,0,0,0.6)] group/story cursor-none"
              data-cursor-cert="true"
              onMouseEnter={() => setActive(true, "View Certificate")}
              onMouseLeave={() => setActive(false)}
            >
              {/* Progress Bars */}
              <div className="absolute top-4 left-4 right-4 z-30 flex gap-1.5 h-1">
                {certs.map((_, idx) => (
                  <div key={idx} className="flex-1 rounded-full bg-brand-white/20 overflow-hidden">
                    <motion.div
                      key={activeCertIndex === idx ? "active" : "inactive"}
                      initial={{ width: 0 }}
                      animate={{
                        width: activeCertIndex === idx ? "100%" : (idx < activeCertIndex ? "100%" : "0%")
                      }}
                      transition={{
                        duration: activeCertIndex === idx ? 6 : 0,
                        ease: "linear"
                      }}
                      onAnimationComplete={() => {
                        if (activeCertIndex === idx) nextCert();
                      }}
                      className="h-full bg-brand-white/90"
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCertIndex}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={certs[activeCertIndex].image}
                    alt={certs[activeCertIndex].title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 100vw, 500px"
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

                  {/* Floating Info Section */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-20 flex flex-col gap-2 sm:gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-accent text-brand-dark">
                          {certs[activeCertIndex].year}
                        </span>
                      </div>

                      {/* Mobile Only: View Certificate Button */}
                      {certs[activeCertIndex].url && certs[activeCertIndex].url !== "#" && (
                        <Link
                          href={certs[activeCertIndex].url}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-white/10 backdrop-blur-md border border-brand-white/20 text-[10px] font-bold text-brand-white active:scale-95 transition-all"
                        >
                          View Certificate
                          <ArrowUpRight size={12} className="text-brand-accent" />
                        </Link>
                      )}
                    </div>
                    <h3 className="font-mori font-bold text-lg sm:text-2xl md:text-3xl tracking-tight text-brand-white leading-tight">
                      {certs[activeCertIndex].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tap Navigation Overlays - Refined for Central Link */}
              <div
                className="absolute inset-y-0 left-0 w-[20%] z-20 cursor-none"
                onClick={(e) => { e.stopPropagation(); prevCert(); }}
              />
              <div
                className="absolute inset-y-0 right-0 w-[20%] z-20 cursor-none"
                onClick={(e) => { e.stopPropagation(); nextCert(); }}
              />

              {/* Central Area: Advanced Next *or* Link if available */}
              {certs[activeCertIndex].url && certs[activeCertIndex].url !== "#" ? (
                <Link
                  href={certs[activeCertIndex].url}
                  target="_blank"
                  className="absolute inset-y-0 left-[20%] right-[20%] z-20 cursor-none"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div
                  className="absolute inset-y-0 left-[20%] right-[20%] z-20 cursor-none"
                  onClick={(e) => { e.stopPropagation(); nextCert(); }}
                />
              )}
            </div>

            {/* Mobile/Tablet Only: Explicit Navigation Arrows */}
            <div className="flex lg:hidden items-center justify-center gap-6 mt-8">
              <button
                onClick={prevCert}
                className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/40 active:bg-brand-white/10 active:scale-90 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="text-[10px] font-black text-brand-white/30 tracking-widest uppercase">
                {activeCertIndex + 1} / {certs.length}
              </div>
              <button
                onClick={nextCert}
                className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/40 active:bg-brand-white/10 active:scale-90 transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Navigation Indicator Overlay for Desktop */}
            <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2">
              <button onClick={prevCert} className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/30 hover:text-brand-accent transition-colors">
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2">
              <button onClick={nextCert} className="w-12 h-12 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/30 hover:text-brand-accent transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-20 px-6 max-w-7xl mx-auto border-t border-brand-white/10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          <div className="flex-1">
            <h2 className="font-mori font-semibold text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-brand-white">
              Curious to see what I&apos;ve <span className="text-brand-accent">built</span>?
            </h2>
            <p className="mt-4 text-brand-white/60 max-w-xl font-light">
              Explore my portfolio to see how I combine technical precision with thoughtful design.
            </p>
          </div>
          <div className="flex flex-wrap items-center lg:justify-end gap-4 w-full lg:w-auto">
            <Button href="/projects" icon={ArrowRight}>
              View Projects
            </Button>
            <Button href="/blog" variant="secondary">
              Read Blogs
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}