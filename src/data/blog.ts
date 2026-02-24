// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    displayDate: string;
    readTime: string;
    category: string;
    featuredImage: string;
}

export type ContentBlock =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'img'; src: string; alt: string; caption?: string }
    | { type: 'quote'; text: string; author?: string }
    | { type: 'video'; url: string; caption?: string }
    | { type: 'link-group'; links: { url: string; label: string }[] };

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "canvas-to-code",
        title: "From Canvas to Code: My Evolution to Full-Stack",
        excerpt: "Looking back at how I started with making simple pages in high school, to designing in Figma, and eventually wrestling with databases to build full-stack applications.",
        date: "2026-02-24",
        displayDate: "Feb 24, 2026",
        readTime: "6 min read",
        category: "Career Journey",
        featuredImage: "/assets/blogs/webdev-journey/developer.png",
    },
    {
        slug: "does-responsive-design-matter",
        title: "How Much Does Responsive Design Really Matter?",
        excerpt: "Spoiler alert: It matters more than you think. Why treating mobile as an afterthought is the fastest way to ruin a good user experience.",
        date: "2026-02-15",
        displayDate: "Feb 15, 2026",
        readTime: "5 min read",
        category: "UI/UX Engineering",
        featuredImage: "/assets/blogs/responsive-design/responsive.png",
    }
];

// ─── BLOG CONTENT ENGINE ──────────────────────────────────────────────────────

export const BLOG_CONTENT: Record<string, ContentBlock[]> = {
    "my-web-dev-journey": [
        { type: 'p', text: "Back in high school around 2018, I used to design user interfaces just for fun. I didn’t even know what 'UI/UX' meant back then; I simply enjoyed arranging elements on a screen. It wasn’t on any formal platform—just me experimenting and figuring out what looked good visually. Sadly, I don’t have any screenshots of those early designs saved." },
        { type: 'p', text: "Fast forward to the pandemic, and suddenly everyone was living online. Having a personal [carrd.co](https://carrd.co) site became a sort of digital introduction. That was my first real experience creating something for the web. It was mostly visual, no heavy coding yet, but I loved making multiple versions of my Carrd just for the process. That’s when I realized how much I enjoyed crafting digital interfaces people could actually visit and interact with." },
        { type: 'h2', text: "The College Reality Check" },
        { type: 'p', text: "Then came college. Joining the BSIT program at Holy Angel University completely changed my perspective. I was finally learning professional tools like Figma and building interfaces from scratch. More importantly, I learned how to turn those static designs into working code." },
        { type: 'p', text: "It was a reality check. Dragging and dropping elements in Canva or [Carrd](https://carrd.co) is one thing, but writing semantic HTML, structuring CSS, and handling the DOM is another level entirely. A visually stunning design means nothing if the underlying code is messy and unorganized." },
        { type: 'h2', text: "Diving Under the Hood" },
        { type: 'p', text: "Learning frontend development naturally sparked my curiosity about what happens behind the scenes. How do users log in? Where does form data go? That curiosity drew me into backend development. Before long, I was sketching normalized database schemas, setting up authentication and user roles, and writing server-side logic in PHP and Node.js for projects like [HAU EcoQuest](/projects/hau-ecoquest). I even learned how to connect forms and interactive features to databases, manage sessions, and ensure smooth data flow across the application." },
        { type: 'img', src: "/assets/blogs/webdev-journey/data-flow.gif", alt: "Diagram showing backend architecture and data flow", caption: "Visualizing how backend logic powers the application" },
        { type: 'p', text: "Now, I find myself comfortably in that 'unicorn' space between design and engineering. I enjoy conceptualizing a brand's identity, designing the interface, and personally writing the backend logic that brings it to life. If you want to see my workflow and the tech stack I use to bring ideas to life, check out my [About Page](/about)." }
    ],
    "does-responsive-design-matter": [
        { type: 'p', text: "We’ve all been there. Hours spent perfectly aligning a CSS grid on a 27-inch monitor, tweaking negative space, making sure the hero section looks flawless. It’s a masterpiece." },
        { type: 'p', text: "Then you open it on your phone. Text overlaps, images get squished, the navigation breaks, and suddenly your masterpiece looks like a broken Word document from 2005." },
        { type: 'h2', text: "The Mobile Reality Check" },
        { type: 'p', text: "When I worked on the digital catalog for [Danono's](/projects/danonos), I truly understood the importance of responsive design. The audience wasn’t at desktop computers—they were students and young professionals in Angeles City, checking menus and locations on their phones." },
        { type: 'img', src: "/assets/blogs/responsive-design/danonos-mobile.png", alt: "Danono's Mobile Interface showcasing a responsive grid.", caption: "Designing for the thumb: keeping the most important actions within easy reach." },
        { type: 'p', text: "If the mobile experience frustrates users, they leave. Your backend can be perfect, but if someone has to pinch and zoom to read or can’t tap a button, it fails. Search engines like Google also penalize non-mobile-friendly sites, hiding your work from the audience." },
        { type: 'h2', text: "Responsive Design as a Tool" },
        { type: 'p', text: "On mobile, screen space is limited, forcing you to prioritize content and hierarchy ruthlessly." },
        { type: 'quote', text: "You can't just hide elements with 'display: none' and call it responsive. You have to adapt the layout to the device." },
        { type: 'p', text: "It means moving from fixed pixels to fluid typography, flexible aspect ratios, and knowing when a multi-column layout needs to collapse gracefully into a single scrollable feed. It takes extra effort—yes, writing Tailwind breakpoints can get tedious—but creating an interface that naturally fits its device separates good developers from great ones. (Check out the fluid layouts in the [Chanel Showcase](/projects/chanel-showcase) for an example)." },
        { type: 'p', text: "Want to see how I apply these responsive strategies in real projects? Browse my [Projects Portfolio](/projects) to see the code and designs in action." }
    ]
};