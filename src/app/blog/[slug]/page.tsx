"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { BLOG_POSTS, BLOG_CONTENT } from "@/data/blog";
import PreviewLink from "@/components/ui/PreviewLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── HELPER: PARSE MARKDOWN LINKS IN TEXT ───
function renderTextWithLinks(text: string) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        const label = match[1];
        const url = match[2];
        const isInternal = url.startsWith('/');

        parts.push(
            <PreviewLink
                key={match.index}
                href={url}
                label={isInternal ? "Internal Link" : "External Link"}
                description={label}
                className="font-bold underline decoration-brand-white/30 underline-offset-4 hover:decoration-brand-accent hover:text-brand-accent transition-colors"
            >
                {label}
            </PreviewLink>
        );
        lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}

export default function BlogPost() {
    const { slug } = useParams();
    const containerRef = useRef<HTMLElement>(null);

    const [lightboxImg, setLightboxImg] = useState<string | null>(null);

    const postIndex = BLOG_POSTS.findIndex(p => p.slug === slug);
    const post = postIndex !== -1 ? BLOG_POSTS[postIndex] : null;
    const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
    const nextPost = postIndex !== -1 && postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;
    const content = typeof slug === 'string' ? BLOG_CONTENT[slug] : [];

    useGSAP(() => {
        if (!post) return;

        // 1. Reading Progress Bar
        gsap.to(".reading-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
            }
        });

        // 2. Staggered Hero Reveal
        gsap.fromTo(".hero-reveal",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
        );

        // 3. Image Parallax inside Hero
        gsap.fromTo(".hero-image-parallax",
            { y: -30, scale: 1.05 },
            {
                y: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-image-container",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // 4. Content Block Fade-ups
        gsap.utils.toArray('.content-block').forEach((block: any) => {
            gsap.fromTo(block,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: block, start: "top 85%" } }
            );
        });

    }, { scope: containerRef, dependencies: [post] });

    if (!post) return <div className="min-h-screen flex items-center justify-center font-mori font-black text-2xl uppercase bg-brand-dark text-brand-white">Error: Article Not Found.</div>;

    return (
        <main ref={containerRef} className="relative transition-colors duration-500 overflow-x-clip min-h-screen">

            {/* ── 0. READING PROGRESS BAR ── */}
            <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent pointer-events-none">
                <div className="reading-progress w-full h-full bg-brand-accent origin-left scale-x-0" />
            </div>

            {/* ── 1. ASYMMETRICAL EDITORIAL HERO ── */}
            <header className="relative w-full pt-28 md:pt-40 mb-16 md:mb-24">

                {/* Top Section: Back Link & Massive Title */}
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col items-start mb-12 md:mb-20">
                    <Link href="/blog" className="hero-reveal group inline-flex items-center gap-2 text-white/50 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> Back to Blogs
                    </Link>

                    <h1 className="hero-reveal font-mori font-black text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] tracking-tighter text-white max-w-6xl">
                        {post.title}
                    </h1>
                </div>

                {/* Split Layout: Meta/Excerpt (Sticky) + Hero Image */}
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left Column: Sticky Meta & Excerpt */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-8 order-2 lg:order-1">
                        <div className="hero-reveal flex flex-col gap-4 border-l-2 border-white/10 pl-6 py-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Category</span>
                                <span className="text-sm font-semibold tracking-wider text-brand-accent uppercase">{post.category}</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Published</span>
                                <time dateTime={post.date} className="text-sm font-medium text-white/80">{post.displayDate}</time>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Read Time</span>
                                <span className="text-sm font-medium text-white/80">{post.readTime}</span>
                            </div>
                        </div>

                        <p className="hero-reveal text-lg md:text-xl lg:text-2xl text-white/60 leading-relaxed font-medium">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Right Column: Parallax Hero Image */}
                    <div className="w-full lg:w-2/3 order-1 lg:order-2">
                        <div
                            className="hero-reveal hero-image-container relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/5 cursor-zoom-in group shadow-2xl"
                            onClick={() => setLightboxImg(post.featuredImage)}
                        >
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="hero-image-parallax object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                priority
                                sizes="(max-width: 1024px) 100vw, 66vw"
                                quality={100}
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </header>

            {/* ── 2. DYNAMIC CONTENT ENGINE ── */}
            <article className="relative z-10 w-full max-w-3xl mx-auto px-6 md:px-12 pb-24 md:pb-40">
                <div className="flex flex-col gap-8 md:gap-12">
                    {content.map((block, i) => {
                        switch (block.type) {
                            case 'p':
                                return (
                                    <div key={i} className="content-block text-lg md:text-xl text-brand-white/70 leading-[1.8] font-medium">
                                        {renderTextWithLinks(block.text)}
                                    </div>
                                );
                            case 'h2':
                                return (
                                    <h2 key={i} className="content-block font-mori font-bold text-3xl md:text-5xl tracking-tighter text-brand-white mt-12 md:mt-16 mb-4">
                                        {block.text}
                                    </h2>
                                );
                            case 'quote':
                                return (
                                    // Breakout Blockquote
                                    <blockquote key={i} className="content-block relative w-full md:w-[120%] md:-ml-[10%] my-12 md:my-16 p-8 md:p-16 bg-white/[0.03] rounded-[2rem] border border-white/5">
                                        <p className="font-mori font-bold text-2xl md:text-4xl tracking-tight text-brand-white leading-[1.2] mb-6">
                                            "{block.text}"
                                        </p>
                                        {block.author && (
                                            <footer className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
                                                — {block.author}
                                            </footer>
                                        )}
                                    </blockquote>
                                );
                            case 'img':
                                return (
                                    // Breakout Image Container
                                    <figure key={i} className="content-block my-12 md:my-16 w-full md:w-[110%] md:-ml-[5%] flex flex-col gap-4">
                                        <div
                                            className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white/5 border border-brand-white/10 cursor-zoom-in group shadow-xl"
                                            onClick={() => setLightboxImg(block.src)}
                                        >
                                            <Image src={block.src} alt={block.alt} width={1200} height={800} className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, 900px" quality={95} />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>
                                        {block.caption && (
                                            <figcaption className="text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-white/50">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'video':
                                // @ts-ignore
                                const isEmbed = block.url.includes('drive.google.com') || block.url.includes('youtube.com');
                                return (
                                    <figure key={i} className="content-block my-12 md:my-16 w-full md:w-[110%] md:-ml-[5%] flex flex-col gap-4">
                                        <div className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white/5 border border-brand-white/10 shadow-2xl">
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
                                            <figcaption className="text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-white/50">
                                                {/* @ts-ignore */}
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'link-group':
                                return (
                                    <div key={i} className="content-block flex flex-wrap items-center gap-4 md:gap-6 mt-8 mb-12 p-6 md:p-8 bg-white/[0.02] rounded-2xl border border-white/5">
                                        <span className="w-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Project Resources</span>
                                        {/* @ts-ignore */}
                                        {block.links.map((link: any, idx: number) => {
                                            const isInternal = link.url.startsWith('/');
                                            return (
                                                <PreviewLink
                                                    key={idx}
                                                    href={link.url}
                                                    label={isInternal ? "Internal Link" : "External Link"}
                                                    description={link.label}
                                                    className="font-mori font-bold text-sm md:text-base text-brand-white uppercase tracking-[0.1em] underline decoration-brand-accent/50 underline-offset-[6px] hover:decoration-brand-accent hover:text-brand-accent transition-colors duration-300"
                                                >
                                                    {link.label} {isInternal ? '→' : '↗'}
                                                </PreviewLink>
                                            );
                                        })}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </article>

            {/* ── 3. PREV / NEXT NAVIGATION GRID ── */}
            <section aria-label="Blog Navigation" className="relative border-t border-white/10 py-20 md:py-32">
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col relative z-10">

                    <div className="flex justify-center mb-12 md:mb-20">
                        <Link href="/blog" className="group inline-flex items-center gap-3 bg-brand-white text-brand-dark px-8 md:px-12 py-4 md:py-5 rounded-full font-mori font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:scale-105 hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-xl">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} /> View All Journals
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* PREVIOUS BLOG CARD WITH FEATURED IMAGE BACKGROUND */}
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 block cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
                                <Image src={prevPost.featuredImage} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={prevPost.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-[#0A0A0A]/70 group-hover:bg-[#0A0A0A]/50 transition-colors duration-500" />
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <ArrowLeft className="w-4 h-4 text-brand-accent group-hover:-translate-x-1.5 transition-transform" strokeWidth={3} />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">Previous Post</span>
                                    </div>
                                    <h4 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-white leading-[1.1] drop-shadow-md line-clamp-2">
                                        {prevPost.title}
                                    </h4>
                                </div>
                            </Link>
                        ) : <div className="hidden md:block" />}

                        {/* NEXT BLOG CARD WITH FEATURED IMAGE BACKGROUND */}
                        {nextPost ? (
                            <Link href={`/blog/${nextPost.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 block cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl">
                                <Image src={nextPost.featuredImage} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={nextPost.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-[#0A0A0A]/70 group-hover:bg-[#0A0A0A]/50 transition-colors duration-500" />
                                <div className="absolute inset-0 flex flex-col items-end justify-end p-8 md:p-12 text-right">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">Next Post</span>
                                        <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1.5 transition-transform" strokeWidth={3} />
                                    </div>
                                    <h4 className="font-mori font-bold text-3xl md:text-5xl tracking-tighter text-white leading-[1.1] drop-shadow-md line-clamp-2">
                                        {nextPost.title}
                                    </h4>
                                </div>
                            </Link>
                        ) : <div className="hidden md:block" />}
                    </div>
                </div>
            </section>

            {/* ── 4. SINGLE IMAGE LIGHTBOX ── */}
            {lightboxImg && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out" onClick={() => setLightboxImg(null)}>
                    <div className="relative w-full h-full max-w-[100rem] max-h-[90vh] rounded-[1rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Image src={lightboxImg} alt="Fullscreen View" fill className="object-contain" quality={100} />
                    </div>
                    <button className="absolute top-6 right-6 md:top-10 md:right-10 text-white bg-white/10 hover:bg-brand-accent hover:text-brand-dark p-3 md:p-4 rounded-full backdrop-blur-md transition-all hover:scale-110 z-20" onClick={() => setLightboxImg(null)}>
                        <X size={24} strokeWidth={2.5} />
                    </button>
                </div>
            )}

        </main>
    );
}