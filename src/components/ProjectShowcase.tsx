"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import PreviewLink from "@/components/ui/PreviewLink";
import { SHOWCASE_PROJECTS as PROJECTS } from "@/data/projects";
import GridMotion from "@/components/ui/GridMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─────────────────────────────────────────────
// Shared card content — always dark, solid
// ─────────────────────────────────────────────
function CardInner({ project, index }: { project: typeof PROJECTS[0]; index: number }) {

    const getHoverGradient = (idx: number) => {
        switch (idx) {
            case 0: return "from-orange-500/80 via-amber-500/80 to-yellow-500/80";
            case 1: return "from-slate-800/90 via-zinc-900/90 to-black/90";
            case 2: return "from-emerald-400/80 via-teal-500/80 to-cyan-600/80";
            default: return "from-brand-accent/80 to-brand-ink/80";
        }
    };

    return (
        <div className="relative flex flex-col h-full rounded-2xl group/card cursor-default overflow-visible">
            {/* ── MAIN SOLID CONTAINER (always dark) ── */}
            <div className="relative z-10 flex flex-col h-full bg-[#111] border border-white/10 rounded-2xl overflow-visible">

                {/* ── DEFAULT AMBIENT GLOW (Subtle light for mockups) ── */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(191,255,0,0.03)_0%,transparent_60%)] z-[1] rounded-2xl pointer-events-none" />

                {/* ── FULL CARD HOVER GRADIENT ( sweeps entire card background ) ── */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getHoverGradient(index)} opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out z-[2] rounded-2xl`} />

                {/* ── TOP BAR (Allowed to overflow for tooltips) ── */}
                <div className="relative z-20 flex flex-row items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-5 border-b border-white/10 shrink-0">
                    <SectionTitle className="!text-xl md:!text-2xl lg:!text-3xl !text-white transition-colors duration-500">
                        {project.title}
                    </SectionTitle>
                    <PreviewLink
                        href={`/projects/${project.slug}`}
                        label="Project Details"
                        description={project.title}
                        target="_self"
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-brand-white/20 flex items-center justify-center text-brand-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-dark group-hover/card:border-white/30 group-hover/card:text-white transition-all group/link shrink-0 relative"
                    >
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover/link:-rotate-45 transition-transform" />
                    </PreviewLink>
                </div>

                {/* ── MIDDLE SECTION (Clips mockups) ── */}
                <div className="relative flex-1 flex flex-col justify-between overflow-hidden rounded-b-2xl">
                    {/* ── CONTENT TOP ── */}
                    <div className="relative z-30 px-6 pt-6 md:px-8 md:pt-8 flex flex-col gap-4">
                        <p className="text-xs md:text-sm text-brand-white/90 leading-relaxed font-medium group-hover/card:text-white transition-colors duration-500">
                            {project.desc}
                        </p>

                        {/* TECH STACK PILLS */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                            {project.stack.map((tech, idx) => (
                                <div key={idx} className="px-3 py-1.5 rounded-full border border-brand-white/10 bg-brand-dark-alt flex items-center justify-center group-hover/card:border-white/30 group-hover/card:bg-white/10 transition-colors duration-500">
                                    <span className="font-mori font-semibold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-brand-white group-hover/card:text-white transition-colors duration-500">
                                        {tech}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* BUTTONS ── */}
                        <div className="flex items-center gap-3 w-full sm:w-[90%] md:w-[85%] lg:w-[90%] xl:w-[80%]">
                            <Button
                                href={project.live}
                                target="_blank"
                                icon={ExternalLink}
                                iconPosition="left"
                                className="flex-1 !px-0 !py-3 md:!py-3.5 !text-[10px] md:!text-xs !bg-brand-white !text-brand-ink !border-transparent group-hover/card:!bg-white group-hover/card:!text-black transition-colors shadow-lg"
                            >
                                Live Link
                            </Button>
                            <Button
                                href={project.github}
                                target="_blank"
                                variant="secondary"
                                icon={Github}
                                iconPosition="left"
                                className="flex-1 !px-0 !py-3 md:!py-3.5 !text-[10px] md:!text-xs !border-brand-white/20 !text-brand-white group-hover/card:!bg-white/10 group-hover/card:!border-white/30 group-hover/card:!text-white transition-colors shadow-lg"
                            >
                                Source
                            </Button>
                        </div>
                    </div>

                    {/* ── IMAGE MOCKUP ── */}
                    <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-[110%] md:w-[95%] lg:w-[110%] xl:w-[95%] aspect-[16/10] z-10 pointer-events-none origin-bottom-right transition-transform duration-[800ms] ease-out group-hover/card:scale-105 group-hover/card:-translate-y-2 group-hover/card:-translate-x-2">
                        <div className="relative w-full h-full drop-shadow-2xl">
                            <Image
                                src={project.image}
                                alt={`${project.title} mockup preview`}
                                fill
                                className="object-contain object-bottom-right"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={100}
                                priority={index < 2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main Component — always dark
// ─────────────────────────────────────────────
export default function ProjectShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const projectBackgrounds = PROJECTS.map(p => p.bgImage);
    const gridItems = Array(12).fill(null).map((_, i) => projectBackgrounds[i % projectBackgrounds.length]);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            if (!sectionRef.current || !desktopGridRef.current || !overlayRef.current) return;
            const cards = gsap.utils.toArray<HTMLElement>(".desktop-card");
            const vh = window.innerHeight;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2500",
                    pin: true,
                    scrub: 1,
                },
            });


            tl.fromTo(cards[0], { y: vh, opacity: 0, rotation: 5, scale: 0.9 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.4);
            tl.fromTo(cards[1], { y: vh, opacity: 0, rotation: 5, scale: 0.9 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.6);
            tl.fromTo(cards[2], { y: vh, opacity: 0, rotation: 5, scale: 0.9 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.8);

            tl.fromTo(btnRef.current, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4 }, 1.0);
        });
    }, { scope: sectionRef });

    return (
        <div className="dark">
            <section
                ref={sectionRef}
                className="relative z-[60] w-full min-h-screen flex flex-col py-24 md:py-32 bg-[#0A0A0A] border-t border-white/5 overflow-hidden"
            >


                {/* ── HEADER ── */}
                <div className="w-full px-6 md:px-12 text-center z-20 mb-8 lg:mb-12 relative pointer-events-none">
                    <SectionTag className="justify-center mb-4 pointer-events-auto">Selected Work</SectionTag>
                    <SectionTitle className="drop-shadow-sm">Featured Projects</SectionTitle>
                </div>

                {/* ── BACKGROUND: GridMotion ── */}
                <div className="absolute inset-0 z-0 opacity-20 w-full h-full pointer-events-none">
                    <GridMotion items={gridItems} gradientColor="transparent" />
                </div>

                {/* ── OVERLAY ── */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-10 w-full h-full bg-[#0A0A0A]/60 pointer-events-none"
                />

                {/* ── CARDS ── */}
                <div className="relative z-30 w-full flex-1 flex flex-col justify-center">

                    {/* Desktop */}
                    <div className="hidden lg:block w-full max-w-[1750px] mx-auto px-10">
                        <div ref={desktopGridRef} className="grid grid-cols-3 gap-10">
                            {PROJECTS.map((project, i) => (
                                <div
                                    key={i}
                                    className="desktop-card relative flex flex-col h-[67vh] min-h-[540px] shadow-2xl shadow-black/40 overflow-visible rounded-2xl"
                                >
                                    <CardInner project={project} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile / Tablet */}
                    <div className="lg:hidden w-full py-4 -my-4">
                        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-6 px-6 sm:px-12 md:px-20 pb-8">
                            {PROJECTS.map((project, i) => (
                                <div key={i} className="w-[85vw] sm:w-[60vw] md:w-[45vw] shrink-0 snap-center">
                                    <div className="relative flex flex-col h-[60vh] min-h-[500px] shadow-2xl shadow-black/40 overflow-visible rounded-2xl">
                                        <CardInner project={project} index={i} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── EXPLORE BUTTON ── */}
                <div ref={btnRef} className="w-full flex flex-col items-center gap-4 mt-6 lg:mt-8 z-30 relative text-center">
                    <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-white/70">
                        Want to see more of my work?
                    </p>
                    <Button
                        href="/projects"
                        icon={ArrowRight}
                        className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm shadow-xl !bg-brand-white !text-brand-ink hover:!opacity-85"
                    >
                        Explore Projects
                    </Button>
                </div>
            </section>
        </div>
    );
}