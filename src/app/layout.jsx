import localFont from "next/font/local";
import "./globals.css";

const hkGrotesk = localFont({
  src: "./assets/fonts/hkGroteskVF.ttf",
  variable: "--font-hk-grotesk",
  weight: "100 300 400 500 600 700 900",
});

export const metadata = {
  title: "Velzon - Next Admin & Dashboard Template",
  description: "A general dashboard template for websites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hkGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
