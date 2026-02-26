"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    FileDown,
    Mail,
    Github,
    Linkedin,
    FileText,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ResumePage() {
    const mainRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero reveal — clipPath animation matching other pages
        tl.fromTo(".hero-reveal",
            { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
            { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12, ease: "power4.out" }
        );
        tl.fromTo(".hero-desc",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "-=0.5"
        );
        tl.fromTo(".hero-divider",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.5, ease: "power4.inOut" },
            "-=0.8"
        );

        // Parallax on hero background icon
        gsap.to('.hero-bg-icon', {
            y: 200, rotation: -15, ease: "none",
            scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
        });

    }, { scope: mainRef });

    return (
        <main ref={mainRef} className="relative min-h-screen bg-brand-light dark:bg-brand-dark overflow-x-clip pt-28 md:pt-40 pb-32 transition-colors duration-500">

            {/* ── STATIC NOISE ── */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
                <svg className="w-full h-full">
                    <filter id="static-noise-resume">
                        <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#static-noise-resume)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* ═══════════════════════════════════════════════════════
                    HERO SECTION
                    ═══════════════════════════════════════════════════════ */}
                <header className="hero-section mb-20 md:mb-32 relative">
                    {/* Scroll-triggered SVG background — line-style file icon like blog/projects */}
                    <div className="hero-bg-icon absolute top-[-5vh] right-[-10vw] lg:right-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.02]">
                        <FileText className="w-full h-full text-brand-ink dark:text-brand-white" strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <div className="hero-reveal inline-flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-2 h-2 bg-brand-accent rounded-sm animate-pulse" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-ink/80 dark:text-brand-white/70">Work Experience</span>
                        </div>

                        <h1 className="font-outfit font-black text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tighter uppercase text-brand-ink dark:text-brand-white mb-8 lg:mb-12">
                            <div className="overflow-hidden py-3 -my-3 pr-4 -mr-4"><span className="hero-reveal inline-block">Professional</span></div>
                            <div className="overflow-hidden py-3 -my-3 pr-4 -mr-4"><span className="hero-reveal inline-block">Resume<span className="text-brand-accent">.</span></span></div>
                        </h1>

                        <p className="hero-desc text-base md:text-xl text-brand-ink/80 dark:text-brand-white/70 leading-relaxed font-medium max-w-2xl mb-10 md:mb-12">
                            I’m a Full-Stack Developer who loves building thoughtful digital products — from solid, scalable systems behind the scenes to immersive, memorable experiences on the surface.
                        </p>

                        <div className="hero-desc flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6">
                            <a href="/assets/gav-resume.pdf" target="_blank" rel="noopener noreferrer" className="group w-full sm:w-auto justify-center inline-flex items-center gap-3 bg-brand-ink dark:bg-brand-white text-brand-light dark:text-brand-dark px-8 md:px-10 py-4 md:py-5 rounded-full font-outfit font-bold uppercase tracking-[0.15em] text-[10px] sm:text-[11px] md:text-sm hover:opacity-85 transition-opacity duration-300">
                                <FileDown className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" /> View PDF
                            </a>

                            {/* Compact Contact Links */}
                            <div className="flex flex-wrap items-center gap-3">
                                <a href="https://github.com/gabewebd" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-ink/20 dark:border-brand-white/20 flex items-center justify-center text-brand-ink/80 dark:text-brand-white/70 hover:bg-brand-ink hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-ink transition-colors">
                                    <Github className="w-4 h-4 md:w-5 md:h-5" />
                                </a>
                                <a href="https://linkedin.com/in/gabrielle-velasquez-gav" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-ink/20 dark:border-brand-white/20 flex items-center justify-center text-brand-ink/80 dark:text-brand-white/70 hover:bg-brand-ink hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-ink transition-colors">
                                    <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                                </a>
                                <a href="mailto:vlsqz.gabrielle@gmail.com" className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-brand-ink/20 dark:border-brand-white/20 flex items-center justify-center text-brand-ink/80 dark:text-brand-white/70 hover:bg-brand-ink hover:text-brand-white dark:hover:bg-brand-white dark:hover:text-brand-ink transition-colors">
                                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                                </a>
                            </div>
                        </div>

                        <div className="hero-divider w-full h-[1px] bg-brand-ink/20 dark:bg-brand-white/20 mt-16 md:mt-24 origin-left" />
                    </div>
                </header>

            </div>
        </main>
    );
}
