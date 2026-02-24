"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Lightbulb,
  Eye,
  PenTool,
  Box,
  Network,
  Code2,
  Server,
  Palette,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Tv,
  Laptop,
  Smile,
  Plus,
  MessageSquare,

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

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── SOLID BACKGROUND ICON COMPONENTS ────────────────────────────────────────

function CodeSolid({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor" className={className}>
      <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
    </svg>
  );
}

function ServerSolid({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
      <path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
    </svg>
  );
}

function LightbulbSolid({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className={className}>
      <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2c0 0 0 0 0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4c0 0 0 0 0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z" />
    </svg>
  );
}

function MessageSolid({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
      <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-8.9 1.7-16.3-5.8-15.3-14.8c1.7-14.3 6.2-28 10.8-39.9c2.4-6.2 4.8-11.9 7-17c-44.3-35.1-71-83.9-71-138.1C-21 125.1 93.6 32 235 32c127.4 0 232.9 75.4 251.1 174.3C487.8 215.7 488 227.8 488 240z" />
    </svg>
  );
}

// Person SVG for testimonials background
function PersonSolid({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
    </svg>
  );
}

function SparklesSolid({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
      <path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.5 188.5 8.3 241.1C2.6 243.7 0 249.4 0 255.6s3.6 11.9 9.3 14.5l115.2 52.6L177.1 437.7c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.6-115.2 115.2-52.6c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L259.7 188.5 205.1 73.3zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z" />
    </svg>
  );
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

// ─── TOOLTIP COMPONENT ────────────────────────────────────────────────────────

const StatusTooltip = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => { setIsTouch(window.matchMedia("(hover: none)").matches); }, []);

  return (
    <div className="relative group flex items-center justify-center w-full cursor-pointer py-4 outline-none" tabIndex={isTouch ? 0 : -1}>
      <Icon className={`w-5 h-5 md:w-6 md:h-6 text-brand-dark transition-transform duration-300 group-hover:scale-110 ${isTouch ? "group-focus:scale-110" : ""}`} strokeWidth={2.5} />
      <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 pointer-events-none z-50 ${isTouch ? "group-focus:opacity-100 group-focus:-translate-x-1" : ""}`}>
        <div className="bg-white text-[#111111] px-4 py-2.5 rounded-xl border border-black/5 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-0.5 block">{label}</span>
          <span className="text-xs md:text-sm font-outfit font-bold whitespace-nowrap block">{value}</span>
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
  const epicHighlightRef = useRef<HTMLSpanElement>(null);
  const testimonialWrapperRef = useRef<HTMLDivElement>(null);
  const testimonialContentRef = useRef<HTMLDivElement>(null);

  // Track which services are explicitly opened by the user (touch) or hovered (mouse)
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [tIndex, setTIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);


  // ── Scroll-to-top on route navigation ──────────────────────────────────────
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const nextTestimonial = () => { setSlideDir(1); setTIndex((p) => (p + 1) % TESTIMONIALS.length); };
  const prevTestimonial = () => { setSlideDir(-1); setTIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };

  const { index: rotatingIndex, wordRef: rotatingWordRef, iconRef: rotatingIconRef } = useRotatingText(ROTATING_PAIRS, 3000);
  const CurrentIcon = ROTATING_PAIRS[rotatingIndex].icon;



  // Mobile: toggle a service open/closed
  const toggleService = (i: number) => {
    setExpandedServices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  // Desktop: X button closes the currently hovered accordion
  const closeHovered = () => setHoveredService(null);

  // ── GSAP animations ────────────────────────────────────────────────────────
  useGSAP(() => {
    // Hero entrance
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
      .fromTo(".hero-line", { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12 })
      .from(".hero-sub", { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(".hero-bio", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
      .fromTo(".hero-cta-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
      .from(".hero-portrait-wrapper", { opacity: 0, x: 40, duration: 1, ease: "power3.out" }, "-=0.8");

    // Marquee
    if (marqueeTrackRef.current) {
      const track = marqueeTrackRef.current;
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };

        // 100 for Mobile is comfortably slow, 35 for Desktop
        const marqueeDuration = isMobile ? 100 : 35;

        // xPercent: -50 translates exactly half of the 4 duplicate sets, seamlessly looping
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

    // Services scroll-in
    gsap.from(".service-header-element", {
      scrollTrigger: { trigger: ".services-section", start: "top 80%" },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    });
    gsap.from(".service-item", {
      scrollTrigger: { trigger: ".services-section", start: "top 70%" },
      x: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
    });

    // Testimonials scroll-in
    gsap.from(".testimonial-header", {
      scrollTrigger: { trigger: ".testimonials-section", start: "top 85%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
    });

    // CTA scroll-in
    gsap.from(".cta-heading", {
      scrollTrigger: { trigger: ".cta-section", start: "top 85%" },
      y: 80, opacity: 0, duration: 1,
    });

    if (epicHighlightRef.current) {
      gsap.fromTo(epicHighlightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".cta-section", start: "top 75%", end: "center center", scrub: 1 } }
      );
    }

    // Parallax scrub on bg-icon-parallax elements
    gsap.utils.toArray<HTMLElement>(".bg-icon-parallax").forEach((icon) => {
      gsap.to(icon, {
        y: 160,
        rotation: 28,
        ease: "none",
        scrollTrigger: {
          trigger: icon.closest("section") ?? icon.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

  }, { scope: mainRef });

  // Smooth height for testimonials
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
    <main ref={mainRef} className="relative overflow-x-clip bg-brand-light dark:bg-brand-dark selection:bg-brand-accent selection:text-brand-dark transition-colors duration-500">

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

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="min-h-screen pt-28 md:pt-32 pb-16 md:pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">

        <div className="flex-1 w-full relative z-10">
          <div className="overflow-hidden">
            <h1 className="font-outfit font-black text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tighter uppercase text-brand-ink dark:text-brand-white mb-7 sm:mb-10 lg:mb-12">
              <span className="hero-line block text-brand-ink dark:text-brand-white mb-2">Building your</span>
              <span className="hero-line flex items-center gap-3 md:gap-4 overflow-hidden py-2 -my-2">
                <span ref={rotatingWordRef} className="text-brand-ink dark:text-brand-white block">
                  {ROTATING_PAIRS[rotatingIndex].word}
                </span>
                <span ref={rotatingIconRef} className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-brand-accent rounded-[1rem] md:rounded-[1.25rem] shrink-0">
                  <CurrentIcon className="w-6 h-6 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                </span>
              </span>
            </h1>
          </div>

          <div className="hero-sub mt-6 md:mt-8">
            <p className="font-outfit text-xs md:text-base font-bold uppercase tracking-[0.25em] text-brand-ink/40 dark:text-brand-white/40">
              Full Stack Developer
            </p>
          </div>

          <div className="hero-bio mt-4 md:mt-5 max-w-lg">
            <p className="text-sm md:text-lg text-brand-ink/60 dark:text-brand-white/60 leading-relaxed font-medium">
              I&apos;m <strong className="text-brand-ink dark:text-brand-white">Gabrielle Ainshley Velasquez</strong>,
              a third-year BS Information Technology student with hands-on experience across the full stack. I enjoy turning complex ideas into structured,
              well-designed solutions. I approach every project with clarity, intention, and strong attention to detail.
            </p>
          </div>

          <div className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4 relative z-20">
            <Link href="/projects" className="hero-cta-btn group bg-brand-ink dark:bg-brand-white text-brand-white dark:text-brand-dark px-6 md:px-8 py-3.5 md:py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-xs md:text-sm inline-flex items-center gap-2 hover:opacity-85 transition-opacity duration-300">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link href="/contact" className="hero-cta-btn group border border-brand-ink/20 dark:border-brand-white/20 text-brand-ink dark:text-brand-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-xs md:text-sm inline-flex items-center gap-2 hover:bg-brand-ink/5 dark:hover:bg-brand-white/5 transition-colors duration-300">
              Contact Me
            </Link>
          </div>
        </div>

        <div className="hero-portrait-wrapper w-full lg:w-[480px] xl:w-[520px] aspect-[4/5] relative z-20 mt-8 lg:mt-0">
          <div className="w-full h-full relative rounded-[2rem] overflow-visible border border-brand-ink/15 dark:border-brand-white/10 flex bg-brand-light-alt dark:bg-brand-dark-alt">
            <div className="flex-1 relative overflow-hidden group rounded-l-[2rem]">
              <Image src="/assets/hero-photo.png" alt="Gabrielle Ainshley Velasquez" fill className="object-cover scale-[1.02] grayscale-0 lg:grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-700" priority sizes="(max-width: 768px) 100vw, 540px" />
              <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 bg-white/15 dark:bg-black/30 backdrop-blur-xl border border-white/20 rounded-xl p-3 md:p-4 flex items-center justify-between">
                <span className="font-outfit font-black text-white tracking-[0.15em] text-[10px] md:text-xs uppercase">GAV.DEV</span>
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

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — MARQUEE TAPE
          ═══════════════════════════════════════════════════════ */}
      <section ref={marqueeRef} className="bg-brand-ink/5 dark:bg-brand-white/5 py-8 md:py-20 overflow-hidden cursor-default select-none relative z-10 md:-rotate-2 md:scale-105 my-8 md:my-24 border-y border-brand-ink/10 dark:border-brand-white/10 backdrop-blur-sm">
        <div ref={marqueeTrackRef} className="marquee-track flex items-center">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center shrink-0">
              {MARQUEE_WORDS.map((word, wi) => (
                <span key={`${setIdx}-${wi}`} className="flex items-center shrink-0">
                  <span className="font-outfit font-black text-[clamp(1.5rem,4vw,5rem)] uppercase tracking-[-0.02em] text-brand-ink/40 md:text-brand-ink/20 dark:text-brand-white/40 md:dark:text-brand-white/20 hover:!text-brand-ink dark:hover:!text-brand-white px-3 md:px-8 py-2 transition-colors duration-300 whitespace-nowrap cursor-pointer">
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
          FIX: overflow-visible so bg icon is NOT clipped
          ═══════════════════════════════════════════════════════ */}
      <section className="services-section py-20 md:py-40 px-6 md:px-12 max-w-7xl mx-auto relative z-10">

        <div className="absolute top-1/2 right-[-15vw] lg:right-[-5vw] -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-12 flex items-center justify-center pointer-events-none z-0 bg-icon-parallax will-change-transform">
          <CodeSolid className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative z-10">

          <div className="lg:w-1/3 lg:sticky lg:top-40 relative z-20">
            <div className="service-header-element inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-brand-accent rounded-sm animate-pulse" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-ink/50 dark:text-brand-white/50">Capabilities</p>
            </div>
            <h2 className="service-header-element font-outfit font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-brand-ink dark:text-brand-white mb-6">
              What I <br /> Bring To <br /> The Table<span className="text-brand-accent">.</span>
            </h2>
            <p className="service-header-element text-sm md:text-base text-brand-ink/60 dark:text-brand-white/60 leading-relaxed max-w-xs font-medium">
              I don&apos;t just write code, I build scalable, well-structured systems by combining analytical thinking with refined frontend development.
            </p>

            {/* About Me button — matches hero CTA sizing */}
            <Link
              href="/about"
              className="service-header-element group mt-8 inline-flex items-center gap-2 border border-brand-ink/20 dark:border-brand-white/20 text-brand-ink dark:text-brand-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-brand-ink/5 dark:hover:bg-brand-white/5 transition-colors duration-300"
            >
              About Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

          <div className="lg:w-2/3 flex flex-col w-full mt-10 lg:mt-0 relative z-10 border-t border-brand-ink/10 dark:border-brand-white/10">
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
                      <span className={`font-mono text-sm md:text-base transition-colors duration-500 mt-1 md:mt-2 ${isActive ? "text-brand-ink dark:text-brand-white" : "text-brand-ink/30 dark:text-brand-white/30"}`}>
                        0{i + 1}
                      </span>
                      <div className="flex flex-col gap-3 md:gap-4">
                        <h3 className={`font-outfit font-black text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight transition-colors duration-500 ${isActive ? "text-brand-ink dark:text-brand-white" : "text-brand-ink/30 dark:text-brand-white/30"}`}>
                          {service.title}
                        </h3>

                        {/* Tech stack pill badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          {service.stack.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${isActive
                                ? "border-brand-ink/25 dark:border-brand-white/25 text-brand-ink dark:text-brand-white bg-brand-ink/5 dark:bg-brand-white/5"
                                : "border-brand-ink/10 dark:border-brand-white/10 text-brand-ink/40 dark:text-brand-white/40 bg-transparent"
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
                        ? "bg-brand-ink border-brand-ink text-brand-white dark:bg-brand-white dark:border-brand-white dark:text-brand-ink rotate-45"
                        : "border-brand-ink/20 text-brand-ink/40 dark:border-brand-white/20 dark:text-brand-white/40"
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
                      <p className="text-sm md:text-base lg:text-lg text-brand-ink/70 dark:text-brand-white/70 leading-relaxed max-w-lg font-medium pt-2">
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
          FIX: PersonSolid bg icon instead of MessageSolid
          ═══════════════════════════════════════════════════════ */}
      <section className="testimonials-section w-full relative z-10 border-t border-brand-ink/10 dark:border-brand-white/10 bg-white dark:bg-brand-dark overflow-hidden">

        {/* Section Grain */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
          <svg className="w-full h-full">
            <filter id="static-noise-testi">
              <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#static-noise-testi)" />
          </svg>
        </div>

        {/* FIX: Person icon replaces the message bubble */}
        <div className="bg-icon-parallax absolute top-1/2 -translate-y-1/2 right-[-10vw] sm:right-[-5vw] lg:right-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[6rem] -rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <PersonSolid className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10">

          <div className="testimonial-header mb-12 md:mb-20 text-center">
            <div className="inline-flex items-center gap-3 justify-center mb-3">
              <div className="w-2 h-2 bg-brand-accent rounded-sm animate-pulse" />
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-ink/50 dark:text-brand-white/50">Kind Words</p>
            </div>
            <h2 className="font-outfit font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.95]">
              Client <br /> Feedback<span className="text-brand-accent">.</span>
            </h2>
          </div>

          <div className="w-full max-w-4xl relative">
            <div className="absolute -top-10 left-0 md:-left-6 md:-top-20 md:-left-12 opacity-5 dark:opacity-10 pointer-events-none">
              <span className="font-serif font-black text-[120px] md:text-[200px] leading-none text-brand-ink dark:text-brand-white">&ldquo;</span>
            </div>

            <div ref={testimonialWrapperRef} className="relative z-10 overflow-hidden transition-all duration-500">
              <div className="flex flex-col justify-center px-4 md:px-12" ref={testimonialContentRef}>
                <blockquote className="testimonial-quote text-2xl md:text-4xl lg:text-5xl leading-[1.3] text-brand-ink dark:text-brand-white font-outfit font-medium mb-10 md:mb-16">
                  {TESTIMONIALS[tIndex].quote}
                </blockquote>
                <div className="testimonial-author-block flex items-center justify-between border-t border-brand-ink/10 dark:border-brand-white/10 pt-6 md:pt-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-ink/10 dark:bg-brand-white/10 flex items-center justify-center">
                      <span className="font-outfit font-black text-lg text-brand-ink dark:text-brand-white">{TESTIMONIALS[tIndex].author[0]}</span>
                    </div>
                    <div>
                      <p className="font-outfit font-bold text-sm md:text-lg uppercase tracking-wider text-brand-ink dark:text-brand-white">{TESTIMONIALS[tIndex].author}</p>
                      <p className="text-xs md:text-sm text-brand-ink/50 dark:text-brand-white/50">{TESTIMONIALS[tIndex].role}</p>
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
          SECTION 6 — CTA
          ═══════════════════════════════════════════════════════ */}
      <section className="cta-section py-32 md:py-56 px-6 md:px-12 text-center border-t border-brand-ink/5 dark:border-brand-white/5 relative z-10 bg-black/[0.02] dark:bg-white/[0.01] overflow-hidden">

        {/* Left solid lightbulb */}
        <div className="bg-icon-parallax absolute top-1/2 left-[-15vw] sm:left-[-5vw] lg:left-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] -rotate-12 flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <LightbulbSolid className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07]" />
        </div>

        {/* Right solid sparkles */}
        <div className="bg-icon-parallax absolute top-1/2 right-[-15vw] sm:right-[-5vw] lg:right-10 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-brand-ink/[0.03] dark:bg-brand-white/[0.02] rounded-[3rem] sm:rounded-[4rem] lg:rounded-[5rem] rotate-[25deg] flex items-center justify-center pointer-events-none z-0 will-change-transform">
          <SparklesSolid className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] lg:w-[200px] lg:h-[200px] text-brand-ink/[0.08] dark:text-brand-white/[0.07] -scale-x-100" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="cta-heading font-outfit font-black text-[clamp(2.8rem,8vw,8rem)] uppercase tracking-[-0.04em] leading-[0.95]">
            LET&apos;S BUILD SOMETHING{" "}
            <span className="relative inline-block mx-3 md:mx-4 mt-2 md:mt-0">
              <span
                ref={epicHighlightRef}
                className="absolute -bottom-3 md:-bottom-2 left-0 w-full h-3 md:h-4 bg-brand-accent -rotate-2 z-0 opacity-80 rounded-full"
                style={{ transform: "scaleX(0)" }}
                aria-hidden="true"
              />
              <span className="relative z-10 text-brand-ink dark:text-brand-white font-black">EPIC</span>
            </span>
            <span className="text-brand-accent ml-1 md:ml-2">.</span>
          </h2>

          <div className="mt-16 md:mt-24 flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-20">
            <Link href="/contact" aria-label="Navigate to contact page" className="group inline-flex items-center gap-2 md:gap-3 bg-brand-ink dark:bg-brand-white text-brand-white dark:text-brand-dark px-6 md:px-14 py-3.5 md:py-6 rounded-full font-outfit font-bold uppercase tracking-[0.15em] text-xs md:text-base hover:opacity-85 transition-opacity duration-300">
              Contact Me
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <Link href="/projects" aria-label="View all featured projects" className="group inline-flex items-center gap-2 md:gap-3 border border-brand-ink/20 dark:border-brand-white/20 text-brand-ink dark:text-brand-white px-6 md:px-14 py-3.5 md:py-6 rounded-full font-outfit font-bold uppercase tracking-[0.15em] text-xs md:text-base hover:bg-brand-ink/5 dark:hover:bg-brand-white/5 transition-colors duration-300">
              See My Work
            </Link>
          </div>

          <p className="mt-12 md:mt-16 text-xs md:text-sm font-medium uppercase tracking-widest text-brand-ink/40 dark:text-brand-white/40 max-w-md mx-auto px-4">
            Always open to new opportunities, collaborations, and building something meaningful.
          </p>
        </div>
      </section>


    </main>
  );
}