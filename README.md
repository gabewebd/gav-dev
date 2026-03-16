# GAV | Gabrielle Ainshley Velasquez Portfolio

A technical showcase of high-performance, interactive full-stack systems built with precision and an architectural aesthetic. This portfolio is designed to bridge the gap between complex backend engineering and polished, minimalist design.

## 🏛️ Project Aesthetic
The interface follows a **High-End Studio / Architectural** design language—prioritizing negative space, sophisticated typography (Noto Serif & Mori), and fluid GSAP-driven interactions to create a premium digital experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Native CSS & @theme integration)
- **Animations:** [GSAP](https://gsap.com/) (ScrollTrigger, Custom Cursors, Physics-based movement)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Infrastructure:** NodeMailer for contact services, Vercel for zero-config deployment.

## ✨ Key Features

- **Adaptive Custom Cursors:** Context-aware overlays that react to scrolling and mouse position for a truly interactive navigation layer.
- **Architectural Layouts:** Wide-container project detail pages with an "editorial" feel, synchronized across blogs and case studies.
- **Fluid Parallax:** Optimized scroll-triggered animations that maintain performance while delivering deep visual layers.
- **Mobile-First Excellence:** Fully responsive architecture that translates deep desktop interactions into intuitive mobile experiences.

## 🚀 Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/gabewebd/gav-dev.git
   cd gav-dev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables for the NodeMailer API. Create a `.env.local` file in the root directory:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🌐 Deployment

Designed for seamless deployment on **Vercel**. 
The architecture leverages Next.js Server Components and asset optimization natively.

Standard build commands:
- Build: `next build`
- Install: `npm install`
