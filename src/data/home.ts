import {
    Lightbulb,
    Eye,
    PenTool,
    Network,
    Code2,
    Server,
    Palette,
} from "lucide-react";

export const ROTATING_PAIRS = [
    { word: "Ideas", icon: Lightbulb },
    { word: "Visions", icon: Eye },
    { word: "Designs", icon: PenTool },
    { word: "Systems", icon: Network },
];

export const MARQUEE_WORDS = [
    "SYSTEMS ARCHITECTURE",
    "UI/UX DESIGN",
    "FULL-STACK DEVELOPMENT",
    "BRAND IDENTITY",
    "DATABASE DESIGN",
    "API ENGINEERING",
];

export const SERVICES = [
    {
        icon: Code2,
        title: "Frontend Engineering",
        stack: ["React", "Next.js", "Angular", "Tailwind CSS"],
        desc: "Building clean, responsive, and highly interactive user interfaces. I pay close attention to smooth animations, accessibility, and performance so every application feels intuitive and refined.",
    },
    {
        icon: Server,
        title: "Backend Systems",
        stack: ["Laravel (PHP)", "Node.js", "Express", "MongoDB", "MySQL"],
        desc: "Designing secure and scalable backend systems that power reliable applications. From APIs to structured database design, I focus on stability, clarity, and long-term maintainability.",
    },
    {
        icon: Palette,
        title: "UI/UX & Branding",
        stack: ["Figma", "Design Systems", "Prototyping", "Wireframes"],
        desc: "Turning complex ideas into thoughtful, user-centered designs. I connect brand identity with functional interfaces to create experiences that are both visually cohesive and easy to use.",
    },
];

export const TESTIMONIALS = [
    {
        quote: "The brand identity and system migration plan delivered was highly professional. She approaches projects with structured thinking and a clear understanding of the bigger picture.",
        author: "Mr. Yogurt",
        role: "Management Team",
    },
    {
        quote: "Gabrielle has an incredible eye for design. She consistently delivers! Not only visually stunning but also highly intuitive and user-centric.",
        author: "Kian Mercado",
        role: "Project Client",
    }
];
