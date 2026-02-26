"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import HeroHeading from "@/components/ui/HeroHeading";
import { MAJOR_PROJECTS } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function MobileGallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % images.length);
  const prev = () => setIdx((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[1.5rem] overflow-hidden lg:hidden border border-brand-ink/15 dark:border-brand-white/10 shadow-lg shadow-brand-ink/[0.04] dark:shadow-none bg-brand-light-alt dark:bg-brand-dark-alt">
      {images.map((imgSrc, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image src={imgSrc} alt={`Project visual ${i + 1}`} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 0vw" priority={i === 0} quality={95} />
        </div>
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-brand-white/60 dark:bg-brand-dark-alt/60 backdrop-blur-md border border-brand-white/20 dark:border-brand-white/10 flex items-center justify-center text-brand-ink dark:text-brand-white hover:bg-brand-ink/10 transition-colors">
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full bg-brand-white/60 dark:bg-brand-dark-alt/60 backdrop-blur-md border border-brand-white/20 dark:border-brand-white/10 flex items-center justify-center text-brand-ink dark:text-brand-white hover:bg-brand-ink/10 transition-colors">
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLElement>(null);
  const epicHighlightRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-reveal",
      { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12, ease: "power4.out" }
    );
    tl.fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");
    tl.fromTo(".hero-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power4.inOut" }, "-=0.8");

    gsap.utils.toArray('.desktop-img-wrapper').forEach((wrapper: any) => {
      gsap.fromTo(wrapper,
        { clipPath: "inset(20% 0% 20% 0%)", scale: 0.95, opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: wrapper, start: "top 85%" } }
      );
    });

    gsap.utils.toArray('.project-meta').forEach((meta: any) => {
      gsap.fromTo(meta.querySelectorAll('.meta-item'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: meta, start: "top 85%" } }
      );
    });

    gsap.to('.hero-bg-icon', {
      y: 200, rotation: 15, ease: "none",
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
    });

    if (epicHighlightRef.current) {
      gsap.fromTo(epicHighlightRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".cta-section", start: "top 75%", end: "center center", scrub: 1 } }
      );
    }

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-brand-light dark:bg-brand-dark overflow-x-clip pt-28 md:pt-40 transition-colors duration-500">

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
        <svg className="w-full h-full"><filter id="noise-projects"><feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" /></filter><rect width="100%" height="100%" filter="url(#noise-projects)" /></svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ═══════════════════════════════════════════════════════
            SECTION 1 — HERO
            ═══════════════════════════════════════════════════════ */}
        <section className="hero-section mb-24 md:mb-40 relative">
          <div className="hero-bg-icon absolute top-[-5vh] right-[-10vw] lg:right-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.02]">
            <Layers className="w-full h-full text-brand-ink dark:text-brand-white" strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <SectionTag className="hero-reveal mb-6 md:mb-8">Portfolio</SectionTag>

            <HeroHeading>
              <div className="overflow-hidden py-4 -my-4 pr-8 -mr-8">
                <span className="hero-reveal inline-block pr-4">Selected</span>
              </div>
              <div className="hero-reveal flex items-center justify-start gap-3 sm:gap-5 overflow-hidden py-2 -my-2">
                <span className="text-brand-ink dark:text-brand-white">Projects<span className="text-brand-accent">.</span></span>
              </div>
            </HeroHeading>

            <p className="hero-desc text-base md:text-xl text-brand-ink/80 dark:text-brand-white/70 leading-relaxed font-medium max-w-3xl">
              A curated selection of projects that showcase my approach to full-stack development, systems design, and brand engineering. From luxury e-commerce to gamified ecology.
            </p>

            <div className="hero-divider w-full h-[1px] bg-brand-ink/20 dark:bg-brand-white/20 mt-16 md:mt-24 origin-left" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 2 — THE EXHIBITION 
            ═══════════════════════════════════════════════════════ */}
        <section className="relative w-full pb-32 md:pb-40">
          <div className="flex flex-col gap-32 md:gap-48 lg:gap-64 relative z-10">
            {MAJOR_PROJECTS.map((project, index) => {
              const projectVisuals = project.images.slice(0, 2);

              return (
                <div key={project.id} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                  {/* LEFT: Meta Data */}
                  <div className="w-full lg:w-5/12 lg:sticky lg:top-40 project-meta flex flex-col pt-4 relative">

                    <div className="absolute -top-12 -left-4 md:-top-20 md:-left-12 text-[100px] md:text-[160px] font-outfit font-black tracking-tighter text-brand-ink/[0.04] dark:text-brand-white/[0.03] pointer-events-none select-none z-0 leading-none">
                      {project.id}
                    </div>

                    <div className="relative z-10 mt-6 md:mt-0">
                      <span className="meta-item inline-block text-sm md:text-base text-brand-ink/80 dark:text-brand-white/70 mb-3 md:mb-4 uppercase tracking-widest font-bold">
                        {project.tagline}
                      </span>

                      <SectionTitle className="meta-item !text-4xl md:!text-6xl mb-6 pr-2 md:pr-4">
                        {project.title}
                      </SectionTitle>

                      <p className="meta-item text-sm md:text-base text-brand-ink/80 dark:text-brand-white/70 leading-relaxed font-medium mb-8 max-w-md">
                        {project.desc}
                      </p>

                      {/* Tech Stack Pills Update */}
                      <div className="meta-item flex flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-3 mb-10">
                        {project.stack.map((tech, idx) => (
                          <div key={idx} className="px-4 py-2 rounded-full border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt flex items-center justify-center transition-colors">
                            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-brand-ink dark:text-brand-white">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="meta-item flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                        {project.live !== "#" && (
                          <Button href={project.live} target="_blank" icon={ExternalLink} className="!px-6 md:!px-8 !py-3.5 md:!py-4 !text-[10px] md:!text-xs">
                            Live Link
                          </Button>
                        )}

                        {project.github !== "#" && (
                          <Button href={project.github} target="_blank" variant="secondary" icon={Github} className="!px-6 md:!px-8 !py-3.5 md:!py-4 !text-[10px] md:!text-xs">
                            Source Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Visuals Container */}
                  <div className="w-full lg:w-7/12 flex flex-col gap-6 md:gap-12 lg:gap-16 lg:mt-24">

                    <MobileGallery images={projectVisuals} />

                    <div className="lg:hidden mt-2 flex justify-center w-full">
                      <Link href={`/projects/${project.slug}`} className="group text-brand-ink dark:text-brand-white text-xs font-outfit font-bold uppercase tracking-widest inline-flex items-center gap-2 transition-colors py-2">
                        Project Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="hidden lg:flex flex-col gap-16 w-full">
                      {projectVisuals.map((imgSrc, imgIdx) => (
                        <Link
                          href={`/projects/${project.slug}`}
                          key={imgIdx}
                          className="desktop-img-wrapper relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-brand-ink/15 dark:border-brand-white/10 shadow-lg shadow-brand-ink/[0.04] dark:shadow-none bg-brand-light-alt dark:bg-brand-dark-alt group block cursor-pointer"
                        >
                          {/* Changed object-top to object-center and added quality={95} */}
                          <Image src={imgSrc} alt={`${project.title} Visual ${imgIdx + 1}`} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out" sizes="60vw" quality={95} />

                          <div className="absolute inset-0 bg-brand-ink/20 dark:bg-brand-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-white text-brand-dark px-8 py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-xs flex items-center gap-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-2xl z-20">
                            Project Details <ArrowRight className="w-4 h-4" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — CTA REDIRECT 
          ═══════════════════════════════════════════════════════ */}
      <section className="cta-section relative py-20 sm:py-24 md:py-32 border-t border-brand-ink/5 dark:border-brand-white/5 bg-black/[0.02] dark:bg-white/[0.01] overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center w-full">
          <h3 className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-brand-ink dark:text-brand-white mb-4 md:mb-6">
            Want to Work With{" "}
            <span className="relative inline-block">
              <span ref={epicHighlightRef} className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 bg-brand-accent -rotate-1 z-0 opacity-80 rounded-full" style={{ transform: "scaleX(0)" }} />
              <span className="relative z-10">Me</span>
            </span>?
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-brand-ink/80 dark:text-brand-white/70 mb-8 md:mb-10 max-w-xl font-medium leading-relaxed px-4">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              href="/contact"
              icon={ArrowRight}
              className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
            >
              Contact Me
            </Button>
            <Button
              href="/blog"
              variant="secondary"
              className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
            >
              Read Blogs
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
