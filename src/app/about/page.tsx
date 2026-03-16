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
  MapPin,
  User,
  Plus,
} from "lucide-react";

import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import HeroHeading from "@/components/ui/HeroHeading";
import PreviewLink from "@/components/ui/PreviewLink";
import Magnetic from "@/components/ui/Magnetic";


import { FaHeadphones, FaFileAlt, FaGraduationCap } from "react-icons/fa";

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
  const goalProgressDotRef = useRef<HTMLDivElement>(null);
  const ctaHighlightRef = useRef<HTMLSpanElement>(null);
  const interestsSectionRef = useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] = useState<SkillCategory>("frontend");
  const [activeInterest, setActiveInterest] = useState(0);
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);

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


  useGSAP(() => {
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

    gsap.fromTo(".cert-row",
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".cert-list", start: "top 80%" }
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
      gsap.fromTo(".progress-dot",
        { y: 0 },
        {
          y: timelineLineRef2.current.offsetHeight - (window.innerWidth < 768 ? 16 : 20),
          ease: "none",
          scrollTrigger: { trigger: ".education-container", start: "top 45%", end: "bottom 55%", scrub: true }
        }
      );
    }

    if (timelineLineRef3.current) {
      gsap.fromTo(".goal-progress-dot",
        { y: 0 },
        {
          y: timelineLineRef3.current.offsetHeight - (window.innerWidth < 768 ? 16 : 20),
          ease: "none",
          scrollTrigger: { trigger: ".goals-container", start: "top 45%", end: "bottom 55%", scrub: true }
        }
      );
    }

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

    if (goalProgressDotRef.current) {
      gsap.fromTo(goalProgressDotRef.current,
        { y: 0 },
        {
          y: (goalProgressDotRef.current.parentElement?.offsetHeight || 0) - (window.innerWidth < 768 ? 16 : 20),
          ease: "none",
          scrollTrigger: { trigger: ".history-container", start: "top 45%", end: "bottom 55%", scrub: true }
        }
      );
    }

    gsap.fromTo(".cta-section > div > *",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 80%" }
      }
    );

    if (ctaHighlightRef.current) {
      gsap.fromTo(ctaHighlightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".cta-section", start: "top 70%", end: "center center", scrub: 1 } }
      );
    }

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

  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="relative overflow-x-clip pb-32 transition-colors duration-500"
    >

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        {/* ─── HERO ── */}
        <section className="hero-section pt-28 md:pt-40 mb-20 sm:mb-32 md:mb-48 relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-10 sm:gap-12 lg:gap-20">

            <div className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0 shrink-0 flex flex-col items-start">
              <div className="relative w-full max-h-[480px] sm:max-h-[500px] lg:max-h-none rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-ink/15 dark:border-brand-white/10 bg-brand-ink/5 dark:bg-brand-white/5 profile-pic">
                <Image src="/assets/hero-photo.png" alt="Gabrielle Ainshley Velasquez - Full-Stack Developer Profile Portrait" width={800} height={1000} className="hidden lg:block w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out" priority sizes="480px" />
                <Image src="/assets/mobile-photo.png" alt="Gabrielle Ainshley Velasquez - Full-Stack Developer Profile Portrait" width={800} height={1000} className="block lg:hidden w-full h-auto object-cover grayscale-0 transition-all duration-1000 ease-out" priority sizes="(max-width: 640px) 240px, (max-width: 1024px) 380px" />
              </div>

              <div className="mt-8 sm:mt-10 flex w-full gap-8 sm:gap-12 fade-in-element">
                <div className="flex flex-col gap-1">
                  <span className="font-mori font-bold text-3xl sm:text-4xl text-brand-ink dark:text-brand-white tracking-tighter">3+</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-ink/50 dark:text-brand-white/40">Years Learning</span>
                </div>
                <div className="w-[1px] h-10 bg-brand-ink/10 dark:bg-brand-white/10 mt-2" />
                <div className="flex flex-col gap-1">
                  <span className="font-mori font-bold text-3xl sm:text-4xl text-brand-ink dark:text-brand-white tracking-tighter">{PROJECTS_DATA.length}</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-ink/50 dark:text-brand-white/40">Projects Built</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col relative z-10 w-full text-left">
              <SectionTag className="hero-reveal mb-4 sm:mb-6">Based in the Philippines</SectionTag>
              <HeroHeading>
                <div className="overflow-hidden py-1">
                  <span className="hero-reveal block mb-2">Hi, I&apos;m</span>
                </div>
                <div className="hero-reveal flex items-center justify-start gap-3 sm:gap-5 overflow-hidden py-2 -my-2">
                  <span className="text-brand-ink dark:text-brand-white">Gabrielle</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-brand-accent rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.25rem] shrink-0">
                    <Smile className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                  </span>
                </div>
              </HeroHeading>
              <div className="flex flex-col gap-4 sm:gap-6 text-sm md:text-lg text-brand-ink/80 dark:text-brand-white/70 leading-relaxed font-medium max-w-3xl fade-in-element">
                <p>I am a full-stack developer based in the Philippines 🇵🇭, specializing in building modern web applications that are both structurally robust and visually compelling. My work focuses on creating digital solutions that are purposeful, scalable, and thoughtfully designed.</p>
                <p>I am currently a third-year BS Information Technology student at Holy Angel University. With a strong foundation in both development and design, I bring a balanced and strategic perspective to every project I take on.</p>
                <p>My technical expertise spans the full stack, including React and Next.js for frontend development, as well as PHP and Node.js for backend systems. I approach each project with clarity, precision, and a commitment to delivering efficient, maintainable solutions built for long-term impact.</p>
              </div>
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
          <div className="hero-divider w-full h-[1px] bg-brand-ink/10 dark:bg-brand-white/10 mt-16 md:mt-24 origin-left" />
        </section>
      </div>

      {/* ─── BACKGROUND (EDUCATION & EXPERIENCE) ── */}
      <section className="relative py-16 sm:py-24 md:py-40 bg-transparent border-y border-brand-ink/5 dark:border-brand-white/5 exhibition-section">
        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <FaGraduationCap className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-32">
          {/* Sticky Reveal Sidebar */}
          <div className="hidden lg:flex lg:w-4/12 sticky top-40 h-[calc(100vh-15rem)] flex-col justify-center z-30 pointer-events-none">
            <div className="flex flex-col gap-6 relative pl-10 border-l border-brand-ink/10 dark:border-brand-white/10">
              <div className="absolute left-10 -top-8 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-ink/30 dark:text-brand-white/20">Background</div>

              <div className={`nav-project-item relative py-2 cursor-default transition-all duration-500 will-change-transform ${activeBackgroundIndex === 0 ? 'opacity-100 translate-x-4' : 'opacity-30 translate-x-0 scale-[0.85] origin-left'}`}>
                <div className={`nav-dot absolute left-[-44px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent transition-all duration-500 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.8)] ${activeBackgroundIndex === 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                <div className="font-mori font-bold text-5xl xl:text-6xl text-brand-ink dark:text-brand-white">Academic</div>
              </div>
              <div className={`nav-project-item relative py-2 cursor-default transition-all duration-500 will-change-transform ${activeBackgroundIndex === 1 ? 'opacity-100 translate-x-4' : 'opacity-30 translate-x-0 scale-[0.85] origin-left'}`}>
                <div className={`nav-dot absolute left-[-44px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent transition-all duration-500 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.8)] ${activeBackgroundIndex === 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                <div className="font-mori font-bold text-5xl xl:text-6xl text-brand-ink dark:text-brand-white">Professional</div>
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
                <div ref={timelineLineRef2} className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-ink/10 dark:bg-brand-white/10" />
                <div className="progress-dot absolute -left-[7px] md:-left-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(var(--brand-accent),0.4)] z-30" />
                <div className="relative w-full space-y-24 md:space-y-32 pt-12">
                  {EDUCATION.map((edu, i) => (
                    <div key={i} className="education-card relative w-full pl-6 sm:pl-10 md:pl-20">
                      <div className="flex flex-col gap-2 md:gap-4 mb-6">
                        <span className="font-mono text-xs md:text-sm font-medium text-brand-ink/40 dark:text-brand-white/30">{edu.period}</span>
                        <h3 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-brand-ink dark:text-brand-white leading-[1]">{edu.degree}</h3>
                        <div className="flex items-center gap-3 text-sm md:text-base font-medium text-brand-ink/50 dark:text-brand-white/40">
                          <span className="w-5 h-[1px] bg-brand-ink/20 dark:bg-brand-white/20" />
                          {edu.school}
                        </div>
                      </div>
                      <ul className="flex flex-col gap-4 max-w-2xl">
                        {edu.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-4 text-sm md:text-base text-brand-ink/70 dark:text-brand-white/60 font-medium">
                            <span className="text-brand-ink/30 dark:text-brand-white/20 font-mono text-xs mt-1.5">0{j + 1}</span>
                            <p>{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Content */}
            <div className="background-content-section w-full">
              <div className="lg:hidden flex items-center gap-4 mb-8">
                <SectionTitle className="!mb-0 text-3xl">Professional Experience</SectionTitle>
              </div>

              <div className="relative ml-2 md:ml-4 pb-8 md:pb-12 history-container">
                <div className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-ink/10 dark:bg-brand-white/10" />
                <div ref={goalProgressDotRef} className="progress-dot absolute -left-[7px] md:-left-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(var(--brand-accent),0.4)] z-30" />
                <div className="relative w-full space-y-24 md:space-y-32 pt-12">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="education-card relative w-full pl-6 sm:pl-10 md:pl-20">
                      <div className="flex flex-col gap-2 md:gap-4 mb-6">
                        <span className="font-mono text-xs md:text-sm font-medium text-brand-ink/40 dark:text-brand-white/30">{exp.period}</span>
                        <h3 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-brand-ink dark:text-brand-white leading-[1]">{exp.role}</h3>
                        <div className="flex items-center gap-3 text-sm md:text-base font-medium text-brand-ink/50 dark:text-brand-white/40">
                          <span className="w-5 h-[1px] bg-brand-ink/20 dark:bg-brand-white/20" />
                          {exp.company} / {exp.location}
                        </div>
                      </div>
                      <ul className="flex flex-col gap-4 max-w-2xl">
                        {exp.points.map((point, j) => (
                          <li key={j} className="flex items-start gap-4 text-sm md:text-base text-brand-ink/70 dark:text-brand-white/60 font-medium">
                            <span className="text-brand-ink/30 dark:text-brand-white/20 font-mono text-xs mt-1.5">•</span>
                            <p>{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
            <p className="text-sm md:text-base text-brand-ink/80 dark:text-brand-white/70 font-medium max-w-xs pb-1">
              Primary frameworks and systems used in my development cycles.
            </p>
          </div>

          <div className="filter-row flex items-end border-b border-brand-ink/10 dark:border-brand-white/10 mb-10 sm:mb-12 gap-0 overflow-x-auto hide-scrollbar">
            {FILTER_TABS.map((tab, idx) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleFilterChange(tab.value)}
                  className={`filter-tab group relative flex flex-col items-start gap-1.5 px-6 sm:px-8 pb-4 md:pb-5 pt-3 font-mori font-semibold uppercase tracking-[0.1em] text-sm md:text-base whitespace-nowrap transition-all duration-300 cursor-pointer border-b-2 -mb-[2px] ${isActive
                    ? "border-brand-ink dark:border-brand-white text-brand-ink dark:text-brand-white"
                    : "border-transparent text-brand-ink/30 dark:text-brand-white/30 hover:text-brand-ink/55 dark:hover:text-brand-white/55"
                    }`}
                >
                  <span className={`text-[10px] font-black tabular-nums transition-colors duration-300 ${isActive
                    ? "text-brand-ink dark:text-brand-accent"
                    : "text-brand-ink/40 dark:text-brand-white/20 group-hover:text-brand-ink/55 dark:group-hover:text-brand-white/55"
                    }`}>
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
                    className="skill-row group flex flex-col items-center gap-3 p-4 sm:p-5 rounded-xl border border-brand-ink/15 dark:border-brand-white/10 shadow-sm shadow-brand-ink/[0.02] dark:shadow-none bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm hover:border-brand-ink/30 hover:bg-brand-ink/[0.04] dark:hover:border-brand-white/20 dark:hover:bg-brand-accent/[0.05] transition-all duration-300 cursor-default"
                  >
                    <Icon className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 text-brand-ink/60 dark:text-brand-white/60 group-hover:text-brand-ink dark:group-hover:text-brand-accent transition-colors duration-300" />
                    <div className="flex flex-col items-center gap-1 w-full">
                      <span className="font-mori font-semibold tracking-tight text-xs sm:text-sm text-brand-ink dark:text-brand-white text-center leading-tight">
                        {skill.name}
                      </span>
                      {skill.learning && (
                        <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-brand-accent text-brand-dark leading-none">
                          Soon
                        </span>
                      )}
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
            <p className="mt-6 text-base md:text-lg text-brand-ink/60 dark:text-brand-white/50 font-medium max-w-xl">
              The interpersonal traits that shape how I work and collaborate.
            </p>
          </div>

          <ul className="soft-skills-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SOFT_SKILLS.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <li
                  key={i}
                  className="soft-skill-row group flex flex-col gap-5 p-6 md:p-8 rounded-[2rem] border border-brand-ink/10 dark:border-brand-white/10 bg-brand-ink/[0.02] dark:bg-brand-white/[0.02] hover:border-brand-ink/30 hover:bg-brand-ink/[0.04] dark:hover:border-brand-white/20 dark:hover:bg-brand-accent/[0.05] transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-brand-ink/[0.03] dark:bg-brand-white/[0.03] flex items-center justify-center group-hover:bg-brand-ink/[0.06] dark:group-hover:bg-brand-accent/[0.1] transition-all duration-300">
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 text-brand-ink/50 dark:text-brand-white/50 group-hover:text-brand-ink dark:group-hover:text-brand-accent transition-colors duration-300"
                        strokeWidth={2}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold tabular-nums text-brand-ink/22 dark:text-brand-white/20 transition-colors duration-300">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="font-mori font-bold text-xl md:text-2xl tracking-tight text-brand-ink dark:text-brand-white transition-colors duration-300">
                      {skill.title}
                    </h4>
                    <p className="text-sm md:text-base text-brand-ink/60 dark:text-brand-white/50 font-medium leading-relaxed transition-colors duration-300">
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

        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <FaHeadphones className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

          <div className="mb-16 text-center flex flex-col items-center">
            <SectionTag className="mb-4 sm:mb-6 justify-center">Beyond The Code</SectionTag>
            <SectionTitle>Personal Interests</SectionTitle>
          </div>

          <div className="w-full flex flex-col items-center">
            <div
              className="interests-fan flex justify-center items-center h-[280px] sm:h-[400px] lg:h-[450px] w-full relative"
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
                      onMouseEnter={() => setActiveInterest(idx)}
                      className="cursor-pointer"
                      animate={{
                        rotateZ: isActive ? 0 : offset * 6,
                        y: isActive ? -20 : Math.abs(offset) * 15,
                        scale: isActive ? 1.1 : 0.95,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    >
                      <div className={`w-[160px] h-[220px] sm:w-[240px] sm:h-[320px] lg:w-[300px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative transition-shadow duration-300 ${isActive ? "ring-2 ring-brand-accent shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"}`}>
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-accent/20 dark:bg-brand-white/10 flex items-center justify-center border border-brand-accent/30 dark:border-brand-white/20">
                    {(() => {
                      const ActiveIcon = INTERESTS[activeInterest].icon;
                      return <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-ink dark:text-brand-accent" strokeWidth={2} />;
                    })()}
                  </div>
                  <h3 className="font-mori font-bold text-2xl sm:text-3xl text-brand-ink dark:text-brand-white">
                    {INTERESTS[activeInterest].title}
                  </h3>
                  <p className="text-sm sm:text-base text-brand-ink/70 dark:text-brand-white/60 font-medium leading-relaxed">
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
            <p className="text-sm md:text-base lg:text-lg text-brand-ink/70 dark:text-brand-white/50 font-medium leading-relaxed max-w-xs">
              My mission is to build digital products that combine technical depth with human-centered design.
            </p>
          </div>

          <div className="w-full lg:w-8/12 lg:pt-6">
            <div className="relative ml-2 md:ml-4 pb-8 md:pb-12 goals-container">
              <div ref={timelineLineRef3} className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-ink/10 dark:bg-brand-white/10" />
              <div className="goal-progress-dot absolute -left-[7px] md:-left-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent z-30" />

              <div className="relative w-full space-y-32 md:space-y-48 pt-12">
                {GOALS.map((goal, i) => (
                  <div key={i} className="group relative w-full pl-6 sm:pl-10 md:pl-20">
                    <span className="absolute left-8 sm:left-12 -top-6 sm:-top-10 text-[4rem] sm:text-[6rem] md:text-[8rem] font-mori font-black text-brand-ink/[0.03] dark:text-brand-white/[0.02] select-none pointer-events-none group-hover:text-brand-ink/[0.06] dark:group-hover:text-brand-accent/10 transition-colors duration-700 leading-none">
                      {goal.num}
                    </span>
                    <div className="relative z-10 w-full">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] border border-brand-ink/10 dark:border-brand-white/10 flex items-center justify-center bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm group-hover:border-brand-accent group-hover:bg-brand-accent transition-all duration-500 shrink-0">
                          <goal.icon className="w-6 h-6 md:w-8 md:h-8 text-brand-ink/30 dark:text-brand-white/30 group-hover:text-brand-dark transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-mori font-bold text-3xl sm:text-5xl md:text-7xl tracking-tighter text-brand-ink dark:text-brand-white leading-[0.95]">
                          {goal.title}
                        </h3>
                      </div>
                      <div className="w-full h-[1px] bg-brand-ink/10 dark:bg-brand-white/10 mb-10 group-hover:bg-brand-ink/20 dark:group-hover:bg-brand-accent transition-all duration-700" />
                      <p className="text-sm md:text-lg lg:text-xl text-brand-ink/80 dark:text-brand-white/50 font-medium leading-relaxed max-w-xl group-hover:text-brand-ink/90 dark:group-hover:text-brand-white/70 transition-colors">
                        {goal.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ── */}
      <section className="relative py-20 sm:py-24 md:py-40 border-t border-brand-ink/5 dark:border-brand-white/5 bg-transparent">
        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <FaFileAlt className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mb-10 sm:mb-14 md:mb-20">
            <SectionTag className="mb-4 sm:mb-6">Accreditations</SectionTag>
            <SectionTitle>Certifi&shy;cations</SectionTitle>
          </div>

          <div className="cert-list flex flex-col max-w-4xl">
            {CERTIFICATIONS.map((group, gi) => (
              <div key={gi} className="py-6 sm:py-8 md:py-10 border-b border-brand-ink/10 dark:border-brand-white/10">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-4 sm:mb-5">
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-brand-ink/20 bg-brand-ink/[0.06] text-brand-ink dark:border-brand-accent dark:bg-brand-accent dark:text-brand-dark transition-colors duration-300">
                    {group.issuer}
                  </span>
                  <span className="text-[10px] font-medium text-brand-ink/50 dark:text-brand-white/30">{group.year}</span>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {group.items.map((item, ii) => (
                    <PreviewLink
                      key={ii}
                      href={item.url}
                      label="View Certificate"
                      description={item.url}
                      className="px-3 sm:px-5 py-3 sm:py-4 -mx-3 sm:-mx-5 rounded-xl sm:rounded-2xl hover:bg-white/50 dark:hover:bg-[#111]/50 transition-all duration-300"
                    >
                      <h3 className="font-mori font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-brand-ink dark:text-brand-white leading-[1.1] group-hover/preview:text-brand-ink/70 dark:group-hover/preview:text-brand-accent transition-colors duration-300">
                        {item.title}
                        <ArrowRight className="inline-block w-[1em] h-[1em] -rotate-45 ml-1 align-baseline" strokeWidth={2.5} />
                      </h3>
                    </PreviewLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ── */}
      <section className="cta-section py-20 px-6 max-w-7xl mx-auto border-t border-brand-white/10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-mori font-semibold text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-brand-ink dark:text-brand-white">
              Curious to see what I&apos;ve <span className="text-brand-accent">built</span>?
            </h2>
            <p className="mt-4 text-brand-ink/70 dark:text-brand-white/50 max-w-xl font-medium">
              Explore my portfolio to see how I combine technical precision with thoughtful design.
            </p>
          </div>
          <Magnetic>
            <Button href="/projects" icon={ArrowRight}>
              View Projects
            </Button>
          </Magnetic>
        </div>
      </section>
    </main>
  );
}