"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface SocialButtonProps {
    icon: LucideIcon;
    label: string;
    className?: string;
    onClick?: () => void;
}

const SocialButton = ({
    icon: Icon,
    label,
    className = "",
}: SocialButtonProps) => {
    return (
        <div
            className={`w-12 h-12 rounded-full
            border border-brand-ink/10 dark:border-brand-white/10
            grid place-items-center
            text-brand-ink/80 dark:text-brand-white/70
            hover:text-brand-ink hover:border-brand-ink 
            dark:hover:text-brand-accent dark:hover:border-brand-accent
            transition-all duration-300 ${className}`}
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </div>
    );
};

export default SocialButton;
