"use client";

export default function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <h2 className={`font-mori font-semibold text-5xl md:text-7xl tracking-tighter leading-none text-brand-white py-1 ${className}`}>
            {children}
        </h2>
    );
}