import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                brand: {
                    light: "#FAFAFA",
                    "light-alt": "#F0F0F0",
                    dark: "#0A0A0A",
                    "dark-alt": "#111111",
                    accent: "#CCFF00",
                    "accent-muted": "#b8e600",
                    ink: "#111111",
                    white: "#EDEDED",
                },
            },
            fontFamily: {
                outfit: ["var(--font-display)", "sans-serif"],
                manrope: ["var(--font-body)", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;