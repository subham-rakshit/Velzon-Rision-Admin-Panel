import localFont from "next/font/local";

import { ToastContainer } from "./clientToastContainer.js";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider.jsx";

export const metadata = {
  title: "Velzon - Next Admin & Dashboard Template",
  description: "A general dashboard template for websites.",
};

const poppinsELi = localFont({
  src: "./assets/fonts/poppinsELi.ttf",
  variable: "--font-poppins--extra-light",
  weight: "200",
});

const poppinsLi = localFont({
  src: "./assets/fonts/poppinsLi.ttf",
  variable: "--font-poppins-light",
  weight: "300",
});

const poppinsRg = localFont({
  src: "./assets/fonts/poppinsRg.ttf",
  variable: "--font-poppins-rg",
  weight: "400",
});

const poppinsMd = localFont({
  src: "./assets/fonts/poppinsMd.ttf",
  variable: "--font-poppins-md",
  weight: "500",
});

const poppinsSb = localFont({
  src: "./assets/fonts/poppinsSb.ttf",
  variable: "--font-poppins-sb",
  weight: "600",
});

const poppinsBo = localFont({
  src: "./assets/fonts/poppinsBo.ttf",
  variable: "--font-poppins-bold",
  weight: "700",
});

const poppinsBl = localFont({
  src: "./assets/fonts/poppinsBl.ttf",
  variable: "--font-poppins-black",
  weight: "900",
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${poppinsRg.variable} ${poppinsMd.variable} ${poppinsBl.variable} ${poppinsBo.variable} ${poppinsLi.variable} ${poppinsELi.variable} ${poppinsSb.variable} antialiased`}
      >
        <AuthProvider>
          <main>{children}</main>

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
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
