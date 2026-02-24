import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | GAV — Gabrielle Ainshley Velasquez",
    description:
        "Articles on full-stack development, design tips, and my journey as a developer by Gabrielle Ainshley Velasquez.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
