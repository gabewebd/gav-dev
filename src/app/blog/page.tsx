"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, FolderOpen, Calendar, User, PenTool } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import HeroHeading from "@/components/ui/HeroHeading";
import PreviewLink from "@/components/ui/PreviewLink";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";

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
      y: "80vh",
      rotation: 25,
      scale: 1.4,
      ease: "none",
      scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom -80%", scrub: 1 }
    });

    // Blog cards fade in
    gsap.utils.toArray('.blog-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } }
      );
    });

    // CTA Scroll Reveal
    gsap.fromTo(".cta-section > div > *",
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative overflow-x-clip pt-28 md:pt-40 pb-32 transition-colors duration-500">

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* ─── HERO ── */}
        <section className="hero-section mb-24 md:mb-40 relative max-w-7xl mx-auto">
          {/* Scroll-triggered SVG background — line-style file icon like blog/projects */}
          <div className="hero-bg-icon absolute top-[-5vh] right-[-5vw] lg:right-5 w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none z-0 opacity-[0.05]">
            <FolderOpen className="w-full h-full text-white" strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <SectionTag className="hero-reveal mb-6 md:mb-8 !border-white/10 !bg-transparent !text-white">Dev Journal</SectionTag>
            <HeroHeading>
              <div className="overflow-hidden py-3 -my-3 pr-4 -mr-4">
                <span className="hero-reveal inline-block pr-4 font-mori font-semibold text-white">Dev Notes</span>
              </div>
              <div className="hero-reveal flex items-center justify-start gap-3 sm:gap-5 overflow-hidden py-2 -my-2">
                <span className="text-white font-mori font-semibold">& Insights</span>
                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-brand-accent rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.25rem] shrink-0">
                  <PenTool className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                </span>
              </div>
            </HeroHeading>

            <p className="hero-desc text-base md:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mt-6">
              A collection of thoughts, technical explorations, and design reflections from the intersection of code and creativity.
            </p>

            <div className="hero-divider w-full h-[1px] bg-white/10 mt-16 md:mt-24 origin-left" />
          </div>
        </section>

        {/* ─── BLOG CARDS ── */}
        <section className="pb-32 md:pb-48">
          <div className="grid gap-8 md:gap-12">
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.slug}`}
                className="blog-card group block w-full"
              >
                <article className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse lg:text-right lg:justify-end"} gap-6 lg:gap-10 p-6 md:p-8 rounded-[2.5rem] border border-brand-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md shadow-black/20 hover:-translate-y-2 hover:border-brand-white/15 transition-all duration-500 w-full`}>
                  {post.featuredImage && (
                    <div className="relative w-full lg:w-[480px] xl:w-[560px] aspect-[16/10] sm:aspect-[2/1] lg:aspect-[4/3] rounded-[2rem] overflow-hidden shrink-0 border border-brand-white/10 bg-brand-dark-alt">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" sizes="(max-width: 1024px) 100vw, 560px" />
                    </div>
                  )}
                  <div className={`flex flex-col justify-center gap-4 lg:gap-6 w-full ${i % 2 === 0 ? "" : "lg:items-end"}`}>
                    <div className={`flex items-center gap-3 text-[10px] md:text-xs text-white/70 font-medium uppercase tracking-widest ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                      <span className="text-brand-accent">{post.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-white/20" />
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-mori font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tight text-brand-white leading-[1.1] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm md:text-base text-brand-white/70 font-medium leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-white mt-2 mb-2 hover:text-brand-accent transition-colors duration-300 ${i % 2 === 0 ? "" : "lg:flex-row-reverse"}`}>
                      Read Article <ArrowRight className={`w-4 h-4 transition-transform ${i % 2 === 0 ? "group-hover:translate-x-1.5" : "lg:rotate-180 group-hover:translate-x-1.5 lg:group-hover:-translate-x-1.5"}`} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="cta-section py-20 px-6 max-w-7xl mx-auto border-t border-brand-white/10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-left">
          <div className="flex-1">
            <h2 className="font-mori font-semibold text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-brand-white">
              Ready to build something <span className="text-brand-accent">remarkable</span>?
            </h2>
            <p className="mt-4 text-brand-white/50 max-w-xl font-medium">
              I’m always open to new opportunities, collaborations, and building meaningful digital solutions.
            </p>
          </div>
          <div className="flex flex-wrap items-center lg:justify-end gap-4 w-full lg:w-auto">
            <Button href="/contact" icon={ArrowRight}>
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
