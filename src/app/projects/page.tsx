"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Github, ArrowUpRight, Mail, User, Layers, Code2, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import HeroHeading from "@/components/ui/HeroHeading";
import Magnetic from "@/components/ui/Magnetic";
import { create } from "zustand";

import { MAJOR_PROJECTS as PROJECTS } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CursorState {
  active: boolean;
  setActive: (active: boolean) => void;
}

const useCursorStore = create<CursorState>((set) => ({
  active: false,
  setActive: (active) => set({ active }),
}));

function CustomCursor() {
  const { active, setActive } = useCursorStore();
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
      const isOver = !!el?.closest('[data-cursor-project]');
      if (lastActiveRef.current !== isOver) {
        setActive(isOver);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActive]);

  useEffect(() => {
    if (!cursorRef.current) return;

    if (active) {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [active]);

  // Ensure cursor is hidden on mount and when navigating away
  useEffect(() => {
    setActive(false);
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 0, scale: 0.5 });
    }
    return () => setActive(false);
  }, [setActive]);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:flex fixed top-0 left-0 z-[999] pointer-events-none flex-col items-center justify-center will-change-transform opacity-0 scale-50"
    >
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <ArrowUpRight className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
      </div>

      <span className="absolute top-full mt-6 text-[11px] md:text-xs font-mori font-black uppercase tracking-[0.3em] text-white whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
        View Project Details
      </span>
    </div>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const epicHighlightRef = useRef<HTMLSpanElement>(null);

  const { setActive } = useCursorStore();
 
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = PROJECTS.filter(project => {
    return selectedCategory === "All" || project.category === selectedCategory;
  });



  useGSAP(() => {
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

    const tl = gsap.timeline();

    tl.fromTo(".hero-reveal",
      { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12, ease: "power4.out" }
    );
    tl.fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");

    tl.fromTo(".hero-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power4.inOut" }, "-=0.8");

    gsap.to('.hero-bg-icon', {
      y: "80vh",
      rotation: 25,
      scale: 1.4,
      ease: "none",
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom -80%", scrub: 1 }
    });




    gsap.fromTo(".cta-section > div > *",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out", scrollTrigger: { trigger: ".cta-section", start: "top 80%" } }
    );

    if (epicHighlightRef.current) {
      gsap.fromTo(epicHighlightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".cta-section", start: "top 70%", end: "center center", scrub: 1 } }
      );
    }
  }, { scope: containerRef });

  return (
    <>
      <main ref={containerRef} className="relative overflow-x-clip pt-28 md:pt-40 pb-32 transition-colors duration-500">
        <CustomCursor />

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10">

          <section className="hero-section mb-20 md:mb-32 relative max-w-7xl mx-auto">
            <div
              className="hero-bg-icon absolute top-[-5vh] right-[-5vw] lg:right-5 w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none z-0 opacity-[0.05]"
              onMouseEnter={() => setActive(false)}
            >
              <Layers className="w-full h-full text-white" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <SectionTag className="hero-reveal mb-6 md:mb-8 !border-white/10 !bg-transparent !text-white">Selected Projects</SectionTag>

              <HeroHeading>
                <div className="overflow-hidden py-3 -my-3 pr-4 -mr-4">
                  <span className="hero-reveal inline-block pr-4 font-mori font-semibold text-white">Project</span>
                </div>
                <div className="hero-reveal flex items-center justify-start gap-4 overflow-hidden py-2 -my-2">
                  <span className="text-brand-white font-mori font-semibold">Archive</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-brand-accent rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.25rem] shrink-0">
                    <Code2 className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                  </span>
                </div>
              </HeroHeading>

              <p className="hero-desc text-base md:text-xl text-body leading-relaxed font-light max-w-2xl mt-6">
                A curated collection of full-stack systems and digital experiences, built with technical precision and a focus on long-term scalability.
              </p>

              <div className="hero-divider w-full h-[1px] bg-white/10 mt-16 md:mt-24 origin-left" />
            </div>
          </section>

          <section className="exhibition-section relative w-full pb-32 md:pb-40 max-w-7xl mx-auto z-10">
            {/* ─── Category Filters (Styled like About Page) ─── */}
            <div className="mb-12 md:mb-20 flex flex-nowrap overflow-x-auto hide-scrollbar items-center justify-center gap-3 relative z-30 pb-4 md:pb-0 py-4 px-2 -mx-2">
              {categories.map((cat, idx) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-500 font-mori font-bold text-[11px] sm:text-sm tracking-tight ${isActive
                      ? "bg-brand-accent text-brand-dark border-brand-accent"
                      : "bg-brand-white/[0.03] text-brand-white/40 border-brand-white/10 hover:border-brand-white/30 hover:text-brand-white"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* ─── Pinterest Masonry Grid ─── */}
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 space-y-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="break-inside-avoid"
                >
                    <div className="group relative bg-white/[0.03] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-brand-accent/30 transition-all duration-500 shadow-2xl">
                      <Link href={`/projects/${project.slug}`} className="block relative w-full aspect-[4/3] overflow-hidden">
                        <Image 
                          src={project.featuredImg || project.heroImg}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        {/* Category Tag */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-brand-accent">
                            {project.category}
                          </span>
                        </div>
                      </Link>

                      <div className="p-6 md:p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-mori font-bold text-2xl md:text-3xl tracking-tight text-white group-hover:text-brand-accent transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        
                        <p className="text-sm text-white/50 font-light leading-relaxed mb-6 line-clamp-3">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.stack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-mono font-medium text-white/30 uppercase tracking-wider">
                              #{tech.replace(/\s+/g, '')}
                            </span>
                          ))}
                          {project.stack.length > 3 && (
                            <span className="text-[10px] font-mono font-medium text-white/20 uppercase tracking-wider">
                              +{project.stack.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <Link 
                            href={`/projects/${project.slug}`}
                            className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 group/btn transition-all"
                          >
                            <span className="text-[11px] font-mori font-bold uppercase tracking-[0.2em] text-white">Details</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white/60 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            {project.github && project.github !== "#" && (
                              <a 
                                href={project.github} 
                                target="_blank" 
                                className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl hover:scale-105 transition-all"
                                title="Source Code"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            <a 
                              href={project.live} 
                              target="_blank" 
                              className="p-3.5 bg-brand-accent text-brand-dark rounded-2xl hover:scale-105 transition-transform"
                              title="Live Preview"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="py-32 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-2xl font-mori font-black text-white mb-2">No projects found</h3>
                <p className="text-muted font-light">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => { setSelectedCategory("All"); }}
                  className="mt-8 px-8 py-3 bg-brand-accent text-brand-dark font-mori font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>
        </div>

        <section
          className="cta-section py-20 px-6 max-w-7xl mx-auto border-t border-brand-white/10 relative z-10"
          onMouseEnter={() => setActive(false)}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
            <div className="flex-1">
              <h2 className="font-mori font-semibold text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-brand-white">
                Curious to read some <span className="text-brand-accent">insights</span>?
              </h2>
              <p className="mt-4 text-brand-white/85 max-w-xl font-light">
                Visit my blog where I share my thoughts on development, design, and technical deep dives into building modern systems.
              </p>
            </div>
            <div className="flex flex-wrap items-center lg:justify-end gap-4 w-full lg:w-auto">
              <Button href="/blog" icon={ArrowRight}>
                Read Blogs
              </Button>
              <Button href="/contact" variant="secondary">
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}