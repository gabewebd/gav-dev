import { FaFigma, FaWordpress } from "react-icons/fa";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ContentBlock =
    | { type: 'p'; text: string }
    | { type: 'italic'; text: string }
    | { type: 'role-title'; text: string }
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
    heroImg: string;
    slugImg: string;
    featuredImg: string;
    showcaseImg: string;
    projectRole: string;
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
            { type: 'role-title', text: "Project Lead & Full-Stack Developer" },
            { type: 'p', text: "I architected the entire project using PHP and MySQL. I integrated a custom mini-CMS into the backend admin folder to handle dynamic menu updates and blog publications." },
            { type: 'p', text: "Furthermore, I ensured strict mobile responsiveness across all devices, managed the deployment process using Hostinger, implemented a robust local SEO strategy, and integrated Google Analytics to monitor traffic, user behavior, and overall performance insights." }
        ],
        stack: ["PHP", "MySQL", "CSS", "Hostinger", "SEO", "Custom CMS"],
        techLabel: "PHP · Custom CMS",
        live: "https://danonos.com",
        github: "https://github.com/gabewebd/WSEA",
        heroImg: "/assets/projects/danonos/danonos.png",
        slugImg: "/assets/projects/danonos/danonos-slug.png",
        featuredImg: "/assets/projects/danonos/danonos-featured.png",
        showcaseImg: "/assets/projects/danonos/danonos-showcase.png",
        projectRole: "Project Lead & Full-Stack Developer",
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
            { type: 'role-title', text: "UI/UX Designer & Developer" },
            { type: 'p', text: "I constructed the initial project architecture and established the structural foundation of the Angular application." },
            { type: 'p', text: "I took complete ownership of designing and developing the Employee Directory page. I also rigorously tested and ensured mobile responsiveness across the entire application to guarantee the luxury feel translated perfectly to smaller viewports." }
        ],
        stack: ["Angular", "Tailwind CSS", "TypeScript", "Netlify"],
        techLabel: "Angular · Tailwind CSS",
        live: "https://prelim-project-thefourwhoadore.netlify.app/",
        github: "https://github.com/gabewebd/6AWEB-TheFourWhoAdore",
        heroImg: "/assets/projects/chanel/chanel.png",
        slugImg: "/assets/projects/chanel/chanel-slug.png",
        featuredImg: "/assets/projects/chanel/chanel-featured.png",
        showcaseImg: "/assets/projects/chanel/chanel-showcase.png",
        projectRole: "UI/UX Designer & Developer",
        images: ["/assets/projects/chanel/chanel.png", "/assets/projects/chanel/chanel-products.png", "/assets/projects/chanel/chanel-directory.png"],
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
            { type: 'role-title', text: "Lead Full-Stack Developer and UI/UX Designer" },
            { type: 'p', text: "I built out nearly all the core pages. This included the Quest page, Community feed, Login and Signup flows, Dashboard data visualizations, and Role Management architecture." },
            { type: 'p', text: "I successfully integrated Cloudinary for secure image proof uploads, managed our weekly Agile sprint planning in Notion, and executed the dual-deployment strategy using Vercel for the frontend and Render for the backend." }
        ],
        stack: ["MongoDB", "Express.js", "React", "Node.js", "Cloudinary"],
        techLabel: "MERN Stack",
        live: "https://hauecoquest.vercel.app",
        github: "https://github.com/Josh-Aguiluz/6WCSERVER-Final-Project",
        heroImg: "/assets/projects/hau-ecoquest/hau-ecoquest.png",
        slugImg: "/assets/projects/hau-ecoquest/ecoquest-slug.png",
        featuredImg: "/assets/projects/hau-ecoquest/ecoquest-featured.png",
        showcaseImg: "/assets/projects/hau-ecoquest/ecoquest-showcase.png",
        projectRole: "Full-Stack Developer Lead & UI/UX Designer",
        images: ["/assets/projects/hau-ecoquest/hau-ecoquest.png", "/assets/projects/hau-ecoquest/ecoquest-quests.png", "/assets/projects/hau-ecoquest/ecoquest-community.png", "/assets/projects/hau-ecoquest/ecoquest-leaderboard.png"],
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
                    { type: 'italic', text: "You may skip to the 5:00 minute mark for the system demonstration." },
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
        desc: "A full-stack e-commerce simulation showcasing user authentication, scalable catalog management, and a simulated order processing pipeline that models real transactional workflows.",
        overview: [
            { type: 'p', text: "Wellness Apparel is a comprehensive e-commerce simulation that provides users with the ability to browse and purchase clothing online while offering store owners powerful administrative management tools." },
            { type: 'p', text: "The platform supports a complete digital retail workflow. It handles everything from digital catalog browsing and dynamic shipping address management to complex order fulfillment and an internal notification system between customers and admins. As a conceptual prototype, it is designed to strictly simulate the e-commerce architecture and does not process real monetary transactions." }
        ],
        role: [
            { type: 'role-title', text: "Lead Full-Stack Developer and UI/UX Designer" },
            { type: 'p', text: "I contributed heavily across the entire application ecosystem, initializing the branding assets, building out the login and registration systems, role management protocols, and the user-facing frontend architecture like Home Page, Shop Page, Dashboard data visualizations, Login and Register Pages." },
            { type: 'p', text: "On the backend, I successfully handled the live production deployment of the platform using AwardSpace." }
        ],
        stack: ["PHP", "MySQL", "CSS", "AwardSpace"],
        techLabel: "PHP · MySQL · CSS",
        live: "http://the-wellness-apparel.onlinewebshop.net/",
        github: "https://github.com/gabewebd/the-wellness-apparel",
        heroImg: "/assets/projects/wellness-apparel/wellness-apparel.png",
        slugImg: "/assets/projects/wellness-apparel/wellness-apparel-slug.png",
        featuredImg: "/assets/projects/wellness-apparel/wellness-featured.png",
        showcaseImg: "/assets/projects/wellness-apparel/wellness-showcase.png",
        projectRole: "Full-Stack Developer & UI/UX Designer",
        images: ["/assets/projects/wellness-apparel/wellness-apparel.png", "/assets/projects/wellness-apparel/wellness-shop.png", "/assets/projects/wellness-apparel/wellness-cart.png", "/assets/projects/wellness-apparel/wellness-checkout.png"],
        gallery: [
            { src: "/assets/projects/wellness-apparel/wellness-shop.png", alt: "Shopping Page", caption: "The dynamic digital product catalog where users can browse active inventory." },
            { src: "/assets/projects/wellness-apparel/wellness-cart.png", alt: "Shopping Cart", caption: "The session-based shopping cart handling dynamic stock validation." },
            { src: "/assets/projects/wellness-apparel/wellness-checkout.png", alt: "Checkout Flow", caption: "The checkout pipeline pulling saved user addresses for final order processing." },
        ],
        customSections: [
            {
                id: "system-architecture",
                title: "System Efficiency & Architecture",
                blocks: [
                    { type: 'p', text: "A critical phase of this project was the backend structure. We implemented a highly efficient, interconnected relational system for the MySQL tables to optimize data handling." },
                    { type: 'img', src: '/assets/projects/wellness-apparel/wellness-admin.png', alt: 'Admin Management Panel', caption: 'Administrative dashboard interacting with relational database tables.' },
                    { type: 'p', text: "We successfully isolated user data, multiple shipping addresses, user authentication tokens for persistent logins, product inventory, and nested order lines. This structure ensured data integrity and optimized server retrieval times." }
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
                    { type: 'italic', text: "You may skip to the 8:50 minute mark for the system demonstration." },
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

    {
        id: "05",
        slug: "vrc-designs",
        title: "VRC Designs",
        tagline: "Immersive Digital Portfolio",
        desc: "A highly interactive, visually driven web presence. I leveraged Next.js for blazing-fast performance and GSAP for fluid, complex scroll animations to create a memorable user experience.",
        overview: [
            { type: 'p', text: "VRC Designs needed a digital platform that matched the high caliber of its creative output. The goal wasn't just to build a static brochure, but to craft an engaging digital experience that grabs attention from the very first scroll." },
            { type: 'p', text: "To achieve this, I focused heavily on fluid motion and modern UI aesthetics, ensuring the site feels alive and responsive while maintaining strict performance and SEO standards." }
        ],
        role: [
            { type: 'role-title', text: "Lead Developer & UI Designer" },
            { type: 'p', text: "I architected the frontend utilizing Next.js for its robust routing and server-side rendering capabilities, pairing it with Tailwind CSS for rapid, highly customized styling." },
            { type: 'p', text: "For the interactive elements, I integrated GSAP to build custom timeline animations and scroll-triggered effects, ensuring every micro-interaction felt premium and deliberate." }
        ],
        stack: ["Next.js", "Tailwind CSS", "GSAP", "TypeScript", "Vercel"],
        techLabel: "Next.js · GSAP · Tailwind",
        live: "https://vrc-designs.vercel.app",
        github: "https://github.com/gabewebd/vrc-designs",
        heroImg: "/assets/projects/vrc-designs/vrc-hero.png",
        slugImg: "/assets/projects/vrc-designs/vrc-slug.png",
        featuredImg: "/assets/projects/vrc-designs/vrc-featured.png",
        showcaseImg: "/assets/projects/vrc-designs/vrc-showcase.png",
        projectRole: "Lead Developer & UI Designer",
        images: [
            "/assets/projects/vrc-designs/vrc-hero.png",
            "/assets/projects/vrc-designs/vrc-about.png",
            "/assets/projects/vrc-designs/vrc-work.png"
        ],
        gallery: [
            { src: "/assets/projects/vrc-designs/vrc-hero.png", alt: "VRC Designs Hero Section", caption: "The immersive hero section featuring dynamic GSAP entrance animations." },
            { src: "/assets/projects/vrc-designs/vrc-about.png", alt: "VRC Designs About Page", caption: "Clean, elegant about page layout with smooth transitions." },
            { src: "/assets/projects/vrc-designs/vrc-work.png", alt: "Selected Works Gallery", caption: "A sleek, interactive portfolio grid showcasing the best projects." }
        ],
        customSections: [
            {
                id: "fluid-interactivity",
                title: "Fluid Interactivity with GSAP",
                blocks: [
                    { type: 'p', text: "To make the portfolio truly stand out, static CSS transitions weren't going to cut it. I heavily utilized GSAP (GreenSock Animation Platform) to orchestrate complex sequence animations." },
                    { type: 'p', text: "By tying animations to user scroll events, the content reveals itself naturally as the user navigates down the page. This creates a compelling storytelling effect that keeps visitors engaged longer." },
                    { type: 'img', src: '/assets/projects/vrc-designs/vrc-work.png', alt: 'Interactive Portfolio Grid', caption: 'Scroll-triggered animations built with GSAP bring the project grid to life.' }
                ]
            },
            {
                id: "project-links",
                title: "Project Assets",
                blocks: [
                    {
                        type: 'link-group', links: [
                            { url: 'https://vrc-designs.vercel.app', label: 'Live Link' },
                            { url: 'https://github.com/gabewebd/vrc-designs', label: 'Source Code' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "06",
        slug: "mr-yogurt",
        title: "Mr. Yogurt",
        tagline: "Brand Engineering & System Prototype",
        desc: "A massive UI/UX undertaking to rebrand and architect a comprehensive digital ecosystem for Mr. Yogurt. I mapped out the entire user journey, crafted a playful visual identity, and developed high-fidelity prototypes.",
        overview: [
            { type: 'p', text: "Mr. Yogurt, a popular localized dessert spot known for its DIY froyo experience, needed a digital identity that captured its fun, customizable nature. The challenge was to translate the physical experience of building your own dessert into an intuitive digital interface." },
            { type: 'p', text: "This project was heavily focused on UI/UX research, wireframing, and interactive prototyping. We needed a comprehensive system that could handle everything from standard menus to event packages and an administrative backend, all while maintaining a highly cohesive and energetic brand identity." }
        ],
        role: [
            { type: 'role-title', text: "Lead UI/UX Designer & Brand Strategist" },
            { type: 'p', text: "I constructed the brand engineering process, establishing the color palettes, typography, and core visual motifs (like the signature 'swirls') that would define Mr. Yogurt's digital presence." },
            { type: 'p', text: "Using Figma, I constructed an extensive, fully mapped prototype encompassing the consumer-facing website, a dynamic product catalog, event package flows, and the foundational screens for the administrative portal." }
        ],
        stack: ["Figma", "Adobe CC", "Brand Strategy", "Wireframing", "Prototyping"],
        techLabel: "UI/UX · Figma",
        live: "https://www.figma.com/proto/4MnMOyglVSYztfRAIQivU6/Mr.-Yogurt?page-id=222802%3A2158&node-id=222811-7750&viewport=-120%2C1017%2C0.2&t=bwUhkeiYd99Jy1u7-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=222900%3A4023&show-proto-sidebar=1",
        github: "", // Left blank intentionally as it's a design project
        heroImg: "/assets/projects/mr-yogurt/mryogurt-featured.png",
        slugImg: "/assets/projects/mr-yogurt/mryogurt-featured.png",
        featuredImg: "/assets/projects/mr-yogurt/mryogurt-featured.png",
        showcaseImg: "/assets/projects/mr-yogurt/mryogurt-featured.png",
        projectRole: "UI/UX Designer & Brand Architect",
        images: [
            "/assets/projects/mr-yogurt/mryogurt-featured.png",
            "/assets/projects/mr-yogurt/mryogurt-menu.png",
            "/assets/projects/mr-yogurt/mryogurt-diy.png"
        ],
        gallery: [
            { src: "/assets/projects/mr-yogurt/mryogurt-menu.png", alt: "Digital Menu Interface", caption: "The playful, categorized digital menu featuring soft curves and vibrant imagery." },
            { src: "/assets/projects/mr-yogurt/mryogurt-diy.png", alt: "DIY Process Illustration", caption: "Visual diagrams translating the physical DIY experience for digital users." },
            { src: "/assets/projects/mr-yogurt/mryogurt-customers.png", alt: "Customer Interaction", caption: "Integrating real community photos to build trust and brand authenticity." }
        ],
        customSections: [
            {
                id: "brand-identity",
                title: "Crafting the Visual Language",
                blocks: [
                    { type: 'p', text: "The core of Mr. Yogurt is fun and customization. I developed a visual language built around soft pastels (pinks, blues, and purples) to evoke sweetness, paired with bold, rounded typography to feel approachable and energetic." },
                    { type: 'img', src: '/assets/projects/mr-yogurt/mryogurt-values.png', alt: 'Core Values & Typography', caption: 'Establishing the brand\'s core values through consistent typography and iconography.' },
                    { type: 'p', text: "Every button, modal, and section divider was designed with organic, sweeping curves to mimic the visual of a yogurt swirl, creating a highly cohesive and memorable brand experience." }
                ]
            },
            {
                id: "system-mapping",
                title: "Extensive Prototype Mapping",
                blocks: [
                    { type: 'p', text: "To ensure a seamless user experience, I mapped out the entire digital ecosystem. This wasn't just a few screens; it involved intricate routing for product selections, event package inquiries, customer testimonials, and an administrative portal concept." },
                    { type: 'img', src: '/assets/projects/mr-yogurt/mryogurt-prototype.png', alt: 'Figma Prototype Architecture', caption: 'The complex routing and interactive web architecture built entirely within Figma.' },
                    { type: 'p', text: "This extensive mapping allowed stakeholders to navigate a high-fidelity representation of the final product, testing user flows like event bookings and modal interactions before a single line of code was written." },
                    { type: 'img', src: '/assets/projects/mr-yogurt/mryogurt-events.png', alt: 'Event Packages Screen', caption: 'Clean, tiered pricing tables designed for easy comparison and immediate call-to-action.' }
                ]
            },
            {
                id: "project-links",
                title: "Interactive Prototype",
                blocks: [
                    { type: 'p', text: "You can explore the full interactive prototype directly in Figma to experience the user flows, modal popups, and micro-interactions firsthand." },
                    {
                        type: 'link-group', links: [
                            { url: 'https://www.figma.com/proto/4MnMOyglVSYztfRAIQivU6/Mr.-Yogurt?page-id=222802%3A2158&node-id=222811-7750&viewport=-120%2C1017%2C0.2&t=bwUhkeiYd99Jy1u7-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=222900%3A4023&show-proto-sidebar=1', label: 'View Figma Prototype' }
                        ]
                    }
                ]
            }
        ]
    }
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
            bgImage: p.images[1] || p.slugImg,
            slug: p.slug,
            live: p.live,
            github: p.github,
        };
    });

// ─── MAJOR PROJECTS (first 6 for the projects listing page) ───────────────────

export const MAJOR_PROJECTS = PROJECTS_DATA.filter((p) =>
    ["danonos", "chanel-showcase", "hau-ecoquest", "wellness-apparel", "vrc-designs", "mr-yogurt"].includes(p.slug)
);

// ─── MINOR PROJECTS ───────────────────────────────────────────────────────────

export const MINOR_PROJECTS: MinorProject[] = [
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