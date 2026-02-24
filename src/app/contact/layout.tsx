import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | GAV — Gabrielle Ainshley Velasquez",
    description:
        "Get in touch with Gabrielle Ainshley Velasquez for freelance projects, development collaborations, or inquiries.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
