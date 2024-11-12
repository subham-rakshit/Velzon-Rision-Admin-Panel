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
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
};
