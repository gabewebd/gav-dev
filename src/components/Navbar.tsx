"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import Logo from "@/components/Logo";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ── Navigation Links ───────────────────────────────────────── */
const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
] as const;

/* ── Theme Toggle ───────────────────────────────────────────── */
function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Toggle theme"
        >
            <Sun className={`absolute w-[18px] h-[18px] transition-all duration-500 text-brand-accent ${isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
            <Moon className={`absolute w-[18px] h-[18px] transition-all duration-500 text-brand-ink dark:text-brand-white ${!isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
        </button>
    );
}

/* ── Floating Glassmorphic Navbar ───────────────────────────── */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuLinksRef = useRef<HTMLDivElement>(null);

    /* ── Mechanical Shutter Animation for Mobile ────────────── */
    const openMenu = () => {
        setIsOpen(true);
        document.body.style.overflow = "hidden";

        gsap.set(menuOverlayRef.current, { display: "flex" });

        gsap.fromTo(
            menuOverlayRef.current,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.6,
                ease: "power4.inOut",
            }
        );

        if (menuLinksRef.current) {
            const links = menuLinksRef.current.querySelectorAll(".mobile-link");
            gsap.fromTo(
                links,
                { y: -20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        }
    };

    const closeMenu = () => {
        gsap.to(menuOverlayRef.current, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.5,
            ease: "power4.inOut",
            onComplete: () => {
                setIsOpen(false);
                document.body.style.overflow = "";
                if (menuOverlayRef.current) {
                    gsap.set(menuOverlayRef.current, { display: "none" });
                }
            },
        });
    };

    const handleLinkClick = () => {
        if (isOpen) closeMenu();
    };

    return (
        <>
            {/* ────────────────────────────────────────────────────────
                1. FLOATING DESKTOP & MOBILE HEADER (Z-100 to prevent overlap)
                Replaced heavy shadow with a delicate double-ring glass edge.
            ──────────────────────────────────────────────────────── */}
            <header className="fixed top-4 inset-x-4 md:top-6 md:inset-x-8 z-[100] flex justify-center pointer-events-none">
                <nav className="pointer-events-auto flex items-center w-full max-w-6xl h-14 md:h-16 px-4 md:px-6 
                    bg-white/40 dark:bg-[#0A0A0A]/40 backdrop-blur-2xl 
                    border border-white/50 dark:border-white/10 
                    ring-1 ring-black/5 dark:ring-white/5
                    shadow-lg shadow-brand-ink/[0.04] dark:shadow-none
                    rounded-2xl transition-colors duration-300">

                    {/* Logo (Left) */}
                    <div className="flex items-center pl-2">
                        <Link href="/" className="font-outfit font-black text-xl md:text-2xl tracking-tighter text-brand-ink dark:text-brand-white uppercase group transition-opacity hover:opacity-80 flex items-center gap-2">
                            <Logo className="h-7 w-auto text-brand-ink dark:text-brand-white transition-colors duration-300" />
                        </Link>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Desktop Links (Right Aligned) */}
                    <div className="hidden md:flex items-center gap-2 mr-4">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 group
                                    ${isActive
                                            ? 'text-brand-ink dark:text-brand-white'
                                            : 'text-brand-ink/70 dark:text-brand-white/70 hover:text-brand-ink dark:hover:text-brand-white hover:bg-brand-ink/5 dark:hover:bg-brand-white/5'
                                        }`}
                                >
                                    {link.label}

                                    {/* Desktop Active State: Acid Green Bottom Outline */}
                                    <span
                                        className={`absolute bottom-0 left-3 right-3 h-[2px] bg-brand-accent rounded-t-md transition-transform duration-300 origin-center
                                        ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-50'}`}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Controls Wrapper */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Animated Hamburger Button */}
                        <button
                            onClick={isOpen ? closeMenu : openMenu}
                            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] transition-transform duration-300 pointer-events-auto hover:scale-110 active:scale-95"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu-drawer"
                        >
                            <span className={`w-[22px] h-[2px] bg-brand-ink dark:bg-brand-white transition-all duration-300 ease-out origin-center ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`w-[22px] h-[2px] bg-brand-ink dark:bg-brand-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
                            <span className={`w-[22px] h-[2px] bg-brand-ink dark:bg-brand-white transition-all duration-300 ease-out origin-center ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* ────────────────────────────────────────────────────────
                2. MOBILE MENU DRAWER
            ──────────────────────────────────────────────────────── */}
            <div
                id="mobile-menu-drawer"
                ref={menuOverlayRef}
                className="fixed inset-0 z-[90] bg-brand-light dark:bg-brand-dark hidden flex-col pt-24 md:pt-32"
                style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                aria-hidden={!isOpen}
            >
                <div ref={menuLinksRef} className="relative z-10 flex flex-col w-full h-full overflow-y-auto px-6 pb-8">
                    {NAV_LINKS.map((link, i) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={handleLinkClick}
                                className={`mobile-link relative flex items-center justify-between w-full px-6 py-6 rounded-2xl text-3xl font-outfit font-black uppercase tracking-tighter transition-all duration-300 group mb-2
                                ${isActive ? 'bg-brand-ink/5 dark:bg-brand-white/5 text-brand-ink dark:text-brand-white' : 'text-brand-ink/70 dark:text-brand-white/70 hover:bg-brand-ink/5 dark:hover:bg-brand-white/5 hover:text-brand-ink dark:hover:text-brand-white'}`}
                            >
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1.5 rounded-r-full bg-brand-accent" />}
                                <span>{link.label}</span>
                                <span className={`font-mono text-sm transition-colors 
                                    ${isActive
                                        ? 'text-brand-ink/70 dark:text-brand-accent'
                                        : 'text-brand-ink/30 dark:text-brand-accent/40 group-hover:text-brand-ink/70 dark:group-hover:text-brand-accent/80'}`
                                }>
                                    0{i + 1}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
