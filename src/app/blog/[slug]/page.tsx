"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Calendar, Clock, X } from "lucide-react";
import { BLOG_POSTS, BLOG_CONTENT, type ContentBlock } from "@/data/blog";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ─── HELPER: PARSE MARKDOWN LINKS IN TEXT ───
// Converts "[Link Text](/url)" into inline Next.js <Link> components
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
            <Link
                key={match.index}
                href={url}
                target={isInternal ? "_self" : "_blank"}
                className="font-bold underline decoration-brand-ink/30 dark:decoration-brand-white/30 underline-offset-4 hover:decoration-brand-ink hover:text-brand-ink/80 dark:hover:decoration-brand-accent dark:hover:text-brand-accent transition-colors"
            >
                {label}
            </Link>
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

        gsap.fromTo(".hero-reveal",
            { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
            { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.out", stagger: 0.12 }
        );

        gsap.utils.toArray('.content-block').forEach((block: any) => {
            gsap.fromTo(block,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: block, start: "top 85%" } }
            );
        });
    }, { scope: containerRef, dependencies: [post] });

    if (!post) return <div className="min-h-screen flex items-center justify-center font-outfit font-black text-2xl uppercase bg-brand-light dark:bg-brand-dark text-brand-ink dark:text-brand-white">Error: Article Not Found.</div>;

    return (
        <main ref={containerRef} className="relative min-h-screen bg-brand-light dark:bg-brand-dark selection:bg-brand-accent selection:text-brand-dark transition-colors duration-500 overflow-x-clip pt-28 md:pt-40">

            {/* ── STATIC NOISE ── */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
                <svg className="w-full h-full">
                    <filter id="noise-blog-slug">
                        <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise-blog-slug)" />
                </svg>
            </div>

            <article className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pb-32">

                {/* ── 1. ARTICLE HEADER ── */}
                <header className="mb-16 flex flex-col items-center text-center">
                    <Link href="/blog" className="hero-reveal group inline-flex items-center gap-2 text-brand-ink/60 dark:text-brand-white/60 hover:text-brand-ink dark:hover:text-brand-white text-[10px] md:text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" /> Back to Blogs
                    </Link>

                    <div className="hero-reveal flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-6 md:mb-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/50 dark:text-brand-white/50">
                        {/* STRICTLY INK ON LIGHT, ACCENT ON DARK */}
                        <span className="text-brand-ink dark:text-brand-accent">{post.category}</span>
                        <span className="w-1 h-1 rounded-full bg-brand-ink/20 dark:bg-brand-white/20" />
                        <time dateTime={post.date} className="flex items-center gap-2"><Calendar size={14} /> {post.displayDate}</time>
                        <span className="w-1 h-1 rounded-full bg-brand-ink/20 dark:bg-brand-white/20" />
                        <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                    </div>

                    {/* Adjusted text-[clamp()] to be slightly smaller */}
                    <h1 className="hero-reveal font-outfit font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tighter uppercase text-brand-ink dark:text-brand-white mb-6 md:mb-8">
                        {post.title}<span className="text-brand-accent">.</span>
                    </h1>

                    <p className="hero-reveal text-base md:text-xl text-brand-ink/70 dark:text-brand-white/70 leading-relaxed font-medium max-w-3xl">
                        {post.excerpt}
                    </p>

                    {/* DYNAMIC FEATURED HERO IMAGE */}
                    <div
                        className="hero-reveal relative w-full mt-12 md:mt-16 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt cursor-zoom-in group"
                        onClick={() => setLightboxImg(post.featuredImage)}
                    >
                        <Image src={post.featuredImage} alt={post.title} width={1200} height={800} className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out" priority sizes="100vw" quality={100} />
                        <div className="absolute inset-0 bg-brand-ink/20 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                </header>

                {/* ── 2. DYNAMIC CONTENT ENGINE ── */}
                <div className="flex flex-col gap-8 md:gap-12">
                    {content.map((block, i) => {
                        switch (block.type) {
                            case 'p':
                                return (
                                    <p key={i} className="content-block text-base md:text-lg text-brand-ink/80 dark:text-brand-white/80 leading-[1.8] font-medium">
                                        {/* Applying the inline link parser here */}
                                        {renderTextWithLinks(block.text)}
                                    </p>
                                );
                            case 'h2':
                                return (
                                    <h2 key={i} className="content-block font-outfit font-black text-2xl md:text-4xl uppercase tracking-tighter text-brand-ink dark:text-brand-white mt-8 mb-2">
                                        {block.text}<span className="text-brand-accent">.</span>
                                    </h2>
                                );
                            case 'quote':
                                return (
                                    <blockquote key={i} className="content-block my-8 pl-6 md:pl-8 border-l-4 border-brand-accent">
                                        <p className="font-outfit font-bold text-xl md:text-3xl uppercase tracking-tight text-brand-ink dark:text-brand-white leading-snug mb-4">
                                            "{block.text}"
                                        </p>
                                        {block.author && (
                                            <footer className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-ink/50 dark:text-brand-white/50">
                                                — {block.author}
                                            </footer>
                                        )}
                                    </blockquote>
                                );
                            case 'img':
                                return (
                                    <figure key={i} className="content-block my-8 md:my-12 flex flex-col gap-4">
                                        <div
                                            className="relative w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-brand-light-alt dark:bg-brand-dark-alt border border-brand-ink/10 dark:border-brand-white/10 cursor-zoom-in group"
                                            onClick={() => setLightboxImg(block.src)}
                                        >
                                            <Image src={block.src} alt={block.alt} width={1200} height={800} className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, 800px" quality={95} />
                                            <div className="absolute inset-0 bg-brand-ink/20 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>
                                        {block.caption && (
                                            <figcaption className="text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-ink/40 dark:text-brand-white/40">
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'video':
                                // @ts-ignore
                                const isEmbed = block.url.includes('drive.google.com') || block.url.includes('youtube.com');
                                return (
                                    <figure key={i} className="content-block my-8 md:my-12 flex flex-col gap-4">
                                        <div className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-brand-light-alt dark:bg-brand-dark-alt border border-brand-ink/10 dark:border-brand-white/10 shadow-xl">
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
                                            <figcaption className="text-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-ink/40 dark:text-brand-white/40">
                                                {/* @ts-ignore */}
                                                {block.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'link-group':
                                return (
                                    <div key={i} className="content-block flex flex-wrap items-center gap-6 mt-6 mb-8">
                                        {/* @ts-ignore */}
                                        {block.links.map((link: any, idx: number) => {
                                            const isInternal = link.url.startsWith('/');
                                            return (
                                                <Link
                                                    key={idx}
                                                    href={link.url}
                                                    target={isInternal ? "_self" : "_blank"}
                                                    className="font-outfit font-bold text-sm md:text-base text-brand-ink dark:text-brand-white uppercase tracking-widest underline decoration-brand-ink/20 dark:decoration-brand-white/20 underline-offset-[6px] hover:decoration-brand-ink dark:hover:decoration-brand-accent transition-colors duration-300"
                                                >
                                                    {link.label} {isInternal ? '→' : '↗'}
                                                </Link>
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
            <section aria-label="Blog Navigation" className="relative border-t border-brand-ink/10 dark:border-brand-white/10 py-20 md:py-32 bg-brand-light-alt dark:bg-brand-dark-alt">
                {/* Section Static Noise Overlay */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
                    <svg className="w-full h-full"><filter id="noise-blog-nav"><feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" /></filter><rect width="100%" height="100%" filter="url(#noise-blog-nav)" /></svg>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col relative z-10">

                    <div className="flex justify-center mb-12 md:mb-16">
                        <Link href="/blog" aria-label="Return to all blog posts" className="group inline-flex items-center gap-3 border border-brand-ink/20 dark:border-brand-white/20 text-brand-ink dark:text-brand-white px-8 md:px-10 py-4 rounded-full font-outfit font-bold uppercase tracking-widest text-xs hover:bg-brand-ink/5 dark:hover:bg-brand-white/5 transition-colors">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" /> Return to Blogs
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* PREVIOUS BLOG CARD WITH FEATURED IMAGE BACKGROUND */}
                        {prevPost ? (
                            <Link href={`/blog/${prevPost.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 block cursor-pointer shadow-xl dark:shadow-2xl">
                                <Image src={prevPost.featuredImage} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={prevPost.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-[#111111]/70 dark:bg-[#0A0A0A]/70 transition-colors group-hover:bg-[#111111]/50 dark:group-hover:bg-[#0A0A0A]/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <ArrowLeft className="w-3.5 h-3.5 text-brand-accent group-hover:-translate-x-1.5 transition-transform" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">Previous Post</span>
                                    </div>
                                    <h4 className="font-outfit font-black text-2xl md:text-4xl uppercase tracking-tighter text-white leading-[1.1]">
                                        {prevPost.title}<span className="text-brand-accent">.</span>
                                    </h4>
                                </div>
                            </Link>
                        ) : <div className="hidden md:block" />}

                        {/* NEXT BLOG CARD WITH FEATURED IMAGE BACKGROUND */}
                        {nextPost ? (
                            <Link href={`/blog/${nextPost.slug}`} className="group relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[2rem] overflow-hidden border border-brand-ink/10 dark:border-brand-white/10 block cursor-pointer shadow-xl dark:shadow-2xl">
                                <Image src={nextPost.featuredImage} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt={nextPost.title} sizes="(max-width: 768px) 100vw, 50vw" quality={90} />
                                <div className="absolute inset-0 bg-[#111111]/70 dark:bg-[#0A0A0A]/70 transition-colors group-hover:bg-[#111111]/50 dark:group-hover:bg-[#0A0A0A]/50" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/70">Next Post</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-brand-accent group-hover:translate-x-1.5 transition-transform" />
                                    </div>
                                    <h4 className="font-outfit font-black text-2xl md:text-4xl uppercase tracking-tighter text-white leading-[1.1]">
                                        {nextPost.title}<span className="text-brand-accent">.</span>
                                    </h4>
                                </div>
                            </Link>
                        ) : <div className="hidden md:block" />}
                    </div>


                </div>
            </section>

            {/* ── 4. SINGLE IMAGE LIGHTBOX (Elevated z-index to overlay noise) ── */}
            {lightboxImg && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-brand-ink/95 dark:bg-black/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out" onClick={() => setLightboxImg(null)}>
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] rounded-[1rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Image src={lightboxImg} alt="Fullscreen View" fill className="object-contain" quality={100} />
                    </div>
                    <button className="absolute top-6 right-6 md:top-10 md:right-10 text-brand-white bg-white/10 hover:bg-brand-accent hover:text-brand-dark p-3 rounded-full backdrop-blur-md transition-colors z-20" onClick={() => setLightboxImg(null)}>
                        <X size={24} strokeWidth={2.5} />
                    </button>
                </div>
            )}

        </main>
    );
}