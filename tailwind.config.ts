// tailwind.config.js
import { nextui } from "@nextui-org/react";
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        // ...
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
        colors: {
            primary: "#99ff99",
            secondary: "#0544A8",
        },
        screens: {
            '2xs': '320px',
            'xs': '475px',
            ...defaultTheme.screens,
          },
    },
    darkMode: "class",
    plugins: [nextui()],
};

export default config;
