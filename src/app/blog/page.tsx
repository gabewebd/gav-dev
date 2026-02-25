"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, FolderOpen, Calendar } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { BLOG_POSTS } from "@/data/blog";

export default function BlogPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Hero reveal — clipPath animation matching other pages
    tl.fromTo(".hero-reveal",
      { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
      { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12, ease: "power4.out" }
    );
    tl.fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");
    tl.fromTo(".hero-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power4.inOut" }, "-=0.8");

    // Parallax on hero background icon
    gsap.to('.hero-bg-icon', {
      y: 200, rotation: 15, ease: "none",
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
    });

    // Blog cards fade in
    gsap.utils.toArray('.blog-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-brand-light dark:bg-brand-dark overflow-x-clip pt-28 md:pt-40 transition-colors duration-500">
      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
        <svg className="w-full h-full">
          <filter id="noise-blog"><feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" /></filter>
          <rect width="100%" height="100%" filter="url(#noise-blog)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ─── HERO ── */}
        <section className="hero-section mb-24 md:mb-40 relative">
          {/* Line-style FolderOpen SVG background */}
          <div className="hero-bg-icon absolute top-[-5vh] right-[-10vw] lg:right-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.02]">
            <FolderOpen className="w-full h-full text-brand-ink dark:text-brand-white" strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <div className="hero-reveal inline-flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-2 h-2 bg-brand-accent rounded-sm animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-ink/80 dark:text-brand-white/70">Dev Journal</span>
            </div>

            <h1 className="font-outfit font-black text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tighter uppercase text-brand-ink dark:text-brand-white mb-8 lg:mb-12">
              {/* Added extended padding buffers to prevent clipping */}
              <div className="overflow-hidden py-4 -my-4 pr-8 -mr-8"><span className="hero-reveal inline-block pr-4">Dev Notes</span></div>
              <div className="overflow-hidden py-4 -my-4 pr-8 -mr-8"><span className="hero-reveal inline-block pr-4">& Insights<span className="text-brand-accent">.</span></span></div>
            </h1>

            <p className="hero-desc text-base md:text-xl text-brand-ink/80 dark:text-brand-white/70 leading-relaxed font-medium max-w-3xl">
              Thoughts on development, design systems, and lessons learned while building full-stack applications and shaping brand identities.
            </p>

            <div className="hero-divider w-full h-[1px] bg-brand-ink/20 dark:bg-brand-white/20 mt-16 md:mt-24 origin-left" />
          </div>
        </section>

        {/* ─── BLOG CARDS ── */}
        <section className="pb-32 md:pb-48">
          <div className="grid gap-8 md:gap-12">
            {BLOG_POSTS.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="blog-card group block">
                <article className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse lg:text-right lg:justify-end"} gap-6 lg:gap-10 p-6 md:p-8 rounded-[2.5rem] border border-brand-ink/10 dark:border-brand-white/10 bg-gradient-to-br from-white/40 to-white/10 dark:from-white/[0.04] dark:to-white/[0.01] backdrop-blur-md shadow-xl shadow-brand-ink/[0.02] dark:shadow-black/20 hover:-translate-y-2 hover:border-brand-ink/20 dark:hover:border-brand-white/15 transition-all duration-500`}>
                  {post.featuredImage && (
                    <div className="relative w-full lg:w-[480px] xl:w-[560px] aspect-[16/10] sm:aspect-[2/1] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shrink-0 border border-brand-ink/10 dark:border-brand-white/10 bg-brand-light-alt dark:bg-brand-dark-alt">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-1000 ease-out" sizes="(max-width: 1024px) 100vw, 560px" />
                    </div>
                  )}
                  <div className={`flex flex-col justify-center gap-4 lg:gap-6 w-full ${i % 2 === 0 ? "" : "lg:items-end"}`}>
                    <div className={`flex items-center gap-3 text-[10px] md:text-xs text-brand-ink/80 dark:text-brand-white/70 font-medium uppercase tracking-widest ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                      <Calendar className="w-3.5 h-3.5" />{post.date}
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-ink/20 dark:bg-brand-white/20" />
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-outfit font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-brand-ink dark:text-brand-white leading-[1.1] group-hover:text-brand-ink/70 dark:group-hover:text-brand-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm md:text-base text-brand-ink/80 dark:text-brand-white/70 font-medium leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-ink dark:text-brand-white mt-2 mb-2 ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                      Read More <ArrowRight className={`w-4 h-4 transition-transform ${i % 2 === 0 ? "group-hover:translate-x-1.5" : "lg:rotate-180 group-hover:translate-x-1.5 lg:group-hover:-translate-x-1.5"}`} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
