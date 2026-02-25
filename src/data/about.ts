import {
    Terminal,
    Code2,
    Database,
    Palette,
    Focus,
    ShieldCheck,
    Zap,
    Workflow,
    Tv,
    Gamepad2,
    Video,
    Layers,
    Cpu,
    Fingerprint,
    Music,
} from "lucide-react";

import {
    FaReact,
    FaAngular,
    FaHtml5,
    FaCss3Alt,
    FaPhp,
    FaNodeJs,
    FaTrello,
    FaGithub,
} from "react-icons/fa";

import {
    SiNextdotjs,
    SiTailwindcss,
    SiLaravel,
    SiMysql,
    SiMongodb,
    SiNotion,
    SiCanva,
    SiAdobeillustrator,
    SiAdobephotoshop,
    SiAdobeaftereffects,
    SiExpress,
    SiFigma,
} from "react-icons/si";

// Add this line for the official VS Code icon:
import { VscVscode } from "react-icons/vsc";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type SkillCategory = "frontend" | "backend" | "tools";

export interface Skill {
    name: string;
    icon: React.ElementType;
    category: SkillCategory;
    level: number;
    learning?: boolean;
}

export interface FilterTab {
    label: string;
    value: SkillCategory;
}

export interface SoftSkill {
    title: string;
    desc: string;
    icon: React.ElementType;
}

export interface Interest {
    title: string;
    desc: string;
    icon: React.ElementType;
}

export interface CertItem {
    title: string;
    url: string;
}

export interface Certification {
    issuer: string;
    year: string;
    items: CertItem[];
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

export const SKILLS: Skill[] = [
    { name: "React", icon: FaReact, category: "frontend", level: 90 },
    { name: "Next.js", icon: SiNextdotjs, category: "frontend", level: 88 },
    { name: "Angular", icon: FaAngular, category: "frontend", level: 85 },
    { name: "HTML5", icon: FaHtml5, category: "frontend", level: 95 },
    { name: "CSS3", icon: FaCss3Alt, category: "frontend", level: 93 },
    { name: "Tailwind", icon: SiTailwindcss, category: "frontend", level: 95 },

    { name: "PHP", icon: FaPhp, category: "backend", level: 91 },
    { name: "Laravel", icon: SiLaravel, category: "backend", level: 85 },
    { name: "Node.js", icon: FaNodeJs, category: "backend", level: 80 },
    { name: "Express", icon: SiExpress, category: "backend", level: 78 },
    { name: "MySQL", icon: SiMysql, category: "backend", level: 82 },
    { name: "MongoDB", icon: SiMongodb, category: "backend", level: 80 },

    { name: "VS Code", icon: VscVscode, category: "tools", level: 92 },
    { name: "GitHub", icon: FaGithub, category: "tools", level: 90 },
    { name: "Figma", icon: SiFigma, category: "tools", level: 82 },
    { name: "Illustrator", icon: SiAdobeillustrator, category: "tools", level: 75 },
    { name: "Canva", icon: SiCanva, category: "tools", level: 90 },
    { name: "Photoshop", icon: SiAdobephotoshop, category: "tools", level: 72 },
    { name: "Notion", icon: SiNotion, category: "tools", level: 88 },
    { name: "Trello", icon: FaTrello, category: "tools", level: 88 },
    { name: "After Effects", icon: SiAdobeaftereffects, category: "tools", level: 35, learning: true },
];

export const FILTER_TABS: FilterTab[] = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Tools", value: "tools" },
];

export const SOFT_SKILLS: SoftSkill[] = [
    { title: "Analytical Thinking", desc: "I naturally break down complex problems into smaller, manageable parts to find clear and practical solutions.", icon: Focus },
    { title: "Attention to Detail", desc: "I pay close attention to the small details, from visual polish to backend logic, ensuring everything works smoothly together.", icon: ShieldCheck },
    { title: "Time Management", desc: "I organize my tasks effectively, set clear priorities, and make sure deadlines are consistently met.", icon: Zap },
    { title: "Adaptability", desc: "I’m comfortable adjusting to different roles and challenges, whether working on design concepts or backend implementation.", icon: Workflow },
];

