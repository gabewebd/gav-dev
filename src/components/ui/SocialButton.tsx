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
            border border-brand-white/10
            grid place-items-center
            text-brand-white/85
            hover:text-brand-accent hover:border-brand-accent
            transition-all duration-300 ${className}`}
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </div>
    );
};

export default SocialButton;
