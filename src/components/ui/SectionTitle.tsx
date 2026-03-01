"use client";

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
    hasAccent?: boolean;
}

export default function SectionTitle({ children, className = "", hasAccent = true }: SectionTitleProps) {
    return (
        <h2 className={`font-mori font-semibold text-5xl md:text-7xl tracking-tighter leading-none text-brand-ink dark:text-brand-white py-1 ${className}`}>
            {children}{hasAccent && <span className="text-brand-accent">.</span>}
        </h2>
    );
}