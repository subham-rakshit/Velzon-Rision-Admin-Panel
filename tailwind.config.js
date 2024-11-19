const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React components
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth-hero-pattern": "url('/assets/auth-images/auth-one-bg.jpg')",
        "sidebar-snow": "url('/assets/sidebar/img-1.jpg')",
        "sidebar-office": "url('/assets/sidebar/img-2.jpg')",
        "sidebar-pattern": "url('/assets/sidebar/img-3.jpg')",
        "sidebar-bubble": "url('/assets/sidebar/img-4.jpg')",
      },
      fontFamily: {
        "hk-grotesk": ["var(--font-hk-grotesk)"],
        inter: ["var(--font-inter)"],
        jost: ["var(--font-jost)"],
        montserrat: ["var(--font-montserrat)"],
        nunito: ["var(--font-nunito)"],
        "open-sans": ["var(--font-open-sans)"],
        "public-sans": ["var(--font-public-sans)"],
        "work-sans": ["var(--font-work-sans)"],
        outfit: ["var(--font-outfit)"],
        saira: ["var(--font-saira)"],
        "poppins-md": ["var(--font-poppins-md)"],
        "poppins-rg": ["var(--font-poppins-rg)"],
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        dark: {
          100: "#000000",
          200: "#0F1117",
          300: "#151821",
          400: "#212734",
          500: "#212529",
        },
        light: {
          400: "#878a99",
          500: "#405189",
          700: "#DCE3F1",
          800: "#F4F6F8",
          850: "#FDFDFD",
          900: "#FFFFFF",
        },
        accent: {
          800: "#FFF1E6",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
};
