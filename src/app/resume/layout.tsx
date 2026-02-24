import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume | GAV — Gabrielle Ainshley Velasquez",
    description:
        "View and download the resume of Gabrielle Ainshley Velasquez — Full-Stack Developer.",
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
