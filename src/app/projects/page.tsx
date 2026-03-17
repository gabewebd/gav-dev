"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ExternalLink, Github, ArrowUpRight, Mail, User, Layers, Code2 } from "lucide-react";
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
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavContainerRef = useRef<HTMLDivElement>(null);
  const desktopSidebarListRef = useRef<HTMLDivElement>(null);

  const { setActive } = useCursorStore();

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (!mobileNavContainerRef.current) return;
    const container = mobileNavContainerRef.current;
    const activeItem = container.children[activeIndex] as HTMLElement;

    if (activeItem) {
      const scrollLeft = activeItem.offsetLeft - (container.clientWidth / 2) + (activeItem.clientWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!desktopSidebarListRef.current) return;
    const container = desktopSidebarListRef.current;
    const activeItem = container.children[activeIndex] as HTMLElement;

    if (activeItem) {
      const scrollPos = activeItem.offsetTop - (container.clientHeight / 2) + (activeItem.clientHeight / 2);
      container.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  }, [activeIndex]);

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



    gsap.to(mobileNavRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".exhibition-section",
        start: "top 100px",
        endTrigger: ".cta-section",
        end: "top bottom",
        toggleActions: "play reverse play reverse"
      }
    });

    gsap.utils.toArray('.project-content-section').forEach((section: any, i) => {


      const details = section.querySelector('.project-details-reveal');
      if (details) {
        gsap.fromTo(details,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } }
        );
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(i);

            const counter = document.querySelector('.dynamic-counter');
            if (counter) counter.textContent = `0${i + 1}`;


          }
        }
      });
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


        <div
          ref={mobileNavRef}
          className="lg:hidden fixed top-[75px] sm:top-[85px] left-0 right-0 z-40 bg-[#050505] border-b border-t border-white/10 py-5 opacity-0 pointer-events-none -translate-y-2"
        >
          <div className="absolute bottom-full left-0 w-full h-[150px] bg-[#050505]" />

          <style>{`
                        .hide-nav-scroll::-webkit-scrollbar { display: none; }
                        .hide-nav-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>

          <div
            ref={mobileNavContainerRef}
            className="hide-nav-scroll flex items-center overflow-x-auto px-6 gap-8 md:gap-12 scroll-smooth relative z-10"
          >
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 whitespace-nowrap transition-all duration-500 will-change-transform ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
              >
                <span className={`text-base sm:text-lg font-mori font-black ${activeIndex === i ? 'text-white' : 'text-white'}`}>
                  0{i + 1}
                </span>
                <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeIndex === i ? 'bg-brand-accent shadow-[0_0_8px_rgba(var(--brand-accent-rgb),0.8)]' : 'bg-white/30'}`} />
                <span className={`text-4xl sm:text-5xl font-mori font-bold tracking-tight transition-colors duration-500 ${activeIndex === i ? 'text-white' : 'text-white'}`}>
                  {p.title}
                </span>
              </div>
            ))}
          </div>
        </div>

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

          <section className="exhibition-section relative w-full pb-32 md:pb-40 max-w-[95rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

            <div className="hidden lg:flex w-[25%] xl:w-[30%] sticky top-32 h-[calc(100vh-10rem)] flex-col justify-between z-30">

              <div className="flex items-start">
                <div className="text-[60px] xl:text-[70px] font-mori font-black leading-[0.8] text-white drop-shadow-2xl flex items-end">
                  <span className="dynamic-counter text-white">01</span>
                </div>
              </div>

              <div className="flex flex-col gap-8 relative pb-10 flex-1 overflow-visible">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                <div
                  ref={desktopSidebarListRef}
                  className="hide-nav-scroll flex flex-col gap-8 overflow-y-auto max-h-[calc(100vh-20rem)] py-4"
                >
                  {PROJECTS.map((p, i) => (
                    <div
                      key={i}
                      className={`nav-project-item relative pl-10 py-2 cursor-pointer transition-all duration-500 text-white will-change-transform ${activeIndex === i ? 'opacity-100 translate-x-4' : 'opacity-40 translate-x-0 scale-[0.85] origin-left'}`}
                      onMouseEnter={() => setActive(false)}
                      onClick={(e) => handleScrollTo(e, p.slug)}
                    >
                      <div className={`nav-dot absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent transition-all duration-500 shadow-[0_0_10px_rgba(var(--brand-accent-rgb),0.8)] ${activeIndex === i ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />

                      <div className={`font-mori uppercase tracking-[0.25em] font-bold text-muted mb-2 transition-all duration-500 ${activeIndex === i ? 'text-xs' : 'text-[10px]'}`}>
                        {p.tagline}
                      </div>
                      <div className={`font-mori font-bold tracking-tighter transition-all duration-500 ${activeIndex === i ? 'text-3xl xl:text-4xl' : 'text-xl xl:text-2xl'}`}>
                        {p.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[75%] xl:w-[70%] flex flex-col gap-32 md:gap-48 relative z-20 mt-16 lg:mt-0">
              {PROJECTS.map((project, index) => {

                const targetVisual = project.featuredImg || project.gallery?.[1]?.src || project.images?.[1] || project.showcaseImg || project.images?.[0] || '';

                return (
                  <div key={project.id} id={project.slug} className="project-content-section w-full flex flex-col gap-8 md:gap-14 scroll-mt-32">



                    <div
                      data-cursor-project="true"
                      className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#0A0A0A] rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] cursor-pointer lg:cursor-none group"
                      onMouseEnter={() => setActive(true)}
                      onMouseLeave={() => setActive(false)}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hidden lg:block absolute inset-0 z-20 lg:cursor-none"
                        onMouseEnter={() => setActive(true)}
                        onMouseLeave={() => setActive(false)}
                      />

                      <div className="absolute inset-[-10%] w-[120%] h-[120%]">
                        <Image
                          src={targetVisual}
                          alt={project.title}
                          fill
                          className="project-img-parallax object-cover object-center transition-transform duration-1000 group-hover:scale-[1.1]"
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          quality={100}
                        />
                      </div>

                      {/* Feathered Vignette Overlay */}
                      <div className="feather-overlay" />

                      <div className="absolute inset-0 bg-black/0 lg:group-hover:bg-black/50 transition-colors duration-700 pointer-events-none z-10" />
                    </div>

                    <div
                      className="project-details-reveal flex flex-col xl:flex-row gap-8 xl:gap-16 justify-between items-start"
                      onMouseEnter={() => setActive(false)}
                    >

                      <div className="w-full xl:w-[60%] flex flex-col gap-6">
                        <p className="text-base md:text-lg text-body leading-relaxed font-light">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {project.stack.map((tech, idx) => (
                            <div key={idx} className="px-3 md:px-3 text-center pt-1 pb-1.5 md:pt-1 md:pb-1.5 rounded-full bg-white/5 border border-white/10">
                              <span className="font-mori font-bold text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-white/90">
                                {tech}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full xl:w-[35%] flex flex-col gap-6">
                        <div className="flex flex-row xl:flex-col gap-4">
                          <Button href={project.live} target="_blank" icon={ExternalLink} iconPosition="left" className="flex-1 xl:flex-none w-full !px-0 !py-4 md:!py-5 !text-[11px] md:!text-xs !bg-white !text-black !border-transparent hover:scale-[1.02] transition-transform shadow-xl" disableMagnetic={true}>
                            Live Link
                          </Button>
                          {project.github && project.github !== "#" && (
                            <Button href={project.github} target="_blank" variant="secondary" icon={Github} iconPosition="left" className="flex-1 xl:flex-none w-full !px-0 !py-4 md:!py-5 !text-[11px] md:!text-xs !border-white/20 !text-white hover:!bg-white/10 hover:!border-white transition-all shadow-xl" disableMagnetic={true}>
                              Source
                            </Button>
                          )}
                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="lg:hidden flex items-center justify-center gap-2 group/details py-2 border-t border-white/5 pt-6"
                        >
                          <span className="text-[11px] font-mori font-bold uppercase tracking-[0.2em] text-white/80 group-hover/details:text-white transition-colors">View Project Details</span>
                          <ArrowRight className="w-4 h-4 text-white/60 group-hover/details:text-white group-hover/details:translate-x-1 transition-all" />
                        </Link>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

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