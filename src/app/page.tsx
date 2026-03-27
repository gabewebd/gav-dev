"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  AnimatePresence,
  Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition
} from "framer-motion";
import {
  ArrowRight,
  Lightbulb,
  Box,
  Code2,
  Server,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Tv,
  Laptop,
  Smile,
  Plus,
  User,
} from "lucide-react";
import {
  FaCode,
  FaServer,
  FaLightbulb,
  FaCommentDots,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  SiSparkpost,
} from "react-icons/si";
import ProjectShowcase from "@/components/ProjectShowcase";
import {
  ROTATING_PAIRS,
  MARQUEE_WORDS,
  SERVICES,
  TESTIMONIALS,
} from "@/data/home";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import Magnetic from "@/components/ui/Magnetic";
import { PROJECTS_DATA } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── UTILS ───────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


// ─── ROTATING TEXT HOOK ───────────────────────────────────────────────────────

function useRotatingText(pairs: typeof ROTATING_PAIRS, interval = 3000) {
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const animateSwap = useCallback((newIndex: number) => {
    if (!wordRef.current || !iconRef.current) return;
    const tl = gsap.timeline();
    tl.to([wordRef.current, iconRef.current], { y: 40, opacity: 0, duration: 0.2, ease: "power3.in" });
    tl.call(() => setIndex(newIndex));
    tl.fromTo([wordRef.current, iconRef.current],
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)", stagger: 0.05 }
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => animateSwap((index + 1) % pairs.length), interval);
    return () => clearInterval(timer);
  }, [index, pairs.length, interval, animateSwap]);

  return { index, wordRef, iconRef };
}

// ─── SOLID BACKGROUND ICON COMPONENTS ────────────────────────────────────────


// ─── TOOLTIP COMPONENT ────────────────────────────────────────────────────────

