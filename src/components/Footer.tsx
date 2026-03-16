"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
    Github, Linkedin, Mail, ArrowUpRight, FileDown
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
    { label: "Resume", href: "/assets/gav-resume.pdf" },
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
            className="group"
        >
            <SocialButton
                icon={Icon}
                label={label}
                className="w-12 h-12 sm:w-14 sm:h-14 border-brand-white/10 hover:border-brand-accent text-brand-white/85 hover:text-brand-accent"
            />
        </PreviewLink>
    );
}

/* ── Footer Component ───────────────────────────────────────── */
export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#0A0A0A]/80 backdrop-blur-xl text-white border-t border-white/10 overflow-hidden">
            {/* Subtle top glow to separate from main content */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent shadow-[0_-20px_40px_rgba(207,249,73,0.05)]" />



            {/* ── Main Footer Grid ───────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

                    {/* Brand Column */}
                    <div className="sm:col-span-2 md:col-span-5">
                        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                            <Logo className="h-10 w-auto text-white" />
                        </Link>

                        <p className="mt-5 text-sm text-body leading-relaxed max-w-sm font-light">
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
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-6">
                            Navigation
                        </h4>
                        <ul className="space-y-3.5">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <PreviewLink
                                        href={link.href}
                                        label="Navigate"
                                        description={link.label}
                                        className="text-sm text-body hover:text-brand-accent
                                            transition-colors duration-200
                                            flex items-center gap-1.5 group/link font-light"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                    </PreviewLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-6">
                            Get In Touch
                        </h4>
                        
                        <Button 
                            href="/contact" 
                            className="w-full !py-3.5 !text-[11px] mb-8 shadow-xl"
                        >
                            Contact Me
                        </Button>

                        <PreviewLink
                            href="mailto:vlsqz.gabrielle@gmail.com"
                            label="Send Email"
                            description="vlsqz.gabrielle@gmail.com"
                            className="text-sm text-body hover:text-brand-accent
                                transition-colors duration-200 break-all font-light"
                        >
                            vlsqz.gabrielle@gmail.com
                        </PreviewLink>

                        <p className="mt-6 text-[11px] text-muted leading-relaxed font-light">
                            Holy Angel University<br />
                            BSIT 2023–2027<br />
                            Angeles City, Philippines
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ─────────────────────────────────────── */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left opacity-30">
                    <p className="text-[10px] uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Gabrielle Ainshley Velasquez.
                    </p>
                    <p className="text-[10px] uppercase tracking-widest hidden sm:block">
                        Designed & Developed with care
                    </p>
                </div>
            </div>
        </footer>
    );
}