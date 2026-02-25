import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";


/* --- Font Configuration (Rubric: Outfit for Display, Manrope for Body) --- */
const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/* --- SEO Metadata (Rubric Requirement) --- */
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // Updated to local/placeholder to prevent incorrect sharing link
  title: "GAV | Gabrielle Ainshley Velasquez — Full-stack Developer",
  description: "Official portfolio of Gabrielle Ainshley Velasquez. Full-stack development and systems-driven design.",
  openGraph: {
    title: "GAV | Gabrielle Ainshley Velasquez",
    description: "Official portfolio of Gabrielle Ainshley Velasquez. Full-stack development and systems-driven design.",
    url: "/",
    siteName: "GAV Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAV | Gabrielle Ainshley Velasquez",
    description: "Official portfolio of Gabrielle Ainshley Velasquez. Full-stack development and systems-driven design.",
  },
  icons: {
    icon: "/favicons/favicon.ico",
    apple: "/favicons/apple-icon.png",
    shortcut: "/favicons/favicon.ico",
  },
  manifest: "/favicons/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${manrope.variable}`}>
      <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      <body className="bg-brand-light dark:bg-brand-dark text-brand-ink dark:text-brand-white antialiased transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* Glassmorphic Shell */}
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
          <BackToTop />

        </ThemeProvider>
      </body>
    </html>
  );
}