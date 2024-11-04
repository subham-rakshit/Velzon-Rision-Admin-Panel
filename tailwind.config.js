/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Flowbite React components
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "auth-hero-pattern": "url('/assets/auth-images/auth-one-bg.jpg')",
      },
      fontFamily: {
        "hk-grotesk": ["var(--font-hk-grotesk)"],
      },
      boxShadow: {
        light: "0 2px 4px rgba(0, 0, 0, 0.1)", // Custom light shadow
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
