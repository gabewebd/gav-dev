"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    Send,
    Github,
    Linkedin,
    Mail,
    MapPin,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import SectionTitle from "@/components/ui/SectionTitle";
import HeroHeading from "@/components/ui/HeroHeading";
import PreviewLink from "@/components/ui/PreviewLink";
import SocialButton from "@/components/ui/SocialButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Social Links ───────────────────────────────────────────── */
const SOCIALS = [
    { label: "GitHub", href: "https://github.com/gabewebd", icon: Github },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/gabrielle-velasquez-gav",
        icon: Linkedin,
    },
    { label: "Email", href: "mailto:vlsqz.gabrielle@gmail.com", icon: Mail },
];

/* ── Contact Page ───────────────────────────────────────────── */
export default function ContactPage() {
    const mainRef = useRef<HTMLElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useGSAP(
        () => {
            const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
            heroTl
                .fromTo(".contact-hero-line",
                    { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
                    { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12 }
                )
                .from(
                    ".contact-hero-sub",
                    { y: 30, opacity: 0, duration: 0.8 },
                    "-=0.5"
                );

            gsap.from(".contact-form-block", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.4,
            });

            gsap.from(".contact-info-block", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                delay: 0.6,
            });

            // Parallax on hero background icon
            gsap.to('.hero-bg-icon', {
                y: 200, rotation: 15, ease: "none",
                scrollTrigger: { trigger: ".contact-hero-section", start: "top top", end: "bottom top", scrub: true }
            });
        },
        { scope: mainRef }
    );

    // ── NATIVE CUSTOM BACKEND FETCH ──
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setFormState({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
                setErrorMessage(data.error || "An unknown error occurred.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            setStatus("error");
            setErrorMessage("Failed to connect to the server. Please try again later.");
        }
    };

    return (
        <main
            ref={mainRef}
            className="relative overflow-hidden bg-brand-light dark:bg-brand-dark min-h-screen"
        >
            {/* ── STATIC NOISE ── */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] md:opacity-[0.12] dark:opacity-[0.03] dark:md:opacity-[0.05]">
                <svg className="w-full h-full">
                    <filter id="noise-contact">
                        <feTurbulence type="fractalNoise" baseFrequency="3.5" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0, 1 0 0 0 0, 1 0 0 0 0, 0 0 0 1 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise-contact)" />
                </svg>
            </div>

            {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
            <section className="contact-hero-section pt-28 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center relative">
                {/* SVG background — line-style Mail icon */}
                <div className="hero-bg-icon absolute top-[-5vh] right-[-10vw] lg:right-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.02]">
                    <Mail className="w-full h-full text-brand-ink dark:text-brand-white" strokeWidth={1} />
                </div>
                <div className="relative z-10">
                    <SectionTag className="contact-hero-line justify-center mb-4">Get In Touch</SectionTag>
                    <HeroHeading className="contact-hero-line">
                        Let&apos;s Connect<span className="text-brand-accent">.</span>
                    </HeroHeading>
                    <p className="contact-hero-sub mt-4 md:mt-6 text-sm md:text-lg text-brand-ink/80 dark:text-brand-white/70 max-w-xl mx-auto">
                        Have a project in mind, or just want to say hello? I&apos;d love to hear
                        from you. Fill out the form below or reach out directly.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          CONTACT GRID
          ═══════════════════════════════════════════════════════ */}
            <section className="pb-24 md:pb-32 px-6 md:px-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
                    {/* ── FORM ──────────────────────────────────────── */}
                    <div className="contact-form-block lg:col-span-3">
                        {status === "success" ? (
                            <div
                                className="rounded-[2rem] p-10 md:p-14
                                border border-brand-ink/15 dark:border-brand-accent/20
                                bg-[#F5F5F5]/50 dark:bg-brand-accent/5
                                shadow-xl shadow-brand-ink/[0.04] dark:shadow-none
                                text-center"
                            >
                                <div className="w-16 h-16 bg-brand-accent rounded-2xl grid place-items-center mx-auto mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-brand-dark" />
                                </div>
                                <h3 className="font-outfit font-bold text-2xl uppercase tracking-tight mb-3 text-brand-ink dark:text-brand-white">
                                    Message Sent!
                                </h3>
                                <p className="text-sm text-brand-ink/80 dark:text-brand-white/70 mb-6">
                                    Thank you for reaching out. I&apos;ll get back to you as soon
                                    as possible.
                                </p>
                                <Button
                                    onClick={() => setStatus("idle")}
                                    variant="secondary"
                                    className="!px-6 sm:!px-8 !py-3 sm:!py-4 !text-[10px] sm:!text-xs"
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="rounded-[2rem] p-8 md:p-12
                                border border-brand-ink/15 dark:border-brand-white/5 shadow-xl shadow-brand-ink/[0.04] dark:shadow-none
                                bg-[#F5F5F5]/50 dark:bg-[#111111]/50 space-y-6"
                            >
                                {status === "error" && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="block text-xs font-bold uppercase tracking-widest text-brand-ink/90 dark:text-brand-white/90 mb-2"
                                    >
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) =>
                                            setFormState((s) => ({ ...s, name: e.target.value }))
                                        }
                                        placeholder="Your full name"
                                        className="w-full px-5 py-3.5 rounded-xl
                                        bg-brand-light dark:bg-brand-dark
                                        border border-brand-ink/10 dark:border-brand-white/10
                                        focus:border-brand-ink dark:focus:border-brand-white focus:outline-none
                                        text-sm text-brand-ink dark:text-brand-white
                                        placeholder:text-brand-ink/30 dark:placeholder:text-brand-white/30
                                        transition-colors duration-200"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="block text-xs font-bold uppercase tracking-widest text-brand-ink/90 dark:text-brand-white/90 mb-2"
                                    >
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState((s) => ({ ...s, email: e.target.value }))
                                        }
                                        placeholder="you@example.com"
                                        className="w-full px-5 py-3.5 rounded-xl
                                        bg-brand-light dark:bg-brand-dark
                                        border border-brand-ink/10 dark:border-brand-white/10
                                        focus:border-brand-ink dark:focus:border-brand-white focus:outline-none
                                        text-sm text-brand-ink dark:text-brand-white
                                        placeholder:text-brand-ink/30 dark:placeholder:text-brand-white/30
                                        transition-colors duration-200"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="block text-xs font-bold uppercase tracking-widest text-brand-ink/90 dark:text-brand-white/90 mb-2"
                                    >
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) =>
                                            setFormState((s) => ({ ...s, message: e.target.value }))
                                        }
                                        placeholder="Tell me about your project or just say hello..."
                                        className="w-full px-5 py-3.5 rounded-xl resize-none
                                        bg-brand-light dark:bg-brand-dark
                                        border border-brand-ink/10 dark:border-brand-white/10
                                        focus:border-brand-ink dark:focus:border-brand-white focus:outline-none
                                        text-sm text-brand-ink dark:text-brand-white
                                        placeholder:text-brand-ink/30 dark:placeholder:text-brand-white/30
                                        transition-colors duration-200"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={status === "sending"}
                                    icon={status === "sending" ? Loader2 : Send}
                                    iconPosition="left"
                                    iconClassName={status === "sending" ? "animate-spin" : ""}
                                    className="w-full !px-6 sm:!px-8 md:!px-10 !py-3 sm:!py-4 md:!py-5 !text-[11px] sm:!text-xs md:!text-sm"
                                >
                                    {status === "sending" ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* ── CONTACT INFO ──────────────────────────────── */}
                    <div className="contact-info-block lg:col-span-2 space-y-8">
                        {/* Email */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-ink/30 dark:text-brand-white/30 mb-4">
                                Email
                            </h3>
                            <PreviewLink
                                href="mailto:vlsqz.gabrielle@gmail.com"
                                label="Send Email"
                                description="vlsqz.gabrielle@gmail.com"
                                className="text-sm md:text-base text-brand-ink dark:text-brand-white
                                hover:text-brand-ink/70 dark:hover:text-brand-accent transition-colors duration-200 font-medium break-all"
                            >
                                vlsqz.gabrielle@gmail.com
                            </PreviewLink>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-ink/30 dark:text-brand-white/30 mb-4">
                                Location
                            </h3>
                            <p className="text-sm text-brand-ink/80 dark:text-brand-white/70 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-brand-ink/80 dark:text-brand-accent" />
                                Angeles City, Philippines
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-ink/30 dark:text-brand-white/30 mb-4">
                                Connect
                            </h3>
                            <div className="flex items-center gap-3">
                                {SOCIALS.map((s) => (
                                    <PreviewLink
                                        key={s.label}
                                        href={s.href}
                                        label={s.label}
                                        description={s.href}
                                    >
                                        <SocialButton
                                            icon={s.icon}
                                            label={s.label}
                                        />
                                    </PreviewLink>
                                ))}
                            </div>
                        </div>

                        {/* Quick note */}
                        <div
                            className="rounded-2xl p-6 md:p-8
                                border border-brand-ink/15 dark:border-brand-white/5 shadow-md shadow-brand-ink/[0.03] dark:shadow-none
                                bg-brand-accent/5"
                        >
                            <p className="text-xs text-brand-ink/80 dark:text-brand-white/70 leading-relaxed">
                                <strong className="text-brand-ink dark:text-brand-white">
                                    Currently open
                                </strong>{" "}
                                to internship opportunities, freelance projects, and
                                collaborations. I typically respond within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
