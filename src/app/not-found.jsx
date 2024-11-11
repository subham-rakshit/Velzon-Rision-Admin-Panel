import React from "react";
import { titlesObject } from "./assets/titlesData/titles";

import { MdCopyright, MdHome } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ErrorImage } from "./components";

export const metadata = {
  title: titlesObject.error404.title,
  description: titlesObject.error404.description,
};

const NotFoundPage = () => {
  return (
    <div className="relative w-full min-h-[100vh] bg-[#F3F3F9]">
      {/* Banner Section */}
      <div className="relative min-h-[50vh] sm:min-h-[58vh] bg-auth-hero-pattern bg-center bg-cover">
        <div className="absolute inset-0 bg-[#405582]/90 px-2 w-full"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
          className="absolute bottom-0 left-0 right-0 z-10"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
            fill="#F3F3F9"
          ></path>
        </svg>
      </div>
      {/* Error Description Section */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-2 py-8 sm:px-5">
        {/* Error Message */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl text-[#212529] font-poppins-md font-semibold mb-5">
            404
          </h1>
          <h3 className="text-[23px] sm:text-[28px] text-[#212529] font-poppins-md mb-3">
            Sorry, Page not Found 😭
          </h3>
          <p className="text-[14px] sm:text-[16px] text-[#878A99] font-poppins-rg mb-6">
            The page you are looking for not available!
          </p>
          <Link href="/dashboard">
            <span className="gap-2 auth-button">
              <MdHome />
              <span>Back to home</span>
            </span>
          </Link>
        </div>
        <p className="flex items-center justify-center gap-1 text-soft text-[13px] sm:text-[16px] mt-3">
          <MdCopyright />
          <span>2024 Velzone. Crafted with ❤️ by Themesbrand</span>
        </p>
      </div>
      {/* Error SVG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <ErrorImage />
      </div>
    </div>
  );
};

export default NotFoundPage;
