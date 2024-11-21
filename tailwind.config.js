const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React components
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // shadcn/ui components
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
          "weight-100": "#f4f4f4",
          "weight-200": "#cbd1d7",
          "weight-300": "#707383",
          "weight-350": "#7f8290",
          "weight-400": "#212734",
          "weight-500": "#212529",
          "weight-550": "#495057",
          "weight-600": "#282529",
        },
        light: {
          "weight-400": "#878a99",
          "weight-450": "#9fa1ad",
          "weight-500": "#405189",
          "weight-550": "#ced4da",
          "weight-800": "#F4F6F8",
          "weight-850": "#ebedf3",
          "weight-900": "#FFFFFF",
        },
        accent: {
          "yankees-blue": "#405189",
          "indigo-blue": "#364574",
          "light-blue": "#548cf3",
        },
      },
      backgroundColor: {
        dark: {
          "dencity-100": "#31363C",
          "dencity-200": "#292E32",
          "dencity-220": "#2f343a",
          "dencity-250": "#292e33",
          "dencity-300": "#262a2f",
          "dencity-350": "#7f8290",
          "dencity-400": "#202328",
          "dencity-500": "#25282C",
          "dencity-600": "#1A1D21",
        },
        light: {
          "dencity-200": "#9fa1ad",
          "dencity-400": "#e6eefd",
          "dencity-700": "#eff2f7",
          "dencity-800": "#f3f3f9",
          "dencity-850": "#f9fbfc",
          "dencity-900": "#FFFFFF",
        },
        custom: {
          "blue-100": "#e1ebfd",
          "blue-200": "#dff0fa",
          "blue-500": "#3577F1",
          "blue-550": "#299CDB",
          "green-100": "#293E4C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
};
