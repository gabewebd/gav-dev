"use client";

interface SectionTagProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionTag({ children, className = "" }: SectionTagProps) {
    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <div className="w-2 h-2 bg-brand-accent rounded-sm animate-pulse" />
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-white/85">
                {children}
            </p>
        </div>
    );
}
