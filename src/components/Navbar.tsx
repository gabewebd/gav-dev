"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Mail, ArrowRight, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
] as const;

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (navRef.current) {
            gsap.fromTo(navRef.current,
                { y: -120, opacity: 0, scale: 0.85, rotateX: 30 },
                { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.5, ease: "elastic.out(1, 0.6)", delay: 0.2 }
            );
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openMenu = () => {
        if (!menuOverlayRef.current) return;
        setIsOpen(true);
        document.body.style.overflow = "hidden";

        gsap.set(menuOverlayRef.current, {
            display: "flex",
            opacity: 1,
            clipPath: "inset(2% 5% 90% 80% round 40px)"
        });

        const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

        tl.to(menuOverlayRef.current, {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: 1.1
        });

        if (menuLinksRef.current) {
            const links = menuLinksRef.current.querySelectorAll(".mobile-link");
            const socials = menuLinksRef.current.querySelectorAll(".mobile-social-icon");
            const footer = menuLinksRef.current.querySelector(".mobile-menu-footer");

            tl.fromTo(
                links,
                { y: 60, opacity: 0, rotateX: -20, transformOrigin: "left center" },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                },
                "-=0.7"
            );

            tl.fromTo(
                [socials, footer],
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
                "-=0.6"
            );
        }

        const blobs = menuOverlayRef.current?.querySelectorAll(".menu-blob");
        if (blobs) {
            blobs.forEach((blob) => {
                gsap.to(blob, {
                    x: "random(-100, 100)",
                    y: "random(-100, 100)",
                    duration: "random(10, 20)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });
        }
    };

    const closeMenu = () => {
        if (!menuOverlayRef.current) return;

        const tl = gsap.timeline({
            defaults: { ease: "expo.inOut" },
            onComplete: () => {
                setIsOpen(false);
                document.body.style.overflow = "";
                if (menuOverlayRef.current) {
                    gsap.set(menuOverlayRef.current, { display: "none" });
                }
            },
        });

        tl.to(".mobile-link", { opacity: 0, y: -20, duration: 0.4, stagger: 0.05 });
        tl.to(menuOverlayRef.current, {
            clipPath: "inset(2% 5% 90% 80% round 40px)",
            duration: 0.9
        }, "-=0.2");
    };

    const handleLinkClick = () => {
        if (isOpen) closeMenu();
    };

    return (
        <>
            <header className="fixed top-4 md:top-6 inset-x-0 z-[100] flex justify-center pointer-events-none px-4" style={{ perspective: "1000px" }}>
                <nav
                    ref={navRef}
                    className={`pointer-events-auto flex items-center justify-between h-14 px-4 md:px-5 rounded-full transition-all duration-500 ease-out border w-full md:w-auto
                    ${isScrolled
                            ? "bg-[#0A0A0A]/70 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] md:h-[60px] md:gap-10 lg:gap-16"
                            : "bg-transparent border-transparent md:h-[70px] md:gap-24 lg:gap-32"
                        }`}
                >
                    <div className="flex-1 flex items-center justify-start pl-1">
                        <Link href="/" className="group transition-opacity hover:opacity-80 flex items-center gap-2">
                            <Logo className="h-6 md:h-7 w-auto text-white transition-colors duration-300" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center justify-center bg-[#050505]/40 backdrop-blur-xl border border-white/5 rounded-full px-2 py-1.5 shadow-inner">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative flex flex-col items-center justify-center px-4 py-2 text-sm font-mori font-semibold transition-colors duration-300 group"
                                >
                                    <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                                        {link.label}
                                    </span>
                                    {/* Premium Active Indicator: Subtle dot below text */}
                                    {isActive && (
                                        <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#BFFF00] shadow-[0_0_8px_rgba(191,255,0,0.6)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-1 sm:gap-2">
                        <div className="hidden md:flex items-center gap-1 sm:gap-2">
                            <a
                                href="/assets/gav-resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-mori font-semibold text-white/40 hover:text-white transition-colors group"
                            >
                                Resume
                                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                        <Link
                            href="/contact"
                            className="hidden md:flex items-center justify-center px-5 py-2.5 text-sm font-mori font-semibold text-[#050505] bg-white rounded-full hover:scale-105 hover:bg-[#BFFF00] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(191,255,0,0.3)]"
                        >
                            Contact
                        </Link>

                        <button
                            onClick={isOpen ? closeMenu : openMenu}
                            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] transition-transform duration-300 pointer-events-auto hover:scale-110 active:scale-95"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu-drawer"
                        >
                            <span className={`w-[22px] h-[2px] bg-white transition-all duration-300 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`w-[22px] h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
                            <span className={`w-[22px] h-[2px] bg-white transition-all duration-300 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                        </button>
                    </div>
                </nav>
            </header>

            <div
                id="mobile-menu-drawer"
                ref={menuOverlayRef}
                className="fixed inset-0 z-[90] hidden flex-col overflow-hidden bg-[#050505]"
                aria-hidden={!isOpen}
            >
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
                    <div className="menu-blob absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[100px]" />
                    <div className="menu-blob absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px]" />
                </div>

                <div ref={menuLinksRef} className="relative z-10 flex flex-col w-full h-full px-8 pt-32 pb-12 justify-between">

                    <div className="flex flex-col gap-4">
                        {[
                            ...NAV_LINKS,
                            { label: "Divider", href: "#", isDivider: true },
                            { label: "Resume", href: "/assets/gav-resume.pdf", isExternal: true },
                            { label: "Contact", href: "/contact" }
                        ].map((link, i) => {
                            if ('isDivider' in link && link.isDivider) {
                                return (
                                    <div key={`divider-${i}`} className="mobile-link w-full py-2 flex items-center justify-start opacity-70">
                                        <div className="h-[1px] w-full max-w-[150px] bg-gradient-to-r from-white/30 to-transparent" />
                                    </div>
                                );
                            }
                            const isActive = pathname === link.href;
                            const isExternal = 'isExternal' in link && link.isExternal;

                            if (isExternal) {
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={handleLinkClick}
                                        className="mobile-link group relative flex items-baseline justify-between py-4 border-b border-white/5 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-sm font-mono text-white/20">
                                                0{i + 1}
                                            </span>
                                            <span className="text-5xl sm:text-6xl font-mori font-bold tracking-tighter text-white hover:text-brand-accent">
                                                Resume
                                            </span>
                                        </div>
                                        <ArrowUpRight className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-all duration-500 text-brand-accent pr-1" />
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className={`mobile-link group relative flex items-baseline justify-between py-4 border-b border-white/5 transition-all duration-300`}
                                >
                                    <div className="flex items-center gap-6">
                                        <span className={`text-sm font-mono transition-colors duration-500 ${isActive ? 'text-brand-accent' : 'text-white/20'}`}>
                                            0{i + 1}
                                        </span>
                                        <span className={`text-5xl sm:text-6xl font-mori font-bold tracking-tighter transition-all duration-500 ${isActive ? 'text-brand-accent italic translate-x-2' : 'text-white hover:text-brand-accent'}`}>
                                            {link.label}
                                        </span>
                                    </div>
                                    <ArrowRight className={`w-6 h-6 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} text-brand-accent`} />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-10 mt-12">
                        <div className="flex items-center gap-8">
                            {[
                                { icon: Github, href: "https://github.com/gabewebd" },
                                { icon: Linkedin, href: "https://linkedin.com/in/gabrielle-velasquez-gav" },
                                { icon: Mail, href: "mailto:vlsqz.gabrielle@gmail.com" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    className="mobile-social-icon text-white/40 hover:text-brand-accent transition-colors duration-300"
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>

                        <div className="mobile-menu-footer flex flex-col gap-2 border-t border-white/5 pt-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Based in Philippines</p>
                            <p className="text-sm font-medium text-white/60">Ready to build something <span className="text-white italic">extraordinary</span>?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}