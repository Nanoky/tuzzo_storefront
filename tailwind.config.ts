// tailwind.config.js
import { nextui } from "@nextui-org/react";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const hideScrollbar = require("tailwind-scrollbar-hide");

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        // ...
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ...colors,
                primary: "#000000",
                secondary: "#EFE7D2",
                tertiary: "#FFFFFF",
                quaternary: "#004040",
            },
        },
        colors: {},
        screens: {
            ...defaultTheme.screens,
            "2xs": "320px",
            xs: "475px",
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    default: {
                        DEFAULT: "#ffffff",
                        foreground: "#000000",
                    },
                    primary: {
                        DEFAULT: "#000000",
                        foreground: "#ffffff",
                    }
                }
            }
        },
        layout: {
            radius: {
                medium: "1.75rem",
            }
        }
    }), hideScrollbar],
};

export default config;
