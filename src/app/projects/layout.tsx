import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | GAV — Gabrielle Ainshley Velasquez",
    description:
        "Explore the featured projects of Gabrielle Ainshley Velasquez — full-stack applications and responsive web experiences.",
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