export const INTERESTS: Interest[] = [
    { title: "Reading & Watching Stories", desc: "I enjoy reading and watching story-driven content that explores meaningful themes and different perspectives.", icon: Tv },
    { title: "Visual Design", desc: "I like exploring interface ideas and motion trends, always thinking about how visuals shape user experience.", icon: Palette },
    { title: "Listening to Music", desc: "Music helps me focus, reset, and stay creative, especially when working on deep technical tasks.", icon: Music },
    { title: "Motion Graphics", desc: "I experiment with keyframes, transitions, and visual storytelling using After Effects.", icon: Video },
];

export const CERTIFICATIONS: Certification[] = [
    {
        issuer: "freeCodeCamp",
        year: "2024-2025",
        items: [
            { title: "Responsive Web Design", url: "https://www.freecodecamp.org/certification/fcc29b5be29-0382-4cbc-ac6a-7697d65d3777/responsive-web-design" },
            { title: "JS Algorithms & Data Structures", url: "https://www.freecodecamp.org/certification/fcc29b5be29-0382-4cbc-ac6a-7697d65d3777/javascript-algorithms-and-data-structures" },
            { title: "Back End Development & APIs", url: "https://www.freecodecamp.org/certification/fcc29b5be29-0382-4cbc-ac6a-7697d65d3777/back-end-development-and-apis" },
        ],
    },
    {
        issuer: "HubSpot Academy",
        year: "2025-2026",
        items: [
            { title: "SEO", url: "https://app-na2.hubspot.com/academy/achievements/65nrkw8z/en/1/gabrielle-velasquez/seo " },
            { title: "Digital Marketing", url: "https://app-na2.hubspot.com/academy/achievements/g9gt7wzz/en/1/gabrielle-velasquez/digital-marketing" },
            { title: "Advertising", url: "https://app-na2.hubspot.com/academy/achievements/68wvz9w4/en/1/gabrielle-velasquez/digital-advertising" },
            { title: "Content Marketing", url: "https://app-na2.hubspot.com/academy/achievements/dthq3hr0/en/1/gabrielle-velasquez/content-marketing" },
        ],
    },
];

export interface ExperienceItem {
    role: string;
    company: string;
    location: string;
    period: string;
    points: string[];
}

export interface EducationItem {
    degree: string;
    school: string;
    period: string;
    points: string[];
}

export interface Goal {
    title: string;
    desc: string;
    icon: React.ElementType;
    num: string;
    span: string;
}

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Systems Analyst & Brand Designer",
        company: "Mr. Yogurt",
        location: "Angeles City, Pampanga",
        period: "Sept 2023 – Present",
        points: [
            "Engineered brand identity and advertising assets to establish market presence.",
            "Analyzed POS data to optimize inventory and workflow efficiency.",
            "Developed a strategic migration plan for an internal management system.",
            "Provided guest support and issue resolution through professional customer service.",
        ],
    },
];

export const EDUCATION: EducationItem[] = [
    {
        degree: "BS Information Technology",
        school: "Holy Angel University",
        period: "2023 – 2027",
        points: [
            "Focused on software engineering principles, database management systems, best design practices, and full-stack development.",
            "Consistently demonstrating strong analytical skills in practical laboratory environments.",
            "Relevant Coursework: Web Development, UI/UX Design, Database Systems, Software Engineering, Mobile Development (Flutter).",
        ],
    },
];

export const GOALS: Goal[] = [
    {
        title: "Full-Stack Systems",
        desc: "Building complete web applications from database design to polished user interfaces, with scalability and long-term maintainability in mind.",
        icon: Layers,
        num: "01",
        span: ""
    },
    {
        title: "Systems Architecture",
        desc: "Turning complex ideas into clear, structured, and well-documented technical solutions that are practical and easy to maintain.",
        icon: Cpu,
        num: "02",
        span: ""
    }
];