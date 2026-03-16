"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import PreviewLink from "@/components/ui/PreviewLink";
import Button from "@/components/ui/Button";
import GridMotion from "@/components/ui/GridMotion";

import { PROJECTS_DATA, type ContentBlock, type ProjectImage } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ContentBlockRenderer({ block, onImageClick }: { block: ContentBlock, onImageClick?: (src: string) => void }) {
    switch (block.type) {
        case 'p':
            return <p className="text-base md:text-xl text-brand-white/70 leading-relaxed font-medium mb-6">{block.text}</p>;
        case 'role-title':
            return (
                <div className="mb-8">
                    <h3 className="font-bold text-brand-white text-xl md:text-2xl inline-block">
                        {block.text}
                    </h3>
                </div>
            );
        case 'h2':
            return <h2 className="font-mori font-semibold text-2xl md:text-3xl tracking-tighter text-brand-white mt-12 mb-6">{block.text}</h2>;
        case 'img':
            return (
                <div className="flex flex-col gap-4 my-10 relative">
                    <div
                        className="relative w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-brand-white/10 bg-brand-dark-alt cursor-zoom-in group"
                        onClick={() => onImageClick && onImageClick(block.src)}
                    >
                        {/* High Quality & Sizes added to inline images */}
                        <Image src={block.src} alt={block.alt || "Project visual"} width={1200} height={800} className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700" quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />
                    </div>
                    {block.caption && (
                        <p className="text-sm md:text-base font-medium text-brand-white/90 text-center px-4">
                            {block.caption}
                        </p>
                    )}
                </div>
            );
        case 'quote':
            return (
                <blockquote className="my-10 pl-6 sm:pl-8 border-l-4 border-brand-accent italic flex flex-col gap-4">
                    <p className="text-xl sm:text-2xl md:text-3xl font-medium text-brand-white/70 leading-relaxed">"{block.text}"</p>
                    {block.author && <footer className="font-mori font-bold uppercase tracking-widest text-brand-white/70 text-[10px] sm:text-xs md:text-sm">— {block.author}</footer>}
                </blockquote>
            );
        case 'video':
            // Check if the URL is an external embed (Google Drive or YouTube)
            // @ts-ignore
            const isEmbed = block.url.includes('drive.google.com') || block.url.includes('youtube.com');

            return (
                <div className="flex flex-col gap-4 my-10 relative">
                    <div className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-brand-white/10 bg-brand-dark-alt shadow-xl">
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
                        <p className="text-sm md:text-base font-medium text-brand-white/90 text-center px-4">
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
                        <PreviewLink
                            key={idx}
                            href={link.url}
                            label="Project Link"
                            description={link.url}
                            className="font-mori font-bold text-sm md:text-base text-brand-white uppercase tracking-widest underline decoration-brand-white/20 underline-offset-[6px] hover:decoration-brand-accent transition-colors duration-300"
                        >
                            {link.label} ↗
                        </PreviewLink>
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

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
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

    if (!project) return <div className="min-h-screen flex items-center justify-center font-mori font-black text-2xl uppercase bg-brand-dark text-brand-white">System Error: Project Not Found.</div>;

    const gridItems = [
        ...(project.gallery?.map(img => img.src) || []),
        project.slugImg,
        project.heroImg
    ].filter(Boolean) as string[];

    return (
        <main ref={containerRef} className="relative overflow-x-clip pb-32 transition-colors duration-500 min-h-screen">


            {/* ── 1. 100VH HERO IMAGE ── */}
            <section className="relative w-full h-[60vh] md:h-screen flex items-end pb-16 md:pb-24 px-6 md:px-12">
                <div className="absolute inset-0 z-0 opacity-10 md:opacity-25">
                    <GridMotion items={gridItems} gradientColor="transparent" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />

                <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex flex-col">
                        <Link href="/projects" className="hero-title group inline-flex items-center gap-2 text-white/70 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 transition-colors w-fit drop-shadow-md">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> Back to Projects
                        </Link>
                        <p className="hero-title text-brand-accent font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 drop-shadow-md">
                            {project.tagline}
                        </p>
                        <h1 className="hero-title font-mori font-semibold text-5xl md:text-7xl lg:text-[8rem] tracking-tighter leading-none text-white drop-shadow-lg">
                            {project.title}
                        </h1>
                        <p className="hero-title text-brand-white/70 font-mori font-bold uppercase tracking-[0.2em] text-[11px] md:text-sm mt-4 md:mt-6 drop-shadow-md">
                            {project.projectRole}
                        </p>
                    </div>

                    <div className="hero-title flex flex-row flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-0">
                        {project.live !== "#" && (
                            <PreviewLink href={project.live} label="External Link" description={project.live} className="hero-title" disableMagnetic={true}>
                                <div className="group bg-brand-white text-brand-dark px-6 md:px-8 py-3.5 md:py-4 rounded-full font-mori font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 hover:opacity-85 transition-opacity shadow-lg">
                                    <ExternalLink size={16} /> Live Link
                                </div>
                            </PreviewLink>
                        )}
                        {project.github && project.github !== "#" && (
                            <PreviewLink href={project.github} label="Repository" description={project.github} className="hero-title" disableMagnetic={true}>
                                <div className="group border border-white/30 text-white backdrop-blur-md px-6 md:px-8 py-3.5 md:py-4 rounded-full font-mori font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2 hover:bg-white/10 transition-colors shadow-lg">
                                    <Github size={16} /> Source Code
                                </div>
                            </PreviewLink>
                        )}
                    </div>
                </div>
            </section>

            {/* ── 1.5. IMAGE GALLERY CAROUSEL ── */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="relative w-full max-w-5xl mx-auto px-6 md:px-12 pt-16 md:pt-24 z-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-6 sm:gap-8">
                        <div className="relative grid w-full aspect-[16/10] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-brand-white/10 bg-brand-dark-alt group shadow-xl">

                            {project.gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${idx === activeGalleryIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    {/* High quality enabled for Gallery Slider with fixed aspect ratio */}
                                    <Image src={img.src} alt={img.alt} fill className="object-cover cursor-zoom-in transition-transform duration-700 hover:scale-[1.01]" onClick={() => setLightboxIndex(idx)} priority={idx === 0} quality={95} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />
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

                        {/* Unified Gallery Captions - Below the gallery for all devices */}
                        {project.gallery[activeGalleryIndex]?.caption && (
                            <div className="px-2 text-center md:text-left">
                                <p className="text-brand-white/50 text-xs sm:text-sm font-medium italic leading-relaxed tracking-wide">
                                    {project.gallery[activeGalleryIndex].caption}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── 2. STICKY EDITORIAL LAYOUT ── */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-32 flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">

                <aside className="hidden lg:flex w-1/4 flex-col gap-8 sticky top-40 h-fit">
                    <Link href="/projects" className="group inline-flex items-center gap-2 text-brand-white/70 hover:text-brand-white text-[10px] font-bold uppercase tracking-widest transition-colors w-fit">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" /> Back to projects
                    </Link>
                    <span className="w-6 h-[2px] bg-brand-accent -mt-2" />
                    <nav className="flex flex-col gap-6 font-mori font-bold uppercase tracking-widest text-xs">
                        <a href="#overview" onClick={(e) => handleScrollTo(e, "overview")} className="text-brand-white/70 hover:text-brand-white transition-colors">01. Overview</a>
                        <a href="#role" onClick={(e) => handleScrollTo(e, "role")} className="text-brand-white/70 hover:text-brand-white transition-colors">02. Role & Impact</a>
                        <a href="#tech" onClick={(e) => handleScrollTo(e, "tech")} className="text-brand-white/70 hover:text-brand-white transition-colors">03. Technology</a>
                        {project.customSections?.map((section, index) => (
                            <a key={section.id} href={`#${section.id}`} onClick={(e) => handleScrollTo(e, section.id)} className="text-brand-white/70 hover:text-brand-white transition-colors">
                                {String(index + 4).padStart(2, '0')}. {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                <div className="w-full lg:w-3/4 flex flex-col gap-24 md:gap-32">
                    <div id="overview" className="content-section flex flex-col gap-6 scroll-mt-32">
                        <h2 className="font-mori font-semibold text-3xl md:text-5xl tracking-tighter text-brand-white">Project Overview</h2>
                        <div className="flex flex-col">
                            {project.overview.map((block, i) => (
                                <ContentBlockRenderer key={i} block={block} onImageClick={handleInlineImageClick} />
                            ))}
                        </div>
                    </div>

                    <div id="role" className="content-section flex flex-col gap-6 scroll-mt-32">
                        <h2 className="font-mori font-semibold text-3xl md:text-5xl tracking-tighter text-brand-white">Role & Contributions</h2>
                        <div className="border-l-2 border-brand-accent pl-6 py-2">
                            {project.role.map((block, i) => (
                                <ContentBlockRenderer key={i} block={block} onImageClick={handleInlineImageClick} />
                            ))}
                        </div>
                    </div>

                    <div id="tech" className="content-section flex flex-col gap-8 scroll-mt-32">
                        <h2 className="font-mori font-semibold text-3xl md:text-5xl tracking-tighter text-brand-white">Technology Stack</h2>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 md:gap-x-3">
                            {project.stack.map((t: string, i: number) => (
                                <div key={i} className="px-4 py-2 rounded-full border border-brand-white/10 bg-brand-dark-alt flex items-center justify-center transition-colors">
                                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-brand-white">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {project.customSections?.map((section) => (
                        <div id={section.id} key={section.id} className="content-section flex flex-col gap-6 scroll-mt-32">
                            <h2 className="font-mori font-semibold text-3xl md:text-5xl tracking-tighter text-brand-white">
                                {section.title}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {section.blocks.map((block, i) => {
                                    // HANDLE THE NEW ITALIC BLOCK TYPE HERE
                                    if (block.type === 'italic') {
                                        return (
                                            <p key={i} className="text-brand-white/50 italic text-sm md:text-base leading-relaxed">
                                                {block.text}
                                            </p>
                                        );
                                    }

                                    return <ContentBlockRenderer key={i} block={block} onImageClick={handleInlineImageClick} />;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 3. PREV / NEXT NAVIGATION GRID ── */}
            <section className="relative border-t border-brand-white/10 py-20 md:py-32">
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col relative z-10">
                    <div className="flex justify-center mb-12 md:mb-20">
                        <Link href="/projects" className="group inline-flex items-center gap-3 bg-brand-white text-brand-dark px-8 md:px-12 py-4 md:py-5 rounded-full font-mori font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:scale-105 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-xl">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} /> Return to Projects
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {prevProject && (
                            <Link href={`/projects/${prevProject.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden border border-brand-white/10 block cursor-pointer shadow-lg hover:border-brand-white/20 transition-all duration-500 w-full">
                                <Image src={prevProject.featuredImg} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={prevProject.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-[#0A0A0A]/70 group-hover:bg-[#0A0A0A]/50 transition-colors duration-500 z-10" />
                                <div className="relative h-full w-full flex flex-col justify-end p-8 md:p-12 z-20">
                                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-brand-accent font-bold uppercase tracking-widest mb-4">
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" strokeWidth={3} />
                                        Previous Project
                                    </div>
                                    <h4 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-white leading-[1.1] drop-shadow-md line-clamp-2">
                                        {prevProject.title}
                                    </h4>
                                </div>
                            </Link>
                        )}

                        {nextProject && (
                            <Link href={`/projects/${nextProject.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden border border-brand-white/10 block cursor-pointer shadow-lg hover:border-brand-white/20 transition-all duration-500 w-full">
                                <Image src={nextProject.featuredImg} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt={nextProject.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-[#0A0A0A]/70 group-hover:bg-[#0A0A0A]/50 transition-colors duration-500 z-10" />
                                <div className="relative h-full w-full flex flex-col items-end justify-end p-8 md:p-12 text-right z-20">
                                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-brand-accent font-bold uppercase tracking-widest mb-4">
                                        Next Project
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />
                                    </div>
                                    <h4 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-white leading-[1.1] drop-shadow-md line-clamp-2">
                                        {nextProject.title}
                                    </h4>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* ── 4. FULLSCREEN LIGHTBOX ── */}
            {lightboxIndex !== null && allImages[lightboxIndex] && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out" onClick={() => setLightboxIndex(null)}>

                    {allImages.length > 1 && (
                        <button onClick={prevLightbox} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white hover:text-black p-3 md:p-4 rounded-full backdrop-blur-md transition-colors z-20 shadow-lg">
                            <ChevronLeft size={24} strokeWidth={2.5} />
                        </button>
                    )}

                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] rounded-[1rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
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