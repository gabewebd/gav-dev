"use client";

import React from "react";

interface HeroHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export default function HeroHeading({ children, className = "" }: HeroHeadingProps) {
    return (
        <h1 className={`font-outfit font-black text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tighter uppercase text-brand-ink dark:text-brand-white mb-8 lg:mb-12 ${className}`}>
            {children}
        </h1>
    );
}
