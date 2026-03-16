import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";


const ppMori = localFont({
  src: [
    {
      path: "./fonts/PPMori-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPMori-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPMori-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
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

import SmoothScroll from "@/components/SmoothScroll";
import AmbientBackground from "@/components/ui/AmbientBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppMori.variable} ${inter.variable}`}>
      <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      <body className="bg-[#050505] text-[#EDEDED] antialiased transition-colors duration-300 overflow-x-hidden">
        <AmbientBackground />
        <SmoothScroll>
          {/* Glassmorphic Shell */}
          <Navbar />
          <main className="relative min-h-screen">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}