"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 800);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-5 md:bottom-8 right-5 md:right-8 z-50 p-3 sm:p-3.5 md:p-4 rounded-full
        bg-[#111111]/60 backdrop-blur-lg
        border border-white/10
        shadow-[0_4px_20px_rgba(255,255,255,0.05)]
        text-brand-white
        hover:bg-[#111111]/80 hover:scale-110
        transition-all duration-500
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
        >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </button>
    );
}
