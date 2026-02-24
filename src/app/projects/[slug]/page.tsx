"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { PROJECTS_DATA, type ContentBlock, type ProjectImage } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ContentBlockRenderer({ block, onImageClick }: { block: ContentBlock, onImageClick?: (src: string) => void }) {
    switch (block.type) {
        case 'p':
            return <p className="text-base md:text-xl text-brand-ink/70 dark:text-brand-white/70 leading-relaxed font-medium mb-6">{block.text}</p>;
        case 'h2':
            return <h2 className="font-outfit font-black text-2xl md:text-3xl uppercase tracking-tighter text-brand-ink dark:text-brand-white mt-12 mb-6">{block.text}<span className="text-brand-accent">.</span></h2>;
        case 'img':
            return (
                <div className="flex flex-col gap-4 my-10 relative">
                    <div
                        className="relative w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt cursor-zoom-in group"
                        onClick={() => onImageClick && onImageClick(block.src)}
                    >
                        {/* High Quality & Sizes added to inline images */}
                        <Image src={block.src} alt={block.alt || "Project visual"} width={1200} height={800} className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700" quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw" />
                    </div>
                    {block.caption && (
                        <p className="text-sm md:text-base font-medium text-brand-ink/70 dark:text-brand-white/70 text-center px-4">
                            {block.caption}
                        </p>
                    )}
                </div>
            );
        case 'quote':
            return (
                <blockquote className="my-10 pl-6 sm:pl-8 border-l-4 border-brand-ink dark:border-brand-accent italic flex flex-col gap-4">
                    <p className="text-xl sm:text-2xl md:text-3xl font-medium text-brand-ink/80 dark:text-brand-white/80 leading-relaxed">"{block.text}"</p>
                    {block.author && <footer className="font-outfit font-bold uppercase tracking-widest text-[#111]/50 dark:text-brand-white/70 text-[10px] sm:text-xs md:text-sm">— {block.author}</footer>}
                </blockquote>
            );
        case 'video':
            // Check if the URL is an external embed (Google Drive or YouTube)
            // @ts-ignore
            const isEmbed = block.url.includes('drive.google.com') || block.url.includes('youtube.com');

            return (
                <div className="flex flex-col gap-4 my-10 relative">
                    <div className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt shadow-xl">
                        {isEmbed ? (
                            <iframe
                                // @ts-ignore
                                src={block.url}
                                className="w-full h-full absolute inset-0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <video controls className="w-full h-full object-cover">
                                {/* @ts-ignore */}
                                <source src={block.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                    {/* @ts-ignore */}
                    {block.caption && (
                        <p className="text-sm md:text-base font-medium text-brand-ink/70 dark:text-brand-white/70 text-center px-4">
                            {/* @ts-ignore */}
                            {block.caption}
                        </p>
                    )}
                </div>
            );
        case 'link-group':
            return (
                <div className="flex flex-wrap items-center gap-6 mt-4">
                    {/* @ts-ignore */}
                    {block.links.map((link: any, idx: number) => (
                        <Link
                            key={idx}
                            href={link.url}
                            target="_blank"
                            className="font-outfit font-bold text-sm md:text-base text-brand-ink dark:text-brand-white uppercase tracking-widest underline decoration-brand-ink/20 dark:decoration-brand-white/20 underline-offset-[6px] hover:decoration-brand-accent dark:hover:decoration-brand-accent transition-colors duration-300"
                        >
                            {link.label} ↗
                        </Link>
                    ))}
                </div>
            );
        default:
            return null;
    }
}

export default function ProjectDetail() {
    const { slug } = useParams();

    const projectIndex = PROJECTS_DATA.findIndex(p => p.slug === slug);
    const project = projectIndex !== -1 ? PROJECTS_DATA[projectIndex] : null;
    const prevProject = projectIndex !== -1 ? PROJECTS_DATA[(projectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length] : null;
    const nextProject = projectIndex !== -1 ? PROJECTS_DATA[(projectIndex + 1) % PROJECTS_DATA.length] : null;

    const containerRef = useRef<HTMLElement>(null);

    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

    // Build a unified array of ALL images on the page for the lightbox to cycle through
    const allImages: ProjectImage[] = [];
    if (project) {
        allImages.push(...project.gallery);

        const addImage = (src: string, alt: string, caption?: string) => {
            if (!allImages.find(img => img.src === src)) {
                allImages.push({ src, alt, caption: caption || "" });
            }
        };

        // Scan all content blocks for inline images to add to the lightbox array
        project.overview.forEach(b => { if (b.type === 'img') addImage(b.src, b.alt, b.caption); });
        project.role.forEach(b => { if (b.type === 'img') addImage(b.src, b.alt, b.caption); });
        project.customSections?.forEach(s => s.blocks.forEach(b => { if (b.type === 'img') addImage(b.src, b.alt, b.caption); }));
    }

    const handleInlineImageClick = (src: string) => {
        const index = allImages.findIndex(img => img.src === src);
        if (index !== -1) {
            setLightboxIndex(index);
        }
    };

    const nextLightbox = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null && allImages.length > 0) {
            setLightboxIndex((lightboxIndex + 1) % allImages.length);
        }
    };

    const prevLightbox = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null && allImages.length > 0) {
            setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length);
        }
    };

    useGSAP(() => {
        if (!project) return;

        gsap.fromTo(".hero-title",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5, stagger: 0.1 }
        );

        gsap.utils.toArray('.content-section').forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } }
            );
        });
    }, { scope: containerRef, dependencies: [project] });

    if (!project) return <div className="min-h-screen flex items-center justify-center font-outfit font-black text-2xl uppercase bg-brand-light dark:bg-brand-dark text-brand-ink dark:text-brand-white">System Error: Project Not Found.</div>;

    return (
        <main ref={containerRef} className="relative min-h-screen bg-brand-light dark:bg-brand-dark selection:bg-brand-accent selection:text-brand-dark transition-colors duration-500 overflow-x-clip">

            {/* ── STATIC NOISE ── */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
                <svg className="w-full h-full"><filter id="noise-slug"><feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" /></filter><rect width="100%" height="100%" filter="url(#noise-slug)" /></svg>
            </div>

            {/* ── 1. 100VH HERO IMAGE ── */}
            <section className="relative w-full h-[80vh] md:h-screen flex items-end pb-16 md:pb-24 px-6 md:px-12 bg-brand-light dark:bg-brand-dark">
                <div className="absolute inset-0 bg-brand-light dark:bg-brand-dark z-0 flex items-center justify-center overflow-hidden">
                    {/* Max quality for the primary 100vh hero image */}
                    <Image src={project.slugImg || project.heroImg} alt={project.title} fill className="object-cover object-center opacity-40 dark:opacity-50 scale-105" priority quality={100} sizes="100vw" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-light via-brand-light/80 dark:from-brand-dark dark:via-brand-dark/80 to-transparent z-10" />

                <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex flex-col">
                        <Link href="/projects" className="hero-title group inline-flex items-center gap-2 text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 transition-colors w-fit">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> Back to Projects
                        </Link>
                        <p className="hero-title text-brand-ink dark:text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">
                            {project.tagline}
                        </p>
                        <h1 className="hero-title font-outfit font-black text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter leading-none text-brand-ink dark:text-brand-white">
                            {project.title}<span className="text-brand-accent">.</span>
                        </h1>
                    </div>

                    <div className="hero-title flex flex-row flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-0">
                        {project.live !== "#" && (
                            <Link href={project.live} target="_blank" className="group bg-brand-ink dark:bg-brand-white text-brand-white dark:text-brand-ink px-6 md:px-8 py-3.5 md:py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 hover:opacity-85 transition-opacity">
                                <ExternalLink size={16} /> Live Link
                            </Link>
                        )}
                        {project.github !== "#" && (
                            <Link href={project.github} target="_blank" className="group border border-brand-ink/30 dark:border-brand-white/30 text-brand-ink dark:text-brand-white backdrop-blur-md px-6 md:px-8 py-3.5 md:py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 hover:bg-brand-ink/5 dark:hover:bg-brand-white/10 transition-colors">
                                <Github size={16} /> Source Code
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* ── 1.5. IMAGE GALLERY CAROUSEL ── */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 z-10 flex flex-col gap-6">
                    <div className="grid w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt group shadow-2xl">

                        {project.gallery.map((img, idx) => (
                            <div
                                key={idx}
                                className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${idx === activeGalleryIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                {/* High quality enabled for Gallery Slider */}
                                <Image src={img.src} alt={img.alt} width={1200} height={800} className="w-full h-auto object-contain cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-700" onClick={() => setLightboxIndex(idx)} priority={idx === 0} quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw" />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                                {img.caption && (
                                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 right-6 md:right-12">
                                        <p className="text-white text-sm md:text-lg font-medium drop-shadow-md">{img.caption}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Navigation Controls */}
                        {project.gallery.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
                                <button onClick={(e) => { e.stopPropagation(); setActiveGalleryIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length); }} className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/10 group/btn">
                                    <ChevronLeft size={24} className="group-hover/btn:-translate-x-0.5 transition-transform" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); setActiveGalleryIndex(prev => (prev + 1) % project.gallery.length); }} className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/10 group/btn">
                                    <ChevronRight size={24} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        )}

                        {/* Indicators */}
                        {project.gallery.length > 1 && (
                            <div className="absolute top-6 right-6 z-20 flex gap-2">
                                {project.gallery.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setActiveGalleryIndex(idx); }}
                                        className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === activeGalleryIndex ? 'w-6 bg-brand-accent' : 'w-2 bg-white/50 hover:bg-white'}`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── 2. STICKY EDITORIAL LAYOUT ── */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-32 flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">

                <aside className="hidden lg:flex w-1/4 flex-col gap-8 sticky top-40 h-fit">
                    <Link href="/projects" className="group inline-flex items-center gap-2 text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white text-[10px] font-bold uppercase tracking-widest transition-colors w-fit">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" /> Back to projects
                    </Link>
                    <span className="w-6 h-[2px] bg-brand-ink/30 dark:bg-brand-accent -mt-2" />
                    <nav className="flex flex-col gap-6 font-outfit font-bold uppercase tracking-widest text-xs">
                        <a href="#overview" className="text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white transition-colors">01. Overview</a>
                        <a href="#role" className="text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white transition-colors">02. Role & Impact</a>
                        <a href="#tech" className="text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white transition-colors">03. Technology</a>
                        {project.customSections?.map((section, index) => (
                            <a key={section.id} href={`#${section.id}`} className="text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white transition-colors">
                                {String(index + 4).padStart(2, '0')}. {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                <div className="w-full lg:w-3/4 flex flex-col gap-24 md:gap-32">
                    <div id="overview" className="content-section flex flex-col gap-6">
                        <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-ink dark:text-brand-white">Project Overview<span className="text-brand-accent">.</span></h2>
                        <div className="flex flex-col">
                            {project.overview.map((block, i) => (
                                <ContentBlockRenderer key={i} block={block} onImageClick={handleInlineImageClick} />
                            ))}
                        </div>
                    </div>

                    <div id="role" className="content-section flex flex-col gap-6">
                        <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-ink dark:text-brand-white">Role & Contributions<span className="text-brand-accent">.</span></h2>
                        <div className="border-l-2 border-brand-ink/20 dark:border-brand-accent pl-6 py-2">
                            {project.role.map((block, i) => (
                                <ContentBlockRenderer key={i} block={block} onImageClick={handleInlineImageClick} />
                            ))}
                        </div>
                    </div>

                    <div id="tech" className="content-section flex flex-col gap-8">
                        <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-ink dark:text-brand-white">Technology Stack<span className="text-brand-accent">.</span></h2>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-3">
                            {project.stack.map((t: string, i: number) => (
                                <div key={i} className="px-4 py-2 rounded-full border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt flex items-center justify-center transition-colors">
                                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-brand-ink dark:text-brand-white">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {project.customSections?.map((section) => (
                        <div id={section.id} key={section.id} className="content-section flex flex-col gap-6">
                            <h2 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-ink dark:text-brand-white">{section.title}<span className="text-brand-accent">.</span></h2>
                            <div className="flex flex-col">
                                {section.blocks.map((block, i) => (
                                    <ContentBlockRenderer key={i} block={block} onImageClick={handleInlineImageClick} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 3. PREV / NEXT NAVIGATION GRID ── */}
            <section className="relative border-t border-brand-ink/10 dark:border-brand-white/10 py-20 md:py-32 bg-brand-light-alt dark:bg-brand-dark-alt">
                {/* Section Static Noise Overlay */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
                    <svg className="w-full h-full"><filter id="noise-proj-nav"><feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" /></filter><rect width="100%" height="100%" filter="url(#noise-proj-nav)" /></svg>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col relative z-10">

                    <div className="flex justify-center mb-12 md:mb-16">
                        <Link href="/projects" className="group inline-flex items-center gap-3 border border-brand-ink/20 dark:border-brand-white/20 text-brand-ink dark:text-brand-white px-8 md:px-10 py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-xs hover:bg-brand-ink/5 dark:hover:bg-brand-white/5 transition-colors">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" /> Return to Projects
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {prevProject && (
                            <Link href={`/projects/${prevProject.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 block cursor-pointer shadow-xl dark:shadow-2xl">
                                {/* Next/Prev Quality Bump */}
                                <Image src={prevProject.slugImg || prevProject.heroImg} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={prevProject.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-brand-ink/60 dark:bg-brand-dark/70 transition-colors group-hover:bg-brand-ink/40 dark:group-hover:bg-brand-dark/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <ArrowLeft className="w-3.5 h-3.5 text-brand-accent group-hover:-translate-x-1.5 transition-transform" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-white/70">Previous</span>
                                    </div>
                                    <h4 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-white">{prevProject.title}<span className="text-brand-accent">.</span></h4>
                                </div>
                            </Link>
                        )}

                        {nextProject && (
                            <Link href={`/projects/${nextProject.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 block cursor-pointer shadow-xl dark:shadow-2xl">
                                {/* Next/Prev Quality Bump */}
                                <Image src={nextProject.slugImg || nextProject.heroImg} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={nextProject.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-brand-ink/60 dark:bg-brand-dark/70 transition-colors group-hover:bg-brand-ink/40 dark:group-hover:bg-brand-dark/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-white/70">Next Project</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-brand-accent group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                    <h4 className="font-outfit font-black text-3xl md:text-5xl uppercase tracking-tighter text-brand-white">{nextProject.title}<span className="text-brand-accent">.</span></h4>
                                </div>
                            </Link>
                        )}
                    </div>

                </div>
            </section>

            {/* ── 4. FULLSCREEN LIGHTBOX ── */}
            {lightboxIndex !== null && allImages[lightboxIndex] && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-ink/95 dark:bg-brand-dark/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out" onClick={() => setLightboxIndex(null)}>

                    {allImages.length > 1 && (
                        <button onClick={prevLightbox} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white hover:text-black p-3 md:p-4 rounded-full backdrop-blur-md transition-colors z-20 shadow-lg">
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                    )}

                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] rounded-[1rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        {/* 100% Quality inside Lightbox */}
                        <Image src={allImages[lightboxIndex].src} alt={allImages[lightboxIndex].alt || "Fullscreen project visual"} fill className="object-contain" quality={100} sizes="100vw" priority />

                        {allImages[lightboxIndex].caption && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-center max-w-[90%] shadow-lg">
                                <p className="text-white text-xs md:text-sm font-medium">
                                    {allImages[lightboxIndex].caption}
                                </p>
                            </div>
                        )}
                    </div>

                    {allImages.length > 1 && (
                        <button onClick={nextLightbox} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white hover:text-black p-3 md:p-4 rounded-full backdrop-blur-md transition-colors z-20 shadow-lg">
                            <ChevronRight size={24} strokeWidth={2.5} />
                        </button>
                    )}

                    <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white bg-white/10 hover:bg-brand-accent hover:text-brand-dark p-3 rounded-full backdrop-blur-md transition-colors z-20 shadow-lg" onClick={() => setLightboxIndex(null)}>
                        <X size={24} strokeWidth={2.5} />
                    </button>
                </div>
            )}

        </main>
    );
}