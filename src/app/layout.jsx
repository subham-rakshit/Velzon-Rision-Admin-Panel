import localFont from "next/font/local";
import StoreProvider from "./StoreProvider.jsx";
import AuthProvider from "@/context/AuthProvider.jsx";
import { ToastContainer } from "./nextToast.js";
import "react-toastify/dist/ReactToastify.css";
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
      <body className={`${hkGrotesk.variable} antialiased`}>
        {/* Server Component wrapped with Client Component can be done */}
        <AuthProvider>
          <StoreProvider>
            {children}
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
        </AuthProvider>
      </body>
    </html>
  );
}
