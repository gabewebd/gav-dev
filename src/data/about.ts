import {
    Terminal,
    Code2,
    Database,
    Palette,
    ShieldCheck,
    Workflow,
    Tv,
    Video,
    Layers,
    Cpu,
    Music,
    Lightbulb,
    Users,
    Shield,
    User,
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
    FaWordpress,
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
    description: string;
    icon: React.ElementType;
}

export interface Interest {
    title: string;
    desc: string;
    icon: React.ElementType;
    image: string; // Added image
}

export interface CertItem {
    title: string;
    url?: string;
    image: string;
}

export interface Certification {
    issuer: string;
    year: string;
    items: CertItem[];
}

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
    { name: "WordPress", icon: FaWordpress, category: "tools", level: 85 },
    { name: "After Effects", icon: SiAdobeaftereffects, category: "tools", level: 35, learning: true },
];

export const FILTER_TABS: FilterTab[] = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Tools", value: "tools" },
];

export const SOFT_SKILLS: SoftSkill[] = [
    {
        title: "Attention to Detail",
        description: "Focusing on the finer points of development and design to ensure precision and prevent oversight.",
        icon: ShieldCheck
    },
    {
        title: "Adaptability",
        description: "Quickly adjusting to new technologies, environments, and shifting project requirements with a strong willingness to learn and patience.",
        icon: Workflow
    },
    {
        title: "Problem Solver",
        description: "Approaching technical roadblocks with a creative and strategic mindset to find effective resolutions.",
        icon: Lightbulb
    },
    {
        title: "Leadership",
        description: "Guiding projects with clarity and purpose while fostering a collaborative and productive atmosphere.",
        icon: Users
    },
    {
        title: "Resilience",
        description: "Maintaining focus and composure under pressure, treating challenges as opportunities for growth.",
        icon: Shield
    },
    {
        title: "Independence",
        description: "Effectively managing individual responsibilities with strong self-discipline and minimal supervision.",
        icon: User
    },
];

export const INTERESTS: Interest[] = [
    {
        title: "Reading & Watching Stories",
        desc: "I love consuming stories in any form—books, shows, or movies. I'm especially drawn to ones that make me think and completely immerse me in their world.",
        icon: Tv,
        image: "/assets/interests/stories.png"
    },
    {
        title: "Visual Design",
        desc: "I enjoy exploring graphic design and UI ideas, experimenting with ways to make things look cleaner, more engaging, and visually appealing.",
        icon: Palette,
        image: "/assets/interests/design.png"
    },
    {
        title: "Listening to Music",
        desc: "My music taste is pretty diverse. I enjoy a wide range of genres depending on my mood, and music helps me stay focused or recharge while working.",
        icon: Music,
        image: "/assets/interests/music.png"
    },
    {
        title: "Video Editing",
        desc: "I enjoy editing videos and putting clips together to create something engaging, whether it’s storytelling, pacing, or experimenting with transitions.",
        icon: Video,
        image: "/assets/interests/motion.png"
    },
];

export const CERTIFICATIONS: Certification[] = [
    {
        issuer: "freeCodeCamp",
        year: "2024-2025",
        items: [
            { title: "Responsive Web Design", url: "https://www.freecodecamp.org/certification/fcc29b5be29-0382-4cbc-ac6a-7697d65d3777/responsive-web-design", image: "/assets/certs/fcc-responsive.png" },
            { title: "JS Algorithms & Data Structures", url: "https://www.freecodecamp.org/certification/fcc29b5be29-0382-4cbc-ac6a-7697d65d3777/javascript-algorithms-and-data-structures", image: "/assets/certs/fcc-js.png" },
            { title: "Back End Development & APIs", url: "https://www.freecodecamp.org/certification/fcc29b5be29-0382-4cbc-ac6a-7697d65d3777/back-end-development-and-apis", image: "/assets/certs/fcc-backend.png" },
        ],
    },
    {
        issuer: "HubSpot Academy",
        year: "2025-2026",
        items: [
            { title: "Search Engine Optimization", url: "https://app-na2.hubspot.com/academy/achievements/65nrkw8z/en/1/gabrielle-velasquez/seo", image: "/assets/certs/hubspot-seo.png" },
            { title: "Digital Marketing", url: "https://app-na2.hubspot.com/academy/achievements/g9gt7wzz/en/1/gabrielle-velasquez/digital-marketing", image: "/assets/certs/hubspot-marketing.png" },
            { title: "Advertising", url: "https://app-na2.hubspot.com/academy/achievements/68wvz9w4/en/1/gabrielle-velasquez/digital-advertising", image: "/assets/certs/hubspot-advertising.png" },
            { title: "Content Marketing", url: "https://app-na2.hubspot.com/academy/achievements/dthq3hr0/en/1/gabrielle-velasquez/content-marketing", image: "/assets/certs/hubspot-content.png" },
        ],
    },
    {
        issuer: "CompTIA",
        year: "2023",
        items: [
            { title: "IT Fundamentals+ (ITF+)", url: "/comptia-itf.pdf", image: "/assets/certs/comptia-itf.png" },
        ],
    },
];

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
            "Dean's Lister & President's Lister.",
            "Focused on software engineering principles, database management systems, system architecture, best design practices, and full-stack development.",
            "Consistently demonstrating strong analytical skills in practical laboratory environments.",
            "Relevant Coursework: Web Development, UI/UX Design, Database Systems, Software Engineering, Mobile Development (Flutter).",
        ],
    },
    {
        degree: "Junior to Senior High School",
        school: "Holy Family Academy",
        period: "2017 – 2023",
        points: [
            "With High Honors.",
            "Developed a versatile foundational understanding across technical and creative disciplines.",
            "Conducted and defended a comprehensive senior research thesis as a leader and team player, refining skills in structured analysis and systematic documentation.",
            "Maintained a high standard of academic performance while fostering core competencies in logical problem-solving and critical thinking.",
        ],
    },
];

export const GOALS: Goal[] = [
    {
        title: "Full-Stack Systems",
        desc: "Building complete web applications from backend architecture to polished user interfaces, with scalability and long-term maintainability in mind.",
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