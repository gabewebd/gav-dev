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
// Shared card content — transparent background
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
            {/* ── MAIN CONTAINER (transparent background) ── */}
            <div className="relative z-10 flex flex-col h-full bg-transparent border border-white/10 rounded-2xl overflow-visible backdrop-blur-sm">

                {/* ── DEFAULT AMBIENT GLOW (Subtle light for mockups) ── */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(191,255,0,0.03)_0%,transparent_60%)] z-[1] rounded-2xl pointer-events-none" />

                {/* ── FULL CARD HOVER GRADIENT ( sweeps entire card background ) ── */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getHoverGradient(index)} opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-out z-[2] rounded-2xl`} />

                {/* ── TOP BAR (Allowed to overflow for tooltips) ── */}
                <div className="relative z-20 flex flex-row items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-5 border-b border-white/10 shrink-0">
                    <SectionTitle className="!text-xl md:!text-2xl lg:!text-3xl !text-white transition-colors duration-500 drop-shadow-md">
                        {project.title}
                    </SectionTitle>
                    <PreviewLink
                        href={`/projects/${project.slug}`}
                        label="Project Details"
                        description={project.title}
                        target="_self"
                        disableMagnetic={true}
                        className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-brand-white/20 flex items-center justify-center text-brand-white hover:bg-brand-accent hover:border-brand-accent hover:text-brand-dark group-hover/card:border-white/30 group-hover/card:text-white transition-all group/link shrink-0 relative shadow-lg"
                    >
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover/link:-rotate-45 transition-transform" />
                    </PreviewLink>
                </div>

                {/* ── MIDDLE SECTION (Clips mockups) ── */}
                <div className="relative flex-1 flex flex-col justify-between overflow-hidden rounded-b-2xl">
                    {/* ── CONTENT TOP ── */}
                    <div className="relative z-30 px-6 pt-6 md:px-8 pt-8 flex flex-col gap-4">
                        <p className="text-xs md:text-sm text-brand-white/90 leading-relaxed font-medium group-hover/card:text-white transition-colors duration-500 drop-shadow-md">
                            {project.desc}
                        </p>

                        {/* TECH STACK PILLS */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                            {project.stack.map((tech, idx) => (
                                <div key={idx} className="px-3 py-1.5 rounded-full border border-brand-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover/card:border-white/40 group-hover/card:bg-black/20 transition-all duration-500">
                                    <span className="font-mori font-bold text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-brand-white group-hover/card:text-white transition-colors duration-500 drop-shadow-sm">
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
                                disableMagnetic={true}
                            >
                                Live Link
                            </Button>
                            <Button
                                href={project.github}
                                target="_blank"
                                variant="secondary"
                                icon={Github}
                                iconPosition="left"
                                className="flex-1 !px-0 !py-3 md:!py-3.5 !text-[10px] md:!text-xs !border-brand-white/30 !text-brand-white group-hover/card:!bg-white/10 group-hover/card:!border-white/50 group-hover/card:!text-white transition-colors shadow-lg backdrop-blur-md"
                                disableMagnetic={true}
                            >
                                Source
                            </Button>
                        </div>
                    </div>

                    {/* ── IMAGE MOCKUP ── */}
                    <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-[110%] md:w-[95%] lg:w-[110%] xl:w-[95%] aspect-[16/10] z-10 pointer-events-none origin-bottom-right transition-transform duration-[800ms] ease-out group-hover/card:scale-105 group-hover/card:-translate-y-2 group-hover/card:-translate-x-2">
                        <div className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
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
// Main Component — transparent backgrounds
// ─────────────────────────────────────────────
export default function ProjectShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const desktopGridRef = useRef<HTMLDivElement>(null);
    const mobileContainerRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // ── DESKTOP (≥1024px): pinned scroll with 3-card flip-in ──
        mm.add("(min-width: 1024px)", () => {
            if (!sectionRef.current || !desktopGridRef.current) return;
            const cards = gsap.utils.toArray<HTMLElement>(".desktop-card");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    // Tightened from +=2500 → +=1400 so the pin releases
                    // right after the last card finishes animating in,
                    // eliminating the dead-scroll pause at the end.
                    end: "+=1400",
                    pin: true,
                    // Reduced scrub lag (was 1) so the animation tracks
                    // scroll more closely and doesn't "hang" at the end.
                    scrub: 0.6,
                },
            });

            // Set a strong perspective to give the flip genuine 3D depth
            gsap.set(desktopGridRef.current, { perspective: 2000 });

            // Card 1: Flips in like a trading card
            tl.fromTo(cards[0],
                { opacity: 0, rotationY: 100, z: -300, scale: 0.8 },
                { opacity: 1, rotationY: 0, z: 0, scale: 1, duration: 1.4, ease: "expo.out" },
                0.2
            );

            // Card 2: Flips in like a trading card
            tl.fromTo(cards[1],
                { opacity: 0, rotationY: 100, z: -300, scale: 0.8 },
                { opacity: 1, rotationY: 0, z: 0, scale: 1, duration: 1.4, ease: "expo.out" },
                0.4
            );

            // Card 3: Flips in like a trading card
            tl.fromTo(cards[2],
                { opacity: 0, rotationY: 100, z: -300, scale: 0.8 },
                { opacity: 1, rotationY: 0, z: 0, scale: 1, duration: 1.4, ease: "expo.out" },
                0.6
            );

            tl.fromTo(btnRef.current, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4 }, 1.0);
        });

        // ── MOBILE / TABLET (<1024px): vertical stack, per-card ScrollTrigger flip-in ──
        mm.add("(max-width: 1023px)", () => {
            if (!mobileContainerRef.current) return;

            // Perspective on the container for true 3D depth on each card
            gsap.set(mobileContainerRef.current, { perspective: 2000 });

            const cards = gsap.utils.toArray<HTMLElement>(".mobile-card");

            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, rotationY: 90, z: -250, scale: 0.85 },
                    {
                        opacity: 1,
                        rotationY: 0,
                        z: 0,
                        scale: 1,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: card,
                            // Starts flipping as soon as the card's top edge
                            // crosses 88% down the viewport
                            start: "top 88%",
                            // Fully settled by the time the top edge hits 30%
                            end: "top 30%",
                            scrub: 0.6,
                        },
                    }
                );
            });

            // Button fades up after last card
            if (btnRef.current) {
                gsap.fromTo(
                    btnRef.current,
                    { y: 40, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        scrollTrigger: {
                            trigger: btnRef.current,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 0.6,
                        },
                    }
                );
            }
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative z-[60] w-full min-h-screen flex flex-col py-24 md:py-32 bg-transparent border-t border-white/5 overflow-hidden"
        >

                {/* ── HEADER ── */}
                <div className="w-full px-6 md:px-12 text-center z-20 mb-8 lg:mb-12 relative pointer-events-none">
                    <SectionTag className="justify-center mb-4 pointer-events-auto backdrop-blur-sm bg-black/20 border-white/20 text-white">Selected Work</SectionTag>
                    <SectionTitle className="drop-shadow-lg text-white">Featured Projects</SectionTitle>
                </div>

                {/* ── CARDS ── */}
                <div className="relative z-30 w-full flex-1 flex flex-col justify-center">

                    {/* Desktop */}
                    <div className="hidden lg:block w-full max-w-[1750px] mx-auto px-10">
                        <div ref={desktopGridRef} className="grid grid-cols-3 gap-10">
                            {PROJECTS.map((project, i) => (
                                <div
                                    key={i}
                                    className="desktop-card relative flex flex-col h-[67vh] min-h-[540px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-visible rounded-2xl"
                                >
                                    <CardInner project={project} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile / Tablet — vertical, scroll-triggered flip (no carousel) */}
                    <div
                        ref={mobileContainerRef}
                        className="lg:hidden w-full flex flex-col gap-8 px-6 sm:px-12 md:px-20 py-4"
                    >
                        {PROJECTS.map((project, i) => (
                            <div
                                key={i}
                                className="mobile-card relative flex flex-col h-[60vh] min-h-[500px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-visible rounded-2xl"
                            >
                                <CardInner project={project} index={i} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── EXPLORE BUTTON ── */}
                <div ref={btnRef} className="w-full flex flex-col items-center gap-4 mt-6 lg:mt-8 z-30 relative text-center">
                    <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/90 drop-shadow-md">
                        Want to see more of my work?
                    </p>
                    <Button
                        href="/projects"
                        icon={ArrowRight}
                        className="!px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm shadow-[0_20px_40px_rgba(0,0,0,0.4)] !bg-white !text-black hover:!opacity-85 transition-all"
                    >
                        Explore Projects
                    </Button>
                </div>
            </section>
        );
}