"use client";

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
    hasAccent?: boolean;
}

export default function SectionTitle({ children, className = "", hasAccent = true }: SectionTitleProps) {
    return (
        <h2 className={`font-outfit font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-brand-ink dark:text-brand-white ${className}`}>
            {children}{hasAccent && <span className="text-brand-accent">.</span>}
        </h2>
    );
}
