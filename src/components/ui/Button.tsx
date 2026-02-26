"use client";

import Link from "next/link";
import React, { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    icon?: LucideIcon;
    iconPosition?: "left" | "right";
    className?: string;
    target?: string;
    rel?: string;
    ariaLabel?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    iconClassName?: string;
}

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(({
    href,
    onClick,
    children,
    variant = "primary",
    icon: Icon,
    iconPosition = "right",
    className = "",
    target,
    rel,
    ariaLabel,
    disabled,
    type = "button",
    iconClassName = "",
}, ref) => {
    const baseStyles = "group inline-flex items-center justify-center gap-2 md:gap-3 rounded-full font-outfit font-bold uppercase tracking-[0.15em] text-xs md:text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-brand-ink dark:bg-brand-white text-brand-white dark:text-brand-dark px-6 md:px-14 py-3.5 md:py-6 hover:opacity-85",
        secondary: "border border-brand-ink/20 dark:border-brand-white/20 text-brand-ink dark:text-brand-white px-6 md:px-14 py-3.5 md:py-6 hover:bg-brand-ink/5 dark:hover:bg-brand-white/5",
    };

    const content = (
        <>
            {Icon && iconPosition === "left" && (
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${iconPosition === "left" && !iconClassName.includes('group-hover') ? 'group-hover:-translate-y-1' : ''} transition-transform duration-300 ${iconClassName}`} />
            )}
            {children}
            {Icon && iconPosition === "right" && (
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${iconPosition === "right" && !iconClassName.includes('group-hover') ? 'group-hover:translate-x-1.5' : ''} transition-transform duration-300 ${iconClassName}`} />
            )}
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                target={target}
                rel={rel}
                aria-label={ariaLabel}
                ref={ref as React.Ref<HTMLAnchorElement>}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            aria-label={ariaLabel}
            ref={ref as React.Ref<HTMLButtonElement>}
        >
            {content}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
