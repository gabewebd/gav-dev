"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
    Github, Linkedin, Mail, ArrowUpRight, FileDown, CheckCircle2,
    Loader2, ArrowUp
} from "lucide-react";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import PreviewLink from "@/components/ui/PreviewLink";
import SocialButton from "@/components/ui/SocialButton";

gsap.registerPlugin(useGSAP);

/* ── Social Links ───────────────────────────────────────────── */
const SOCIALS = [
    { label: "GitHub", href: "https://github.com/gabewebd", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/gabrielle-velasquez-gav", icon: Linkedin },
    { label: "Email", href: "mailto:vlsqz.gabrielle@gmail.com", icon: Mail },
];

const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

/* ── Magnetic Social Link (GSAP elastic spring) ─────────────── */
function MagneticSocial({
    href,
    label,
    icon: Icon,
}: {
    href: string;
    label: string;
    icon: typeof Github;
}) {
    const ref = useRef<HTMLAnchorElement>(null);

    useGSAP(() => {
        if (!ref.current) return;
        const el = ref.current;
        const strength = 0.35;

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * strength, y: y * strength, duration: 0.25, ease: "power2.out" });
        };

        const handleLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);

        return () => {
            el.removeEventListener("mousemove", handleMove);
            el.removeEventListener("mouseleave", handleLeave);
        };
    });

    return (
        <PreviewLink
            ref={ref}
            href={href}
            label={label}
            description={href}
            className="magnetic-btn"
        >
            <SocialButton
                icon={Icon}
                label={label}
                className="w-12 h-12 sm:w-14 sm:h-14 border-brand-white/10 hover:border-brand-accent text-brand-white/70 hover:text-brand-accent"
            />
        </PreviewLink>
    );
}

/* ── Footer Component ───────────────────────────────────────── */
export default function Footer() {
    const ctaBtnRef = useRef<HTMLAnchorElement>(null);

    /* Magnetic hover for the Resume CTA */
    useGSAP(() => {
        if (!ctaBtnRef.current) return;
        const btn = ctaBtnRef.current;
        const strength = 0.25;

        const handleMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
        };

        const handleLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        };

        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", handleLeave);

        return () => {
            btn.removeEventListener("mousemove", handleMove);
            btn.removeEventListener("mouseleave", handleLeave);
        };
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        /* FIX: solid bg-brand-dark (no transparency), top border added */
        <footer className="dark bg-brand-dark text-brand-white border-t border-brand-white/10">

            {/* ── Resume CTA Banner ──────────────────────────────── */}
            <div className="border-b border-brand-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 md:gap-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-white/70 mb-3">
                            Want the full picture?
                        </p>
                        <h3 className="font-outfit font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-tighter leading-[0.95]">
                            Download My Resume<span className="text-brand-accent">.</span>
                        </h3>
                    </div>
                    <Button
                        ref={ctaBtnRef}
                        href="/assets/gav-resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        ariaLabel="View Gabrielle's Resume PDF in new tab"
                        className="magnetic-btn !bg-brand-white !text-brand-dark !px-7 sm:!px-10 !py-4 sm:!py-5"
                    >
                        <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        Get Resume PDF
                    </Button>
                </div>
            </div>

            {/* ── Main Footer Grid ───────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

                    {/* Brand Column */}
                    <div className="sm:col-span-2 md:col-span-5">
                        <Link href="/" className="inline-block hover:-translate-y-1 transition-transform">
                            <Logo className="h-10 w-auto text-brand-white" />
                        </Link>

                        <p className="mt-5 text-sm text-brand-white/70 leading-relaxed max-w-sm">
                            I’m a Full-Stack Developer who enjoys turning ideas into thoughtful, well-crafted digital experiences.
                            I work across the stack with modern web technologies, always aiming for clarity, performance, and a little bit of polish.
                        </p>

                        {/* Magnetic Social Icons — wraps gracefully on small screens */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {SOCIALS.map((s) => (
                                <MagneticSocial key={s.label} {...s} />
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 md:col-start-7">
                        <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-white/85 mb-6">
                            Navigation
                        </h4>
                        <ul className="space-y-3.5">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <PreviewLink
                                        href={link.href}
                                        label="Navigate"
                                        description={link.label}
                                        className="text-sm text-brand-white/70 hover:text-brand-accent
                                            transition-colors duration-200
                                            flex items-center gap-1.5 group"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </PreviewLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-white/85 mb-6">
                            Get In Touch
                        </h4>
                        <PreviewLink
                            href="mailto:vlsqz.gabrielle@gmail.com"
                            label="Send Email"
                            description="vlsqz.gabrielle@gmail.com"
                            className="text-sm text-brand-white/70 hover:text-brand-accent
                                transition-colors duration-200 break-all"
                        >
                            vlsqz.gabrielle@gmail.com
                        </PreviewLink>

                        <p className="mt-6 text-xs text-brand-white/70 leading-relaxed">
                            Holy Angel University<br />
                            BSIT 2023–2027<br />
                            Angeles City, Philippines
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ─────────────────────────────────────── */}
            <div className="border-t border-brand-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
                    <p className="text-xs text-brand-white/85">
                        &copy; {new Date().getFullYear()} Gabrielle Ainshley Velasquez. All rights reserved.
                    </p>
                    <p className="text-xs text-brand-white/85">
                        Designed and developed with care, curiosity, and an eye for detail.
                    </p>
                </div>
            </div>
        </footer>
    );
}