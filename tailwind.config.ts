// tailwind.config.js
import { nextui } from "@nextui-org/react";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors') 

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
                primary: "#99ff99",
                secondary: "#0544A8",
                primaryNew: "#000000",
                secondaryNew: "#EFE7D2",
            }
        },
        colors: {
        },
        screens: {
            ...defaultTheme.screens,
            "2xs": "320px",
            xs: "475px",
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};

export default config;
