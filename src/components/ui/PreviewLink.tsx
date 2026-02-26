"use client";

import Link from "next/link";
import React from "react";

interface PreviewLinkProps {
    href: string;
    children: React.ReactNode;
    label?: string;
    description?: string;
    className?: string;
    target?: string;
    rel?: string;
}

const PreviewLink = React.forwardRef<HTMLAnchorElement | HTMLDivElement, PreviewLinkProps>(
    ({
        href,
        children,
        label = "View Link",
        description,
        className = "",
        target = "_blank",
        rel = "noopener noreferrer",
    }, ref) => {
        const isExternal = href.startsWith("http") || href.startsWith("mailto:");

        const linkContent = (
            <>
                {children}
                {/* Tooltip */}
                <span className="absolute bottom-full left-0 mb-3 px-4 py-2.5 rounded-xl bg-brand-ink dark:bg-brand-white shadow-2xl opacity-0 scale-95 pointer-events-none group-hover/preview:opacity-100 group-hover/preview:scale-100 transition-all duration-300 origin-bottom-left whitespace-nowrap z-[100] block">
                    <span className="flex flex-col gap-0.5">
                        <span className="text-[10px] sm:text-xs font-bold text-brand-white dark:text-brand-ink tracking-wide">
                            {label} {isExternal ? "↗" : "→"}
                        </span>
                        {description && (
                            <span className="text-[9px] sm:text-[10px] text-brand-white/60 dark:text-brand-ink/70 max-w-[200px] sm:max-w-[260px] truncate block">
                                {description}
                            </span>
                        )}
                    </span>
                    {/* Arrow */}
                    <span className="absolute -bottom-1 left-4 w-2 h-2 bg-brand-ink dark:bg-brand-white rotate-45 block" />
                </span>
            </>
        );

        const commonClasses = `group/preview relative inline-flex items-center ${className}`;

        if (href.startsWith("http") || href.startsWith("mailto:")) {
            return (
                <a
                    href={href}
                    target={target}
                    rel={rel}
                    className={commonClasses}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {linkContent}
                </a>
            );
        }

        return (
            <Link href={href} className={commonClasses} ref={ref as React.Ref<HTMLAnchorElement>}>
                {linkContent}
            </Link>
        );
    }
);

PreviewLink.displayName = "PreviewLink";

export default PreviewLink;