const StatusTooltip = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => { setIsTouch(window.matchMedia("(hover: none)").matches); }, []);

  return (
    <div className="relative group flex items-center justify-center w-full cursor-pointer py-4 outline-none" tabIndex={isTouch ? 0 : -1}>
      <Icon className={`w-5 h-5 md:w-6 md:h-6 text-brand-dark transition-transform duration-300 group-hover:scale-110 ${isTouch ? "group-focus:scale-110" : ""}`} strokeWidth={2.5} />
      <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none z-50 ${isTouch ? "group-focus:opacity-100 group-focus:-translate-x-1" : ""}`}>
        <div className="bg-white text-brand-dark px-4 py-2.5 rounded-xl border border-black/5 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/50 mb-0.5 block">{label}</span>
          <span className="text-xs md:text-sm font-mori font-bold whitespace-nowrap block text-brand-dark">{value}</span>
        </div>
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-white" />
      </div>
    </div>
  );
};


// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const testimonialWrapperRef = useRef<HTMLDivElement>(null);
  const testimonialContentRef = useRef<HTMLDivElement>(null);

  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [tIndex, setTIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const [activeBubbles, setActiveBubbles] = useState<number[]>([]);

  const toggleBubble = (id: number) => {
    setActiveBubbles(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const { index: rotatingIndex, wordRef: rotatingWordRef, iconRef: rotatingIconRef } = useRotatingText(ROTATING_PAIRS, 3000);
  const CurrentIcon = ROTATING_PAIRS[rotatingIndex].icon;

  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const nextTestimonial = () => { setSlideDir(1); setTIndex((p) => (p + 1) % TESTIMONIALS.length); };
  const prevTestimonial = () => { setSlideDir(-1); setTIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };

  const toggleService = (i: number) => {
    setExpandedServices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const closeHovered = () => setHoveredService(null);

  useGSAP(() => {
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
      // Increased durations and staggers for a smoother, less rushed entrance
      .fromTo(".hero-line", { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, stagger: 0.15 })
      .from(".hero-sub", { opacity: 0, y: 30, duration: 1 }, "-=0.8")
      .from(".hero-bio", { opacity: 0, y: 20, duration: 1 }, "-=0.7")
      .fromTo(".hero-cta-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.6")
      .from(".hero-portrait-wrapper", { opacity: 0, x: 40, duration: 1.5, ease: "power3.out" }, "-=1");


    if (marqueeTrackRef.current) {
      const track = marqueeTrackRef.current;
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        const marqueeDuration = isMobile ? 100 : 35;
        const marqueeTween = gsap.fromTo(track,
          { xPercent: 0 },
          { xPercent: -50, duration: marqueeDuration, ease: "none", repeat: -1 }
        );

        if (marqueeRef.current) {
          const handleEnter = () => gsap.to(marqueeTween, { timeScale: 0.1, duration: 0.8 });
          const handleLeave = () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.8 });

          marqueeRef.current.addEventListener("mouseenter", handleEnter);
          marqueeRef.current.addEventListener("mouseleave", handleLeave);

          return () => {
            if (marqueeRef.current) {
              marqueeRef.current.removeEventListener("mouseenter", handleEnter);
              marqueeRef.current.removeEventListener("mouseleave", handleLeave);
            }
            marqueeTween.kill();
          };
        }
      });
    }

    gsap.from(".service-header-element", {
      scrollTrigger: { trigger: ".services-section", start: "top 80%" },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    });
    gsap.from(".service-item", {
      scrollTrigger: { trigger: ".services-section", start: "top 70%" },
      x: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
    });

    gsap.from(".testimonial-header", {
      scrollTrigger: { trigger: ".testimonials-section", start: "top 85%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
    });


  }, { scope: mainRef });

  useEffect(() => {
    if (testimonialWrapperRef.current && testimonialContentRef.current) {
      gsap.to(testimonialWrapperRef.current, {
        height: testimonialContentRef.current.offsetHeight,
        duration: 0.4, ease: "power3.out",
      });
    }
  }, [tIndex]);

  useGSAP(() => {
    if (!testimonialContentRef.current) return;
    const qNode = testimonialContentRef.current.querySelector(".testimonial-quote");
    const authorNode = testimonialContentRef.current.querySelector(".testimonial-author-block");
    const tl = gsap.timeline();
    tl.fromTo(testimonialContentRef.current, { opacity: 0, x: 60 * slideDir }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" });
    if (qNode) {
      tl.fromTo(qNode, { opacity: 0, x: 20 * slideDir }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.4");
      tl.fromTo(authorNode, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");
    }
  }, { dependencies: [tIndex, slideDir], scope: mainRef });

  return (
    <main ref={mainRef} className="relative overflow-x-clip pb-32 transition-colors duration-500">


      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO FOREGROUND
          ═══════════════════════════════════════════════════════ */}
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10 w-full">
        <section className="hero-section min-h-[90vh] pt-28 md:pt-40 pb-16 md:pb-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
          <div className="flex-1 w-full relative z-10">
            <div className="overflow-hidden">
              <h1 className="font-mori font-semibold text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter text-brand-white mb-7 sm:mb-10 lg:mb-12">
                <span className="hero-line block text-brand-white pt-4 pb-2 -mb-6 md:-mb-8 lg:-mb-10">Building</span>

                <span className="hero-line block text-brand-white pt-4 pb-2 -mb-4 md:-mb-6 lg:-mb-8">your</span>

                <span className="hero-line flex items-center gap-3 md:gap-4 overflow-visible py-4 -my-4">

                  {/* ── ROTATING WORD ── */}
                  <span ref={rotatingWordRef} className="text-brand-white block pt-2">
                    {ROTATING_PAIRS[rotatingIndex].word}
                  </span>

                  {/* ── SYNCED ICON ── */}
                  <span
                    ref={rotatingIconRef}
                    className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-brand-accent rounded-[1rem] md:rounded-[1.25rem] shrink-0 shadow-lg"
                  >
                    <CurrentIcon className="w-6 h-6 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                  </span>

                </span>
              </h1>
            </div>

            <div className="hero-sub mt-4 md:mt-6">
              <h2 className="font-mori font-semibold text-2xl md:text-4xl tracking-normal text-brand-white">
                Full Stack Developer
              </h2>
            </div>

            <div className="hero-bio mt-4 md:mt-5 max-w-lg md:max-w-2xl lg:max-w-lg">
              <p className="text-sm md:text-lg text-body leading-relaxed font-light">
                I&apos;m <strong className="text-brand-white font-semibold">Gabrielle Ainshley Velasquez</strong>,
                a third-year BS Information Technology student with hands-on experience across the full stack. I enjoy turning complex ideas into structured,
                well-designed solutions. I approach every project with clarity, intention, and strong attention to detail.
              </p>
            </div>

            <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4 relative z-20">
              <Button
                href="/projects"
                icon={ArrowRight}
                className="hero-cta-btn !px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
              >
                View Projects
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="hero-cta-btn !px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
              >
                Contact Me
              </Button>
            </div>
          </div>

          {/* Added max-w bounds and mx-auto so it stays properly sized on Mobile/Tablet */}
          <div className="hero-portrait-wrapper w-full max-w-[360px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-none lg:w-[480px] xl:w-[520px] mx-auto lg:mx-0 aspect-[4/5] relative z-20 mt-8 lg:mt-0">
            <div className="w-full h-full relative rounded-[2rem] overflow-visible border border-brand-white/10 flex bg-brand-dark-alt">
              <div className="flex-1 relative overflow-hidden group rounded-l-[2rem]">
                <Image src="/assets/hero-photo.png" alt="Gabrielle Ainshley Velasquez" fill className="object-cover scale-[1.02] grayscale-0 lg:grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-700" priority sizes="(max-width: 768px) 100vw, 540px" />
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 bg-black/30 backdrop-blur-xl border border-white/20 rounded-xl p-3 md:p-4 flex items-center justify-between">
                  <span className="font-mori font-semibold text-white tracking-[0.15em] text-[10px] md:text-xs uppercase">GAV.DEV</span>
                  <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                </div>
              </div>
              <div className="w-12 md:w-16 bg-brand-accent flex flex-col items-center justify-center gap-4 md:gap-6 py-8 z-30 shrink-0 rounded-r-[2rem]">
                <StatusTooltip icon={Headphones} label="Listening" value="Pop Music" />
                <StatusTooltip icon={Tv} label="Watching" value="Fantasy Series" />
                <StatusTooltip icon={Laptop} label="Building" value="FoodSaver App" />
                <StatusTooltip icon={Smile} label="Vibe" value="Chill & Focused" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — MARQUEE TAPE
          ═══════════════════════════════════════════════════════ */}
      <section ref={marqueeRef} className="bg-brand-white/5 py-8 md:py-20 overflow-hidden overflow-x-clip cursor-default select-none relative z-10 md:-rotate-2 md:scale-105 my-8 md:my-24 border-y border-brand-white/10 backdrop-blur-sm">
        <div ref={marqueeTrackRef} className="marquee-track flex items-center">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center shrink-0">
              {MARQUEE_WORDS.map((word, wi) => (
                <span key={`${setIdx}-${wi}`} className="flex items-center shrink-0">
                  <span className="font-mori font-semibold text-[clamp(1.5rem,4vw,5rem)] uppercase tracking-[-0.02em] text-muted hover:!text-brand-white px-3 md:px-8 py-2 transition-colors duration-300 whitespace-nowrap cursor-pointer">
                    {word}
                  </span>
                  <span className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-brand-accent shrink-0 mx-6 md:mx-10" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — CAPABILITIES
          ═══════════════════════════════════════════════════════ */}
      <section className="services-section py-20 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative z-10">

          <div className="lg:w-1/3 lg:sticky lg:top-40 relative z-20 flex flex-col items-start">
            <SectionTag className="service-header-element mb-6">Capabilities</SectionTag>
            <SectionTitle className="service-header-element mb-6">
              What I <br /> Bring To <br /> The Table
            </SectionTitle>
            <p className="service-header-element text-sm md:text-base text-muted leading-relaxed max-w-xs font-light">
              I don&apos;t just write code, I build scalable, well-structured systems by combining analytical thinking with refined frontend development.
            </p>

            <Button
              href="/about"
              variant="primary"
              icon={ArrowRight}
              className="mt-8 !px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5"
            >
              About Me
            </Button>
          </div>

          <div className="lg:w-2/3 flex flex-col w-full mt-10 lg:mt-0 relative z-10 border-t border-brand-white/10">
            {SERVICES.map((service, i) => {
              const isActive = expandedServices.includes(i) || hoveredService === i;
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  onClick={() => toggleService(i)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) setHoveredService(i);
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(hover: hover)").matches) setHoveredService(null);
                  }}
                  className="service-item group border-b border-brand-ink/10 dark:border-brand-white/10 py-8 md:py-10 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 md:gap-8">
                      <span className={`font-mono text-sm md:text-base transition-colors duration-500 mt-1 md:mt-2 ${isActive ? "text-brand-white" : "text-muted"}`}>
                        0{i + 1}
                      </span>
                      <div className="flex flex-col gap-3 md:gap-4">
                        <h3 className={`font-mori font-semibold text-2xl md:text-4xl lg:text-5xl tracking-tight transition-colors duration-500 ${isActive ? "text-brand-white" : "text-muted"}`}>
                          {service.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2">
                          {service.stack.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isActive
                                ? "border-brand-white/25 text-brand-white bg-brand-white/5"
                                : "border-brand-white/10 text-body bg-transparent"
                                }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={isActive ? `Close ${service.title}` : `Open ${service.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          setExpandedServices((prev) => prev.filter((x) => x !== i));
                          setHoveredService(null);
                        } else {
                          toggleService(i);
                        }
                      }}
                      className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${isActive
                        ? "bg-brand-white border-brand-white text-brand-ink rotate-45"
                        : "border-brand-white/20 text-brand-white/90"
                        }`}
                    >
                      <Plus className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                    </button>
                  </div>

                  <div className={`grid transition-all duration-500 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100 mt-6 md:mt-8" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                    <div className="overflow-hidden flex flex-col md:flex-row md:items-start gap-6 md:gap-8 pl-12 md:pl-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-brand-accent flex items-center justify-center shrink-0 mt-1">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-dark" strokeWidth={2} />
                      </div>
                      <p className="text-sm md:text-base lg:text-lg text-body leading-relaxed max-w-lg font-light pt-2">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — PROJECT SHOWCASE
          ═══════════════════════════════════════════════════════ */}
      <ProjectShowcase />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section className="testimonials-section w-full relative z-10 border-t border-brand-white/10 fade-primary-to-alt overflow-hidden">

        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] md:opacity-[0.05]">
          <svg className="w-full h-full">
            <filter id="static-noise-testi">
              <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#static-noise-testi)" />
          </svg>
        </div>


        <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10">

          <div className="testimonial-header mb-12 md:mb-20 text-center">
            <SectionTag className="justify-center mb-3">Kind Words</SectionTag>
            <SectionTitle>
              Client <br /> Feedback
            </SectionTitle>
          </div>

          <div className="w-full max-w-4xl relative">
            <div className="absolute -top-10 left-0 md:-left-6 md:-top-20 md:-left-12 opacity-10 pointer-events-none">
              <span className="font-serif font-black text-[120px] md:text-[200px] leading-none text-brand-white">&ldquo;</span>
            </div>

            <div ref={testimonialWrapperRef} className="relative z-10 overflow-hidden transition-all duration-500">
              <div className="flex flex-col justify-center px-4 md:px-12" ref={testimonialContentRef}>
                <blockquote className="testimonial-quote text-2xl md:text-4xl lg:text-5xl leading-[1.3] text-brand-white font-mori font-normal mb-10 md:mb-16">
                  {TESTIMONIALS[tIndex].quote}
                </blockquote>
                <div className="testimonial-author-block flex items-center justify-between border-t border-brand-white/10 pt-6 md:pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-white/10 flex items-center justify-center">
                      <span className="font-mori font-semibold text-lg text-brand-white">{TESTIMONIALS[tIndex].author[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-mori font-bold text-sm md:text-base text-brand-white leading-tight mb-0.5">{TESTIMONIALS[tIndex].author}</h4>
                      <p className="text-[10px] md:text-sm text-muted">{TESTIMONIALS[tIndex].role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={prevTestimonial} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-ink/20 dark:border-brand-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-brand-dark transition-all duration-300">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextTestimonial} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-ink/20 dark:border-brand-white/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent hover:text-brand-dark transition-all duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — BUBBLE CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="cta-section pt-32 md:pt-48 pb-12 md:pb-16 px-4 md:px-12 text-center border-t border-brand-ink/5 dark:border-brand-white/5 relative z-10 overflow-hidden">

        <div className="max-w-5xl mx-auto relative z-10">

          {/* BUBBLE HEADING */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 w-full max-w-[90rem] mx-auto perspective-[1000px]">
            <motion.span
              whileHover={{ scale: 1.08, rotateZ: -4, y: -8 }}
              whileTap={{ scale: 0.95, rotateZ: -2, y: 0 }}
              onClick={() => toggleBubble(0)}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-3 sm:py-6 rounded-full border shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors duration-300 font-mori font-bold text-[clamp(3.5rem,9vw,8rem)] cursor-default leading-[0.9] tracking-tighter ${activeBubbles.includes(0) ? "bg-brand-blue text-white border-brand-blue" : "bg-white/[0.05] border-white/10 text-white"}`}
            >
              Let&apos;s
            </motion.span>

            <motion.span
              whileHover={{ scale: 1.08, rotateZ: 3, y: -8 }}
              whileTap={{ scale: 0.95, rotateZ: 2, y: 0 }}
              onClick={() => toggleBubble(1)}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-3 sm:py-6 rounded-[2rem] sm:rounded-[4rem] hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors duration-300 font-mori font-bold text-[clamp(3.5rem,9vw,8rem)] cursor-default leading-[0.9] tracking-tighter ${activeBubbles.includes(1) ? "bg-brand-blue text-white border-brand-blue" : "bg-brand-accent text-brand-dark"}`}
            >
              build
            </motion.span>

            <motion.span
              whileHover={{ scale: 1.08, rotateZ: -2, y: -8 }}
              whileTap={{ scale: 0.95, rotateZ: -1, y: 0 }}
              onClick={() => toggleBubble(2)}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-3 sm:py-6 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-300 font-mori font-bold text-[clamp(3.5rem,9vw,8rem)] cursor-default leading-[0.9] tracking-tighter ${activeBubbles.includes(2) ? "bg-brand-blue text-white" : "bg-white text-black"}`}
            >
              something
            </motion.span>

            <motion.span
              whileHover={{ scale: 1.08, rotateZ: 5, y: -8 }}
              whileTap={{ scale: 0.95, rotateZ: 3, y: 0 }}
              onClick={() => toggleBubble(3)}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`inline-flex items-center justify-center px-8 sm:px-12 md:px-16 py-3 sm:py-6 rounded-[2rem] sm:rounded-[4rem] border-2 hover:bg-brand-accent hover:border-brand-accent hover:text-brand-dark transition-colors duration-300 font-mori font-bold text-[clamp(3.5rem,9vw,8rem)] cursor-default leading-[0.9] tracking-tighter ${activeBubbles.includes(3) ? "bg-brand-accent border-brand-accent text-brand-dark" : "border-white text-white"}`}
            >
              together.
            </motion.span>
          </div>

          <div className="mt-16 md:mt-24 flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-20">
            <Magnetic>
              <Button
                href="/contact"
                icon={ArrowRight}
                ariaLabel="Navigate to contact page"
                className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
              >
                Contact Me
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href="/projects"
                variant="secondary"
                ariaLabel="View all featured projects"
                className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
              >
                See My Work
              </Button>
            </Magnetic>
          </div>

          <p className="mt-12 md:mt-16 text-[10px] md:text-xs font-light uppercase tracking-[0.2em] text-white max-w-md mx-auto px-4 leading-relaxed">
            Always open to new opportunities, collaborations, and building something meaningful.
          </p>
        </div>
      </section>
    </main >
  );
}