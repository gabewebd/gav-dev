"use client";

import React from "react";

interface HeroHeadingProps {
    children: React.ReactNode;
    className?: string;
}

export default function HeroHeading({ children, className = "" }: HeroHeadingProps) {
    return (
        <h1 className={`font-mori font-semibold text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter text-brand-white mb-8 lg:mb-12 py-1 ${className}`}>
            {children}
        </h1>
    );
}