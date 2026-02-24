# GAV | Full-Stack Developer Portfolio

A high-performance, interactive developer portfolio built to showcase creative engineering, web applications, and technical writing. 

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [GSAP](https://gsap.com/) & ScrollTrigger
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend Flow:** Integrated NodeMailer API for seamless contact form transmissions.

## Key Features

- **Fluid Interactions:** Magnetic hover effects, custom cursor tracking, and scroll-triggered physics driven by GSAP.
- **Dark/Light Theming:** Complete UI adaptability with robust state management using `next-themes`.
- **Accessible & SEO Optimized:** Strict adherence to WCAG standards (ARIA tagging) and dynamic Next.js Metadata (Open Graph & Twitter Cards).
- **Responsive Architecture:** Mobile-first approach ensuring optimal layouts across all breakpoints.

## Local Development

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

## Deployment

The architecture of this repository is designed for a zero-configuration deployment to [Vercel](https://vercel.com/). Vercel automatically detects Next.js applications and handles the build process, asset optimization, and Server-Side Rendering (SSR) functionality natively. 

Standard build commands are preserved:
- Build: `next build`
- Install: `npm install`
