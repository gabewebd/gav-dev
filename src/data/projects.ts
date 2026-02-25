import { FaFigma, FaWordpress } from "react-icons/fa";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ContentBlock =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'img'; src: string; alt: string; caption?: string }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'video'; url: string; caption?: string }
    | { type: 'link-group'; links: { url: string; label: string }[] };

export interface ProjectImage {
    src: string;
    alt: string;
    caption?: string;
}

export interface ProjectSection {
    id: string;
    title: string;
    blocks: ContentBlock[];
}

export interface ProjectData {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    desc: string;
    overview: ContentBlock[];
    role: ContentBlock[];
    stack: string[];
    techLabel: string;
    live: string;
    github: string;
    heroImg: string;   // Used for Square/Portrait Showcase Cards
    slugImg: string;   // NEW: Used for 100vh Landscape Hero on Project Details
    showcaseImg: string;
    images: string[];
    gallery: ProjectImage[];
    customSections?: ProjectSection[];
}

export interface MinorProject {
    title: string;
    tagline: string;
    stack: string[];
    live: string;
    slug: string;
    icon: React.ElementType;
    image?: string;
}

// ─── UNIFIED PROJECT DATA ─────────────────────────────────────────────────────

export const PROJECTS_DATA: ProjectData[] = [
    {
        id: "01",
        slug: "danonos",
        title: "Danono's",
        tagline: "Brand Identity & Digital Catalog",
        desc: "A comprehensive brand engineering and web platform overhaul for Danono's. I architected a seamless digital presence complete with a custom mini-CMS and deep SEO optimization.",
        overview: [
            { type: 'p', text: "Danono's originally established itself as a localized bakeshop and recently expanded into a scalable franchise network across Central Luzon. Despite its rapid growth, the brand lacked a centralized website. Customers were forced to dig through scattered social media posts to find pricing and menus, resulting in a frustrating user experience." },
            { type: 'p', text: "To solve this problem, we selected Angeles City as our primary digital launchpad to target the highly tech-savvy demographic of students and young professionals. The main objective was to transition the brand into a highly scalable and centralized digital platform." }
        ],
        role: [
            { type: 'p', text: "Project Manager & Full-Stack Developer. I architected the entire project and designed the database from the ground up using PHP and MySQL. I integrated a custom mini-CMS into the backend admin folder to handle dynamic menu updates and blog publications." },
            { type: 'p', text: "Furthermore, I ensured strict mobile responsiveness across all devices, managed the deployment process using Hostinger, and implemented a robust local SEO strategy." }
        ],
        stack: ["PHP", "MySQL", "CSS", "Hostinger", "SEO", "Custom CMS"],
        techLabel: "PHP · Custom CMS",
        live: "https://danonos.com",
        github: "https://github.com/gabewebd/WSEA",
        heroImg: "/assets/projects/danonos/danonos.png",
        slugImg: "/assets/projects/danonos/danonos-slug.png",
        showcaseImg: "/assets/projects/danonos/danonos-showcase.png",
        images: ["/assets/projects/danonos/danonos.png", "/assets/projects/danonos/danonos-favorites.png", "/assets/projects/danonos/danonos-blogs.png", "/assets/projects/danonos/danonos-locations.png"],
        gallery: [
            { src: "/assets/projects/danonos/danonos-favorites.png", alt: "Most Loved Treats Section", caption: "The 'Most Loved Treats' section highlighting popular menu items." },
            { src: "/assets/projects/danonos/danonos-blogs.png", alt: "Danono's Blogs Page", caption: "The dynamic Blogs page, powered by our custom mini-CMS." },
            { src: "/assets/projects/danonos/danonos-locations.png", alt: "Danono's Locations Page", caption: "The Locations page directing users to physical branches." },
        ],
        customSections: [
            {
                id: "design-philosophy",
                title: "Visual Identity & Theme",
                blocks: [
                    { type: 'p', text: "The website's visual identity is designed to be warm, energetic, and appetizing to directly reflect the highly visual nature of Danono's products. We utilized a color palette featuring Burnt Orange and Cream Beige to stimulate appetite while providing a clean canvas for macro food photography." },
                    { type: 'p', text: "For typography, we paired Fredoka for headers to mirror the soft, circular shape of doughnuts, alongside Barlow for efficient, highly legible menu lists." },
                    { type: 'img', src: '/assets/projects/danonos/danonos-favorites.png', alt: 'Danonos Most Loved Treats', caption: 'The Home page displaying the best-selling donuts to capture users\' attention.' }
                ]
            },
            {
                id: "seo-accessibility",
                title: "Technical SEO & The Blogs Page",
                blocks: [
                    { type: 'p', text: "A major focus of this build was ensuring the platform could actually be found by local consumers searching for study spots or desserts. I implemented a comprehensive SEO strategy utilizing both short-tail and long-tail keywords specific to the Pampanga region." },
                    { type: 'p', text: "To maintain high accessibility and search engine ranking standards, specifically for our content-driven Blogs page, I engineered the frontend with descriptive page titles, targeted meta descriptions, meaningful URL structures, strict alt text rules for all images, and proper ARIA labels for screen readers." },
                    { type: 'img', src: '/assets/projects/danonos/danonos-blogs.png', alt: 'Danonos Blog Page', caption: 'Dynamic blog routing powered by the custom mini-CMS.' }
                ]
            },
            {
                id: "project-links",
                title: "Project Assets",
                blocks: [
                    {
                        type: 'link-group', links: [
                            { url: 'https://danonos.com', label: 'Live Link' },
                            { url: 'https://github.com/gabewebd/WSEA', label: 'Source Code' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "02",
        slug: "chanel-showcase",
        title: "Chanel Showcase",
        tagline: "Luxury UI/UX Catalog",
        desc: "A responsive luxury digital catalog focusing on fluid data presentation, modern UI aesthetics, and high-fidelity micro-interactions built with Angular and Tailwind CSS.",
        overview: [
            { type: 'p', text: "This project serves as a digital storefront that immediately immerses visitors in the timeless aesthetic of a luxury fashion maison. It elegantly highlights key product categories like Ready-to-Wear, Handbags, and Fragrance." },
            { type: 'p', text: "The platform functions as a high-end digital catalog where users can seamlessly browse collections, sort items by category or price, and explore the corporate structure of the brand through a dedicated employee directory." }
        ],
        role: [
            { type: 'p', text: "UI/UX Designer & Developer. I constructed the initial project architecture and established the structural foundation of the Angular application." },
            { type: 'p', text: "I took complete ownership of designing and developing the Employee Directory page. I also rigorously tested and ensured mobile responsiveness across the entire application to guarantee the luxury feel translated perfectly to smaller viewports." }
        ],
        stack: ["Angular", "Tailwind CSS", "TypeScript", "Netlify"],
        techLabel: "Angular · Tailwind CSS",
        live: "https://prelim-project-thefourwhoadore.netlify.app/",
        github: "https://github.com/gabewebd/6AWEB-TheFourWhoAdore",
        heroImg: "/assets/projects/chanel/chanel.png",
        slugImg: "/assets/projects/chanel/chanel-slug.png",
        showcaseImg: "/assets/projects/chanel/chanel-showcase.png",
        images: [
            "/assets/projects/chanel/chanel.png",
            "/assets/projects/chanel/chanel-products.png",
            "/assets/projects/chanel/chanel-directory.png"
        ],
        gallery: [
            { src: "/assets/projects/chanel/chanel-products.png", alt: "Product Catalog", caption: "The immersive product catalog featuring sorting, filtering, and high-fidelity hover micro-interactions." },
            { src: "/assets/projects/chanel/chanel-directory.png", alt: "Chanel Employee Directory", caption: "The Employee Directory featuring conditional filtering and elegant UI." },
        ],
        customSections: [
            {
                id: "employee-directory",
                title: "The Employee Directory",
                blocks: [
                    { type: 'p', text: "One of my primary technical contributions was the Employee Directory page. It introduces the team behind the brand and organizes professionals by departments such as Fragrance & Beauty, Jewelry, and Corporate." },
                    { type: 'p', text: "I engineered conditional display logic and filtering systems to allow users to quickly locate employees by department or name. This paired the functional data presentation with an inspirational, brand-aligned user interface." },
                    { type: 'img', src: '/assets/projects/chanel/chanel-directory.png', alt: 'Employee Directory UI', caption: 'Conditional display logic and filtering built with Angular.' }
                ]
            },
            {
                id: "project-links",
                title: "Project Assets",
                blocks: [
                    {
                        type: 'link-group', links: [
                            { url: 'https://prelim-project-thefourwhoadore.netlify.app/', label: 'Live Link' },
                            { url: 'https://github.com/gabewebd/6AWEB-TheFourWhoAdore', label: 'Source Code' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "03",
        slug: "hau-ecoquest",
        title: "HAU EcoQuest",
        tagline: "Gamified Ecological Tracker",
        desc: "A gamified MERN-stack application designed to promote ecological tracking and environmental awareness through highly interactive user challenges and real-time data.",
        overview: [
            { type: 'p', text: "Encouraging consistent sustainable behaviors in a busy campus community is a major challenge. HAU Eco-Quest is a gamified, mobile-first web application created specifically for the Holy Angel University community to turn environmental sustainability into an engaging and collaborative activity." },
            { type: 'p', text: "By transforming routine eco-friendly activities into entertaining quests, the platform promotes community involvement through digital badges, point systems, and friendly rivalry via dynamic leaderboards." }
        ],
        role: [
            { type: 'p', text: "Full-Stack Developer and UI/UX Designer. I designed the MongoDB database schema and built out nearly all the core pages. This included the Quest page, Community feed, Login and Signup flows, Dashboard data visualizations, and Role Management architecture." },
            { type: 'p', text: "I successfully integrated Cloudinary for secure image proof uploads, managed our weekly Agile sprint planning in Notion, and executed the dual-deployment strategy using Vercel for the frontend and Render for the backend." }
        ],
        stack: ["MongoDB", "Express.js", "React", "Node.js", "Cloudinary"],
        techLabel: "MERN Stack",
        live: "https://hauecoquest.vercel.app",
        github: "https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project",
        heroImg: "/assets/projects/hau-ecoquest/hau-ecoquest.png",
        slugImg: "/assets/projects/hau-ecoquest/ecoquest-slug.png",
        showcaseImg: "/assets/projects/hau-ecoquest/ecoquest-showcase.png",
        images: [
            "/assets/projects/hau-ecoquest/hau-ecoquest.png",
            "/assets/projects/hau-ecoquest/ecoquest-quests.png",
            "/assets/projects/hau-ecoquest/ecoquest-community.png",
            "/assets/projects/hau-ecoquest/ecoquest-leaderboard.png"
        ],
        gallery: [
            { src: "/assets/projects/hau-ecoquest/ecoquest-quests.png", alt: "Quests Page", caption: "The main Quests interface where users browse and accept environmental challenges." },
            { src: "/assets/projects/hau-ecoquest/ecoquest-community.png", alt: "Community Feed", caption: "An online community hub where users post updates and participate in weekly challenges." },
            { src: "/assets/projects/hau-ecoquest/ecoquest-leaderboard.png", alt: "HAU Leaderboard", caption: "The live leaderboard where user rankings and scores are prominently displayed." },
        ],
        customSections: [
            {
                id: "gamification-engine",
                title: "Gamification & Community Hub",
                blocks: [
                    { type: 'p', text: "The core of the application is the Quest and Gamification Engine. Users can accept environmental quests, submit photographic proof via our Cloudinary integration, and earn points. The backend automatically calculates scores and awards badges based on complex achievement criteria." },
                    { type: 'p', text: "To keep the momentum going, I built the Community Feed to act as an interactive online hub. Here, students can tackle specific weekly challenges, share their progress, and see what others are doing across the campus." },
                    { type: 'img', src: '/assets/projects/hau-ecoquest/ecoquest-leaderboard.png', alt: 'HAU Leaderboard UI', caption: 'Real-time HAU leaderboard displaying active user rankings.' },
                    { type: 'p', text: "All of this social activity ties directly into the HAU leaderboard. It fosters transparency and a highly competitive environment by displaying real-time user rankings and total accumulated points." }
                ]
            },
            {
                id: "agile-methodology",
                title: "Agile Development Process",
                blocks: [
                    { type: 'p', text: "We developed the platform using Agile Scrum methodologies to allow for maximum flexibility and constant advancement. I managed our weekly sprint cycles using Notion, breaking the four-week development plan into focused deliverables like user authentication, the community hub, and extensive QA testing prior to launch." }
                ]
            },
            {
                id: "project-demo",
                title: "Interactive Demonstration",
                blocks: [
                    { type: 'p', text: "We have recorded a comprehensive video demonstration to walk you through the gamification engine, user dashboard, and quest submission process of the live platform." },
                    {
                        type: 'video',
                        url: 'https://drive.google.com/file/d/1jBZnV-LoXeA1toKPncBZoVZtdlCIDCsB/preview',
                        caption: 'HAU EcoQuest platform walkthrough.'
                    },
                    {
                        type: 'link-group', links: [
                            { url: 'https://hauecoquest.vercel.app', label: 'Live Link' },
                            { url: 'https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project', label: 'Source Code' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "04",
        slug: "wellness-apparel",
        title: "Wellness Apparel",
        tagline: "Full-Stack E-Commerce",
        desc: "A robust full-stack e-commerce platform featuring complex database normalization, user authentication, seamless catalog management, and a secure order processing pipeline.",
        overview: [
            { type: 'p', text: "Wellness Apparel is a comprehensive e-commerce simulation that provides users with the ability to browse and purchase clothing online while offering store owners powerful administrative management tools." },
            { type: 'p', text: "The platform supports a complete digital retail workflow. It handles everything from digital catalog browsing and dynamic shipping address management to complex order fulfillment and an internal notification system between customers and admins. As a conceptual prototype, it is designed to strictly simulate the e-commerce architecture and does not process real monetary transactions." }
        ],
        role: [
            { type: 'p', text: "Full-Stack Developer and UI/UX Designer. I contributed heavily across the entire application ecosystem, initializing the branding assets, building out the login and registration systems, role management protocols, and the user-facing frontend architecture like Home Page, Shop Page, Dashboard data visualizations, Login and Register Pages." },
            { type: 'p', text: "On the backend, I designed the normalized database architecture and successfully handled the live production deployment of the platform using AwardSpace." }
        ],
        stack: ["PHP", "MySQL", "CSS", "AwardSpace"],
        techLabel: "PHP · MySQL · CSS",
        live: "http://the-wellness-apparel.onlinewebshop.net/",
        github: "https://github.com/gabewebd/the-wellness-apparel",
        heroImg: "/assets/projects/wellness-apparel/wellness-apparel.png",
        slugImg: "/assets/projects/wellness-apparel/wellness-apparel-slug.png",
        showcaseImg: "/assets/projects/wellness-apparel/wellness-showcase.png",
        images: [
            "/assets/projects/wellness-apparel/wellness-apparel.png",
            "/assets/projects/wellness-apparel/wellness-shop.png",
            "/assets/projects/wellness-apparel/wellness-cart.png",
            "/assets/projects/wellness-apparel/wellness-checkout.png"
        ],
        gallery: [
            { src: "/assets/projects/wellness-apparel/wellness-shop.png", alt: "Shopping Page", caption: "The dynamic digital product catalog where users can browse active inventory." },
            { src: "/assets/projects/wellness-apparel/wellness-cart.png", alt: "Shopping Cart", caption: "The session-based shopping cart handling dynamic stock validation." },
            { src: "/assets/projects/wellness-apparel/wellness-checkout.png", alt: "Checkout Flow", caption: "The checkout pipeline pulling saved user addresses for final order processing." },
        ],
        customSections: [
            {
                id: "database-architecture",
                title: "Database Normalization & Architecture",
                blocks: [
                    { type: 'p', text: "A critical phase of this project was the database design. We initially started with flat, unnormalized tables which created heavy data redundancy. I took the lead in normalizing the MySQL schema into highly efficient, interconnected relational tables." },
                    { type: 'img', src: '/assets/projects/wellness-apparel/wellness-admin.png', alt: 'Admin Management Panel', caption: 'Administrative dashboard interacting securely with normalized database tables.' },
                    { type: 'p', text: "We successfully isolated user data, multiple shipping addresses, secure authentication tokens for persistent logins, product inventory, and nested order lines. This strict normalization ensured data integrity and optimized server retrieval times." }
                ]
            },
            {
                id: "core-functionalities",
                title: "Core System Functionalities",
                blocks: [
                    { type: 'p', text: "The checkout pipeline was engineered to pull from saved user addresses and insert complex relational data into both the primary orders and orderline tables simultaneously. We also built a highly responsive product catalog for users to easily browse and interact with the digital inventory." }
                ]
            },
            {
                id: "project-demo",
                title: "Interactive Demonstration",
                blocks: [
                    { type: 'p', text: "We have recorded a comprehensive video demonstration to walk you through the e-commerce checkout flow and the administrative database management panel." },
                    {
                        type: 'video',
                        url: 'https://drive.google.com/file/d/1frJTgZWjDmZ9RmT-fH1RoHoi0kVwPe_i/preview',
                        caption: 'Wellness Apparel digital storefront walkthrough.'
                    },
                    {
                        type: 'link-group', links: [
                            { url: 'http://the-wellness-apparel.onlinewebshop.net/', label: 'Live Link' },
                            { url: 'https://github.com/gabewebd/the-wellness-apparel', label: 'Source Code' }
                        ]
                    }
                ]
            }
        ]
    },
];

// ─── SHOWCASE PROJECTS (derived for homepage ProjectShowcase component) ────────

export const SHOWCASE_PROJECTS = PROJECTS_DATA
    .filter((p) => ["danonos", "chanel-showcase", "hau-ecoquest"].includes(p.slug))
    .map((p) => {
        const excludedFromShowcase = ["Hostinger", "SEO", "Netlify", "Cloudinary", "AwardSpace", "Custom CMS"];

        return {
            title: p.title,
            tech: p.techLabel,
            stack: p.stack.filter(tech => !excludedFromShowcase.includes(tech)),
            desc: p.desc,
            image: p.showcaseImg,
            slug: p.slug,
            live: p.live,
            github: p.github,
        };
    });

// ─── MAJOR PROJECTS (first 4 for the projects listing page) ───────────────────

export const MAJOR_PROJECTS = PROJECTS_DATA.filter((p) =>
    ["danonos", "chanel-showcase", "hau-ecoquest", "wellness-apparel"].includes(p.slug)
);

// ─── MINOR PROJECTS ───────────────────────────────────────────────────────────

export const MINOR_PROJECTS: MinorProject[] = [
    {
        title: "Mr. Yogurt",
        tagline: "Brand Engineering & System UI",
        stack: ["Figma", "Adobe CC", "Brand Strategy"],
        live: "https://figma.com/proto/...",
        slug: "mr-yogurt",
        icon: FaFigma,
        image: "/assets/projects/mryogurt-1.png",
    },
    {
        title: "Japan Chronicles",
        tagline: "Editorial CMS Platform",
        stack: ["WordPress", "SEO", "PHP"],
        live: "https://vlsqzgabrielle.wordpress.com",
        slug: "japan-chronicles",
        icon: FaWordpress,
        image: "/assets/projects/japan-1.png",
    },
];