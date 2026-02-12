import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "netflix-red": "#E50914",
                "netflix-red-dark": "#B20710",
                "netflix-red-light": "#FF2E2E",
                "netflix-black": "#000000",
                "netflix-dark": "#141414",
                "netflix-gray": "#1A1A1A",
                "netflix-gray-light": "#2A2A2A",
                "netflix-gray-text": "#808080",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
                hero: ["var(--font-anton)", "sans-serif"], // Added hero font
            },
            animation: {
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "grain": "grain 8s steps(10) infinite",
                "scroll-indicator": "scroll-indicator 2s ease-in-out infinite",
                "confetti": "confetti 3s ease-in-out forwards",
                "spotlight": "spotlight 3s ease-in-out infinite",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(229, 9, 20, 0.3)" },
                    "50%": { boxShadow: "0 0 60px rgba(229, 9, 20, 0.6)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "grain": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "10%": { transform: "translate(-5%, -10%)" },
                    "20%": { transform: "translate(-15%, 5%)" },
                    "30%": { transform: "translate(7%, -25%)" },
                    "40%": { transform: "translate(-5%, 25%)" },
                    "50%": { transform: "translate(-15%, 10%)" },
                    "60%": { transform: "translate(15%, 0%)" },
                    "70%": { transform: "translate(0%, 15%)" },
                    "80%": { transform: "translate(3%, 35%)" },
                    "90%": { transform: "translate(-10%, 10%)" },
                },
                "scroll-indicator": {
                    "0%": { opacity: "1", transform: "translateY(0)" },
                    "50%": { opacity: "0.5", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                confetti: {
                    "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
                    "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
                },
                spotlight: {
                    "0%, 100%": { opacity: "0.3" },
                    "50%": { opacity: "0.7" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};

export default config;
