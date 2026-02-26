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

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─────────────────────────────────────────────
// Shared card content — rendered in both mobile + desktop trees
// ─────────────────────────────────────────────
function CardInner({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
    return (
        <>
            {/* TOP BAR */}
            <div className="relative z-10 flex flex-row items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-5 border-b border-brand-ink/5 dark:border-brand-white/5 bg-brand-white dark:bg-brand-ink shrink-0 rounded-t-[2.5rem]">
                <SectionTitle className="!text-xl md:!text-2xl lg:!text-3xl">
                    {project.title}
                </SectionTitle>
                <PreviewLink
                    href={`/projects/${project.slug}`}
                    label="Project Details"
                    description={project.title}
                    target="_self"
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-brand-ink/20 dark:border-brand-white/20 flex items-center justify-center text-brand-ink dark:text-brand-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-dark dark:hover:text-brand-dark transition-all group/link shrink-0 relative"
                >
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover/link:-rotate-45 transition-transform" />
                </PreviewLink>
            </div>

            {/* MIDDLE SECTION — image fading into bottom block */}
            <div className="relative flex-1 overflow-hidden rounded-b-[2.5rem]">
                <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={100}
                        priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-brand-ink/5 mix-blend-multiply pointer-events-none" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-4 md:gap-5 pt-16 px-6 pb-6 md:px-8 md:pb-8
                    bg-gradient-to-t from-brand-light dark:from-[#0A0A0A] via-brand-light/95 dark:via-[#0A0A0A]/95 to-transparent">
                    <p className="text-xs md:text-sm text-brand-ink/80 dark:text-brand-white/90 leading-relaxed font-medium">
                        {project.desc}
                    </p>

                    {/* TECH STACK PILLS — matches projects page */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                        {project.stack.map((tech, idx) => (
                            <div key={idx} className="px-3 py-1.5 rounded-full border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt flex items-center justify-center">
                                <span className="font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-brand-ink dark:text-brand-white">
                                    {tech}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* BUTTONS — matches projects page rounded-full style */}
                    <div className="flex items-center gap-3">
                        <Button
                            href={project.live}
                            target="_blank"
                            icon={ExternalLink}
                            iconPosition="left"
                            className="flex-1 !px-0 !py-3 md:!py-3.5 !text-[10px] md:!text-xs"
                        >
                            Live Link
                        </Button>
                        <Button
                            href={project.github}
                            target="_blank"
                            variant="secondary"
                            icon={Github}
                            iconPosition="left"
                            className="flex-1 !px-0 !py-3 md:!py-3.5 !text-[10px] md:!text-xs"
                        >
                            Source
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function ProjectShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    // ── Desktop escalator animation ──
    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            if (!sectionRef.current || !desktopGridRef.current) return;
            const cards = gsap.utils.toArray<HTMLElement>(".desktop-card");
            const vh = window.innerHeight;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2200",
                    pin: true,
                    scrub: 1,
                },
            });

            tl.fromTo(cards[0], { y: vh, opacity: 0, rotation: 10, scale: 0.8 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0);
            tl.fromTo(cards[1], { y: vh, opacity: 0, rotation: 10, scale: 0.8 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.3);
            tl.fromTo(cards[2], { y: vh, opacity: 0, rotation: 10, scale: 0.8 }, { y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: "expo.out" }, 0.6);
            tl.fromTo(btnRef.current, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4 }, 0.8);
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 md:py-32 bg-black/[0.02] dark:bg-white/[0.01] border-t border-brand-ink/5 dark:border-brand-white/5 overflow-hidden"
        >

            {/* ── HEADER ── */}
            <div className="w-full px-6 md:px-12 text-center z-30 pt-10 md:pt-16 mb-8 md:mb-12 relative">
                <SectionTag className="justify-center mb-4">Selected Work</SectionTag>
                <SectionTitle>Featured Projects</SectionTitle>
            </div>

            {/* ── DESKTOP GRID (lg+) ── */}
            <div className="hidden lg:block w-full max-w-[1750px] mx-auto relative z-10 px-10">
                <div ref={desktopGridRef} className="grid grid-cols-3 gap-10">
                    {PROJECTS.map((project, i) => (
                        <div
                            key={i}
                            className="desktop-card relative flex flex-col h-[67vh] min-h-[540px] rounded-[2.5rem] border border-brand-ink/15 dark:border-brand-white/10 shadow-xl shadow-brand-ink/[0.04] dark:shadow-none bg-black/[0.02] dark:bg-[#0A0A0A] group/card"
                        >
                            <CardInner project={project} index={i} />
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MOBILE / TABLET CAROUSEL (< lg) ── */}
            <div className="lg:hidden w-full relative z-10 py-4 -my-4">
                <div
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-6 px-6 sm:px-12 md:px-20 pb-8"
                >
                    {PROJECTS.map((project, i) => (
                        <div
                            key={i}
                            className="w-[85vw] sm:w-[60vw] md:w-[45vw] shrink-0 snap-center"
                        >
                            <div className="relative flex flex-col h-[60vh] min-h-[500px] rounded-[2.5rem] border border-brand-ink/15 dark:border-brand-white/10 shadow-xl shadow-brand-ink/[0.04] dark:shadow-none bg-black/[0.02] dark:bg-[#0A0A0A] group/card">
                                <CardInner project={project} index={i} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── EXPLORE PROJECTS BUTTON — matches projects page style ── */}
            <div ref={btnRef} className="w-full flex flex-col items-center gap-4 mt-12 lg:mt-16 z-30 relative px-6 text-center">
                <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-brand-ink/80 dark:text-brand-white/70">
                    Want to see more of my work?
                </p>
                <Button
                    href="/projects"
                    icon={ArrowRight}
                    className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
                >
                    Explore Projects
                </Button>
            </div>
        </section>
    );
}
