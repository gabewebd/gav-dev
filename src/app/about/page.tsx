"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Download,
  Smile,
  ArrowRight,
  MapPin,
} from "lucide-react";

import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import HeroHeading from "@/components/ui/HeroHeading";
import PreviewLink from "@/components/ui/PreviewLink";

import { FaHeadphones, FaFileAlt, FaGraduationCap, FaArrowUp } from "react-icons/fa";

import {
  SKILLS,
  FILTER_TABS,
  SOFT_SKILLS,
  INTERESTS,
  CERTIFICATIONS,
  type SkillCategory,
  EDUCATION,
  GOALS,
} from "@/data/about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── HOOKS ────────────────────────────────────────────────────────────────────



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
  const toggleGridRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef2 = useRef<HTMLDivElement>(null);
  const timelineLineRef3 = useRef<HTMLDivElement>(null);
  const goalProgressDotRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<SkillCategory>("frontend");
  const [showSoftSkills, setShowSoftSkills] = useState(true);



  const filteredSkills = SKILLS.filter((s) => s.category === activeFilter);

  const animateBars = useCallback(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(".progress-fill-skill").forEach((bar) => {
        const w = bar.getAttribute("data-width") ?? "0";
        gsap.fromTo(bar, { width: "0%" }, { width: `${w}%`, duration: 1.3, ease: "power3.out", delay: 0.05 });
      });
    });
  }, []);

  const handleFilterChange = useCallback((val: SkillCategory) => {
    if (!skillGridRef.current) { setActiveFilter(val); return; }
    gsap.to(Array.from(skillGridRef.current.children), {
      opacity: 0, y: 10, duration: 0.15, stagger: 0.02, ease: "power2.in",
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
    animateBars();
  }, [activeFilter, animateBars]);

  const handleToggle = useCallback((val: boolean) => {
    if (!toggleGridRef.current) { setShowSoftSkills(val); return; }
    gsap.to(Array.from(toggleGridRef.current.children), {
      opacity: 0, y: 12, duration: 0.18, stagger: 0.03, ease: "power2.in",
      onComplete: () => setShowSoftSkills(val),
    });
  }, []);

  useEffect(() => {
    if (!toggleGridRef.current) return;
    gsap.fromTo(
      Array.from(toggleGridRef.current.children),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" }
    );
  }, [showSoftSkills]);

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

    ScrollTrigger.create({
      trigger: ".skills-grid-wrapper",
      start: "top 80%",
      onEnter: () => animateBars(),
    });

    gsap.fromTo(".filter-tab",
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".filter-row", start: "top 85%" }
      }
    );

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



    // ─── EDUCATION & GOALS SCROLL ANIMATIONS ────────────────────────────────
    const eduCards = gsap.utils.toArray<HTMLElement>(".education-card");
    eduCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    const goalCards = gsap.utils.toArray<HTMLElement>(".goal-card");
    goalCards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Education Progress Line & Dot
    if (timelineLineRef2.current) {
      gsap.fromTo(".progress-dot",
        { y: 0 },
        {
          y: timelineLineRef2.current.offsetHeight - (window.innerWidth < 768 ? 16 : 20),
          ease: "none",
          scrollTrigger: {
            trigger: ".education-container",
            start: "top 45%",
            end: "bottom 55%",
            scrub: true,
          }
        }
      );
    }

    // Career Goals Progress Line & Dot
    if (timelineLineRef3.current) {
      gsap.fromTo(".goal-progress-dot",
        { y: 0 },
        {
          y: timelineLineRef3.current.offsetHeight - (window.innerWidth < 768 ? 16 : 20),
          ease: "none",
          scrollTrigger: {
            trigger: ".goals-container",
            start: "top 45%",
            end: "bottom 55%",
            scrub: true,
          }
        }
      );
    }

    // Scroll-triggered dots (for other sections if any)
    gsap.utils.toArray('.progress-dot:not(.education-container .progress-dot)').forEach((dot: any) => {
      const parent = dot.parentElement;
      gsap.fromTo(dot,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    });

  }, { scope: containerRef });

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-brand-light dark:bg-brand-dark overflow-x-clip pt-20 sm:pt-28 md:pt-40 transition-colors duration-500"
    >
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
        <svg className="w-full h-full">
          <filter id="static-noise">
            <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#static-noise)" />
        </svg>
      </div>

      {/* ─── HERO (WHITE/DEFAULT) ── */}
      <section className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-20 sm:mb-32 md:mb-48 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-10 sm:gap-12 lg:gap-20">

          <div className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0 shrink-0 flex flex-col items-start">
            <div className="relative w-full max-h-[480px] sm:max-h-[500px] lg:max-h-none rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-brand-ink/15 dark:border-brand-white/10 bg-brand-ink/5 dark:bg-brand-white/5 profile-pic">
              <Image src="/assets/hero-photo.png" alt="Gabrielle Ainshley Velasquez - Full-Stack Developer Profile Portrait" width={800} height={1000} className="hidden lg:block w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out" priority sizes="480px" />
              <Image src="/assets/mobile-photo.png" alt="Gabrielle Ainshley Velasquez - Full-Stack Developer Profile Portrait" width={800} height={1000} className="block lg:hidden w-full h-auto object-cover grayscale-0 transition-all duration-1000 ease-out" priority sizes="(max-width: 640px) 240px, (max-width: 1024px) 380px" />
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
            <div className="flex flex-col gap-4 sm:gap-6 text-sm md:text-lg text-brand-ink/80 dark:text-brand-white/70 leading-relaxed font-medium max-w-xl fade-in-element">
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
      </section>



      {/* ─── EDUCATION (ALTERNATE BG) ── */}
      <section className="relative py-16 sm:py-24 md:py-40 bg-black/[0.02] dark:bg-white/[0.01] border-y border-brand-ink/5 dark:border-brand-white/5">
        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <FaGraduationCap className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-32">
          <div className="w-full lg:w-4/12 lg:sticky lg:top-40 h-fit">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-ink text-brand-light dark:bg-brand-white dark:text-brand-dark rounded-[14px] md:rounded-2xl flex items-center justify-center shadow-lg">
                <FaGraduationCap className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-ink/80 dark:text-brand-white/70">01. Background</span>
            </div>
            <SectionTitle>Education</SectionTitle>
          </div>

          <div className="w-full lg:w-8/12 lg:pt-6">
            <div className="relative ml-2 md:ml-4 pb-8 md:pb-12 education-container">
              {/* Static timeline line */}
              <div ref={timelineLineRef2} className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-ink/10 dark:bg-brand-white/10" />

              {/* Reverted Scroll Dot */}
              <div className="progress-dot absolute -left-[7px] md:-left-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(var(--brand-accent),0.4)] z-30" />

              <div className="relative w-full space-y-24 md:space-y-40 pt-12">
                {EDUCATION.map((edu, i) => (
                  <div
                    key={i}
                    className="education-card relative w-full pl-6 sm:pl-10 md:pl-20 pt-2"
                  >
                    <div className="relative">
                      <div className="flex flex-col gap-2 md:gap-4 mb-6 md:mb-10">
                        <span className="font-mono text-xs md:text-sm font-medium tracking-[0.1em] text-brand-ink/40 dark:text-brand-white/30">
                          {edu.period}
                        </span>
                        <h3 className="font-mori font-bold text-3xl sm:text-4xl md:text-6xl tracking-tighter text-brand-ink dark:text-brand-white leading-[1] -ml-0.5">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-3 text-sm md:text-base font-medium text-brand-ink/50 dark:text-brand-white/40">
                          <span className="w-5 h-[1px] bg-brand-ink/20 dark:bg-brand-white/20" />
                          {edu.school}
                        </div>
                      </div>

                      <ul className="flex flex-col gap-5 md:gap-7 max-w-2xl">
                        {edu.points.map((point, j) => (
                          <li key={j} className="group/item flex items-start gap-4 text-sm md:text-base lg:text-lg text-brand-ink/70 dark:text-brand-white/60 font-medium leading-relaxed">
                            <span className="text-brand-ink/30 dark:text-brand-white/20 font-mono text-xs mt-1.5 group-hover/item:text-brand-ink/60 dark:group-hover/item:text-brand-accent transition-colors">0{j + 1}</span>
                            <p className="flex-1">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ─── CORE STACK (WHITE/DEFAULT) ── */}
      <section className="relative py-20 sm:py-24 md:py-40 border-b border-brand-ink/5 dark:border-brand-white/5 bg-brand-light dark:bg-brand-dark">

        <div className="bg-icon-parallax absolute top-1/2 left-[-15vw] sm:left-[-5vw] lg:left-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] -rotate-12 hidden lg:flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <ComputerSolidIcon className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

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

          {/* Filter tabs */}
          <div className="filter-row flex items-end border-b border-brand-ink/10 dark:border-brand-white/10 mb-10 sm:mb-14 md:mb-16 gap-0 overflow-x-auto hide-scrollbar">
            {FILTER_TABS.map((tab, idx) => {
              const isActive = activeFilter === tab.value;
              const count = SKILLS.filter((s) => s.category === tab.value).length;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleFilterChange(tab.value)}
                  className={`filter-tab group relative flex flex-col items-start gap-1.5 px-6 sm:px-8 md:px-10 lg:px-12 pb-5 md:pb-6 pt-3 md:pt-4 font-mori font-semibold uppercase tracking-[0.1em] text-sm md:text-base lg:text-lg whitespace-nowrap transition-all duration-300 cursor-pointer border-b-2 -mb-[2px] ${isActive
                    ? "border-brand-ink dark:border-brand-white text-brand-ink dark:text-brand-white"
                    : "border-transparent text-brand-ink/30 dark:text-brand-white/30 hover:text-brand-ink/55 dark:hover:text-brand-white/55"
                    }`}
                >
                  <span className={`text-[10px] md:text-xs font-black tabular-nums transition-colors duration-300 ${isActive
                    ? "text-brand-ink dark:text-brand-accent"
                    : "text-brand-ink/40 dark:text-brand-white/40 group-hover:text-brand-ink/55 dark:group-hover:text-brand-white/55"
                    }`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {tab.label}
                  <span className={`text-[10px] md:text-xs font-medium normal-case tracking-normal transition-colors duration-300 ${isActive
                    ? "text-brand-ink/50 dark:text-brand-white/45"
                    : "text-brand-ink/50 dark:text-brand-white/15"
                    }`}>
                    {count} skills
                  </span>
                </button>
              );
            })}
          </div>

          {/* Skills grid */}
          <div className="skills-grid-wrapper -mx-4 sm:-mx-6 md:-mx-12">
            <SmoothHeightWrapper>
              <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8">
                <div ref={skillGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 pb-1">
                  {filteredSkills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={`${skill.name}-${i}`}
                        className="skill-row group relative flex items-center gap-4 md:gap-5 px-5 sm:px-6 md:px-7 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl border border-brand-ink/15 dark:border-brand-white/10 shadow-md shadow-brand-ink/[0.03] dark:shadow-none bg-white/35 dark:bg-white/[0.02] backdrop-blur-sm
                        hover:border-brand-ink/20 hover:bg-brand-ink/[0.05]
                        dark:hover:border-brand-white/15 dark:hover:bg-brand-accent/[0.07]
                        transition-all duration-300 overflow-hidden cursor-default"
                      >
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 shrink-0 text-brand-ink/70 dark:text-brand-white/70 group-hover:text-brand-ink dark:group-hover:text-brand-white transition-colors duration-300" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mori font-semibold uppercase tracking-tight text-sm md:text-base text-brand-ink dark:text-brand-white truncate">
                                {skill.name}
                              </span>
                              {skill.learning && (
                                <span className="shrink-0 text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-brand-accent text-brand-dark leading-none">
                                  Soon
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[10px] md:text-xs text-brand-ink/50 dark:text-brand-white/35 shrink-0 ml-3">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-brand-ink/10 dark:bg-brand-white/10 rounded-full overflow-hidden" style={{ height: "2px" }}>
                            <div
                              className="progress-fill-skill rounded-full bg-brand-ink dark:bg-brand-accent"
                              data-width={skill.level}
                              style={{ width: "0%", height: "2px" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SmoothHeightWrapper>
          </div>
        </div>
      </section>

      {/* ─── BEYOND THE CODE (ALTERNATE BG) ── */}
      <section className="toggle-section relative py-20 sm:py-24 md:py-40 bg-black/[0.02] dark:bg-white/[0.01] border-b border-brand-ink/5 dark:border-brand-white/5">
        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <FaHeadphones className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mb-12 sm:mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
            <div>
              <SectionTag className="mb-4 sm:mb-6">About Me</SectionTag>
              <SectionTitle>
                Beyond <br />The Code
              </SectionTitle>
            </div>

            {/* Toggle */}
            <div className="flex flex-col gap-1">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-brand-ink/40 dark:text-brand-white/35 mb-1">
                Toggle view
              </p>
              <div className="flex items-end border-b border-brand-ink/10 dark:border-brand-white/10 gap-0">
                {[
                  { label: "Soft Skills", idx: 1, active: showSoftSkills, onClick: () => !showSoftSkills && handleToggle(true) },
                  { label: "Interests", idx: 2, active: !showSoftSkills, onClick: () => showSoftSkills && handleToggle(false) },
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={tab.onClick}
                    className={`group relative flex flex-col items-start gap-1.5 px-6 sm:px-8 pb-4 md:pb-5 pt-3 font-mori font-semibold uppercase tracking-[0.1em] text-sm md:text-base whitespace-nowrap transition-all duration-300 cursor-pointer border-b-2 -mb-[2px] ${tab.active
                      ? "border-brand-ink dark:border-brand-white text-brand-ink dark:text-brand-white"
                      : "border-transparent text-brand-ink/30 dark:text-brand-white/30 hover:text-brand-ink/55 dark:hover:text-brand-white/55"
                      }`}
                  >
                    <span className={`text-[10px] font-black tabular-nums transition-colors duration-300 ${tab.active
                      ? "text-brand-ink dark:text-brand-accent"
                      : "text-brand-ink/40 dark:text-brand-white/20"
                      }`}>
                      {String(tab.idx).padStart(2, "0")}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image 2 Inspired 4-Column Grid */}
          <div className="-mx-4 sm:-mx-6 md:-mx-12">
            <SmoothHeightWrapper>
              <div className="px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8">
                <div ref={toggleGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 pb-1">
                  {(showSoftSkills ? SOFT_SKILLS : INTERESTS).map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="toggle-card group relative flex flex-col gap-8 p-8 border-t border-brand-ink/10 dark:border-brand-white/10 hover:bg-brand-ink/[0.03] dark:hover:bg-brand-white/[0.03] transition-all duration-500"
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-brand-accent/15 dark:bg-brand-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-accent dark:group-hover:bg-brand-accent transition-all duration-500">
                            <Icon
                              className="w-5 h-5 text-brand-ink dark:text-brand-accent group-hover:text-brand-dark dark:group-hover:text-black transition-colors duration-500"
                              strokeWidth={1.5}
                            />
                          </div>
                          {/* Number: Neutral in light, Accent in dark hover */}
                          <span className="font-mori font-bold text-xs tabular-nums text-brand-ink/20 dark:text-brand-white/20 group-hover:text-brand-ink/30 dark:group-hover:text-brand-accent/60 transition-colors">
                            0{i + 1}
                          </span>
                        </div>

                        <div className="flex flex-col gap-4 relative z-10">
                          <h3 className="font-mori font-bold text-xl md:text-2xl lg:text-3xl tracking-tight text-brand-ink dark:text-brand-white transition-colors duration-500">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base lg:text-lg text-brand-ink/70 dark:text-brand-white/40 font-medium leading-relaxed group-hover:text-brand-ink/80 dark:group-hover:text-brand-white/60 transition-colors duration-500">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SmoothHeightWrapper>
          </div>
        </div>
      </section>

      {/* ─── CAREER GOALS — IMAGE 1 BESPOKE LAYOUT ── */}
      <section className="relative py-24 sm:py-32 md:py-48 border-b border-brand-ink/5 dark:border-brand-white/5 bg-brand-light dark:bg-brand-dark">
        {/* SVG removed as requested */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-32">

          <div className="w-full lg:w-4/12 lg:sticky lg:top-40 h-fit">
            <SectionTag className="mb-6">Objectives</SectionTag>
            <SectionTitle className="mb-8">
              My Career <br />Goals
            </SectionTitle>
            <p className="text-sm md:text-base lg:text-lg text-brand-ink/70 dark:text-brand-white/50 font-medium leading-relaxed max-w-xs">
              My mission is to build digital products that combine technical depth with human-centered design.
            </p>
          </div>

          <div className="w-full lg:w-8/12 lg:pt-6">
            <div className="relative ml-2 md:ml-4 pb-8 md:pb-12 goals-container">
              {/* GSAP Scroll Timeline */}
              <div ref={timelineLineRef3} className="absolute top-0 bottom-0 left-0 w-[2px] md:w-[3px] bg-brand-ink/10 dark:bg-brand-white/10" />
              <div className="goal-progress-dot absolute -left-[7px] md:-left-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full bg-brand-accent z-30" />

              <div className="relative w-full space-y-32 md:space-y-48 pt-12">
                {GOALS.map((goal, i) => (
                  <div key={i} className="group relative w-full pl-6 sm:pl-10 md:pl-20">
                    {/* Large Number Background (Image 1 Style) */}
                    <span className="absolute -left-4 -top-8 sm:-top-12 text-[8rem] sm:text-[12rem] md:text-[18rem] font-mori font-black text-brand-ink/[0.03] dark:text-brand-white/[0.02] select-none pointer-events-none group-hover:text-brand-ink/[0.05] dark:group-hover:text-brand-accent/10 transition-colors duration-700 leading-none">
                      {goal.num}
                    </span>

                    <div className="relative z-10 w-full">
                      <div className="flex items-center gap-6 mb-8">
                        {/* Icon Container next to title */}
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] border border-brand-ink/10 dark:border-brand-white/10 flex items-center justify-center bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm group-hover:border-brand-accent group-hover:bg-brand-accent transition-all duration-500 shrink-0">
                          <goal.icon className="w-6 h-6 md:w-8 md:h-8 text-brand-ink/30 dark:text-brand-white/30 group-hover:text-brand-dark transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-mori font-bold text-3xl sm:text-5xl md:text-7xl tracking-tighter text-brand-ink dark:text-brand-white leading-[0.95]">
                          {goal.title}
                        </h3>
                      </div>

                      {/* Divider logic */}
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

      {/* ─── CERTIFICATIONS (ALTERNATE BG) ── */}
      <section className="relative py-20 sm:py-24 md:py-40 border-t border-brand-ink/5 dark:border-brand-white/5 bg-black/[0.02] dark:bg-white/[0.01]">
        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <FaFileAlt className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="mb-10 sm:mb-14 md:mb-20">
            <SectionTag className="mb-4 sm:mb-6">Accreditations</SectionTag>
            <SectionTitle>
              Certifi&shy;cations
            </SectionTitle>
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
    </main >
  );
}
