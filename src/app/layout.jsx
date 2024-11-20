import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "./clientToastContainer.js";
import StoreProvider from "./StoreProvider.jsx";

import { auth } from "@/auth";
import DarkModeProvider from "@/context/DarkModeProvider.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const hkGrotesk = localFont({
  src: "./assets/fonts/hkGroteskVF.ttf",
  variable: "--font-hk-grotesk",
  weight: "100 300 400 500 600 700 900",
});

const inter = localFont({
  src: "./assets/fonts/interVF.ttf",
  variable: "--font-inter",
  weight: "100 300 400 500 600 700 900",
});

const jost = localFont({
  src: "./assets/fonts/jostVF.ttf",
  variable: "--font-jost",
  weight: "100 300 400 500 600 700 900",
});

const montserrat = localFont({
  src: "./assets/fonts/montserratVF.ttf",
  variable: "--font-montserrat",
  weight: "100 300 400 500 600 700 900",
});

const nunito = localFont({
  src: "./assets/fonts/nunitoVF.ttf",
  variable: "--font-nunito",
  weight: "100 300 400 500 600 700 900",
});

const openSans = localFont({
  src: "./assets/fonts/openSansVF.ttf",
  variable: "--font-oepn-sans",
  weight: "100 300 400 500 600 700 900",
});

const outfit = localFont({
  src: "./assets/fonts/outfitVF.ttf",
  variable: "--font-outfit",
  weight: "100 300 400 500 600 700 900",
});

const publicSans = localFont({
  src: "./assets/fonts/publicSansVF.ttf",
  variable: "--font-public-sans",
  weight: "100 300 400 500 600 700 900",
});

const saira = localFont({
  src: "./assets/fonts/sairaVF.ttf",
  variable: "--font-saira",
  weight: "100 300 400 500 600 700 900",
});

const workSans = localFont({
  src: "./assets/fonts/workSansVF.ttf",
  variable: "--font-work-sans",
  weight: "100 300 400 500 600 700 900",
});

const poppinsMd = localFont({
  src: "./assets/fonts/poppinsMd.ttf",
  variable: "--font-poppins-md",
  weight: "600, 500",
});

const poppinsRg = localFont({
  src: "./assets/fonts/poppinsRg.ttf",
  variable: "--font-poppins-rg",
  weight: "500, 400",
});

export const metadata = {
  title: "Velzon - Next Admin & Dashboard Template",
  description: "A general dashboard template for websites.",
};

const RootLayout = async ({ children }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${hkGrotesk.variable} ${inter.variable} ${jost.variable} ${montserrat.variable} ${nunito.variable} ${openSans.variable} ${outfit.variable} ${publicSans.variable} ${saira.variable} ${workSans.variable} ${poppinsRg.variable} ${poppinsMd.variable} antialiased`}
        >
          <StoreProvider>
            <DarkModeProvider>{children}</DarkModeProvider>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </StoreProvider>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
