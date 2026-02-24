import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | GAV — Gabrielle Ainshley Velasquez",
    description:
        "Learn about Gabrielle Ainshley Velasquez — a full-stack developer specializing in Laravel, MERN, and systems-driven design.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
