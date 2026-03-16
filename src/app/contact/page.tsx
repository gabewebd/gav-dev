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
    User,
    ArrowRight,
    FileDown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTag from "@/components/ui/SectionTag";
import HeroHeading from "@/components/ui/HeroHeading";
import PreviewLink from "@/components/ui/PreviewLink";
import SocialButton from "@/components/ui/SocialButton";
import Magnetic from "@/components/ui/Magnetic";

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
                .fromTo(".contact-hero-reveal",
                    { y: 80, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
                    { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12 }
                )
                .from(
                    ".contact-hero-sub",
                    { y: 30, opacity: 0, duration: 0.8 },
                    "-=0.5"
                )
                .fromTo(".hero-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power4.inOut" }, "-=0.8");

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

            // Unified hero background icon animation
            gsap.to('.hero-bg-icon', {
                y: "80vh",
                rotation: 25,
                scale: 1.4,
                ease: "none",
                scrollTrigger: { trigger: ".contact-hero-section", start: "top top", end: "bottom -80%", scrub: 1 }
            });
        },
        { scope: mainRef }
    );

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
            className="relative overflow-x-clip pb-32 transition-colors duration-500"
        >
            {/* ═══════════════════════════════════════════════════════
                HERO SECTION
                ═══════════════════════════════════════════════════════ */}
            <section className="contact-hero-section pt-28 md:pt-40 pb-12 md:pb-16 px-6 md:px-12 max-w-[100rem] mx-auto relative">
                <div className="max-w-7xl mx-auto relative">
                    {/* Scroll-triggered SVG background — line-style Mail icon */}
                    <div className="hero-bg-icon absolute top-[-5vh] right-[-5vw] lg:right-5 w-[300px] h-[300px] md:w-[450px] md:h-[450px] pointer-events-none z-0 opacity-[0.05]">
                        <Mail className="w-full h-full text-white" strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                        <SectionTag className="contact-hero-reveal mb-6 md:mb-8 !border-white/10 !bg-transparent !text-white">Get In Touch</SectionTag>
                        <HeroHeading>
                            <div className="overflow-hidden py-3 -my-3 pr-4 -mr-4">
                                <span className="contact-hero-reveal inline-block pr-4 font-mori font-semibold text-white">Let&apos;s</span>
                            </div>
                            <div className="contact-hero-reveal flex items-center justify-start gap-4 overflow-hidden py-2 -my-2 text-white">
                                <span className="font-mori font-semibold">Connect</span>
                                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-brand-accent rounded-[0.75rem] sm:rounded-[1rem] md:rounded-[1.25rem] shrink-0">
                                    <User className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-brand-dark" strokeWidth={2.5} />
                                </span>
                            </div>
                        </HeroHeading>
                        <p className="contact-hero-sub text-base md:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mt-6">
                        Have a project in mind, or just want to say hello? I&apos;d love to hear
                        from you. Fill out the form below or reach out directly.
                    </p>
                    <div className="hero-divider w-full h-[1px] bg-white/10 mt-16 md:mt-24 origin-left" />
                </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                CONTACT GRID
                ═══════════════════════════════════════════════════════ */}
            <section className="pb-24 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
                    {/* ── FORM ──────────────────────────────────────── */}
                    <div className="contact-form-block lg:col-span-3">
                        {status === "success" ? (
                            <div
                                className="rounded-[2rem] p-10 md:p-14
                                border border-white/5 bg-[#111111]/50
                                shadow-2xl shadow-black/20 text-center"
                            >
                                <div className="w-16 h-16 bg-brand-accent rounded-2xl grid place-items-center mx-auto mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-brand-dark" />
                                </div>
                                <h3 className="font-mori font-semibold text-2xl tracking-tight mb-3 text-white">
                                    Message Sent!
                                </h3>
                                <p className="text-sm text-white/70 mb-6 font-medium">
                                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
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
                                border border-white/5 shadow-2xl shadow-black/20
                                bg-[#111111]/50 space-y-6"
                            >
                                {status === "error" && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="contact-name"
                                        className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3"
                                    >
                                        Name <span className="text-brand-accent">*</span>
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
                                        className="w-full px-5 py-4 rounded-xl
                                        bg-white/[0.03] border border-white/10
                                        focus:border-white/20 focus:outline-none focus:bg-white/[0.05]
                                        text-sm text-white placeholder:text-white/20
                                        transition-all duration-300"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="contact-email"
                                        className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3"
                                    >
                                        Email <span className="text-brand-accent">*</span>
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
                                        className="w-full px-5 py-4 rounded-xl
                                        bg-white/[0.03] border border-white/10
                                        focus:border-white/20 focus:outline-none focus:bg-white/[0.05]
                                        text-sm text-white placeholder:text-white/20
                                        transition-all duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="contact-message"
                                        className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-3"
                                    >
                                        Message <span className="text-brand-accent">*</span>
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
                                        className="w-full px-5 py-4 rounded-xl resize-none
                                        bg-white/[0.03] border border-white/10
                                        focus:border-white/20 focus:outline-none focus:bg-white/[0.05]
                                        text-sm text-white placeholder:text-white/20
                                        transition-all duration-300"
                                    />
                                </div>

                                <Magnetic>
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
                                </Magnetic>
                            </form>
                        )}
                    </div>

                    {/* ── CONTACT INFO ──────────────────────────────── */}
                    <div className="contact-info-block lg:col-span-2 space-y-12">
                        {/* Email */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
                                Email
                            </h3>
                            <PreviewLink
                                href="mailto:vlsqz.gabrielle@gmail.com"
                                label="Send Email"
                                description="vlsqz.gabrielle@gmail.com"
                                className="text-lg md:text-xl text-white hover:text-brand-accent transition-colors duration-300 font-medium break-all"
                            >
                                vlsqz.gabrielle@gmail.com
                            </PreviewLink>
                        </div>

                        {/* Location */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
                                Location
                            </h3>
                            <p className="text-base text-white/80 flex items-center gap-2 font-medium">
                                <MapPin className="w-5 h-5 text-brand-accent" />
                                Angeles City, Philippines
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
                                Connect
                            </h3>
                            <div className="flex items-center gap-4">
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
                            className="rounded-2xl p-8
                                border border-white/5 shadow-2xl shadow-black/10
                                bg-white/5 backdrop-blur-sm"
                        >
                            <p className="text-sm text-white/70 leading-relaxed font-medium">
                                <strong className="text-white">
                                    Currently open
                                </strong>{" "}
                                to internship opportunities, freelance projects, and collaborations. I typically respond within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA SECTION ── */}
            <section className="cta-section py-20 px-6 max-w-7xl mx-auto border-t border-white/10 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="font-mori font-semibold text-3xl md:text-5xl uppercase tracking-tighter leading-tight text-white">
                            Want a formal <span className="text-brand-accent">overview</span>?
                        </h2>
                        <p className="mt-4 text-white/50 max-w-xl font-medium">
                            Download my resume for a detailed look at my professional journey, technical skills, and educational background.
                        </p>
                    </div>
                    <Magnetic>
                        <Button href="/assets/gav-resume.pdf" target="_blank" rel="noopener noreferrer" icon={FileDown}>
                            Get Resume PDF
                        </Button>
                    </Magnetic>
                </div>
            </section>
        </main>
    );
}
