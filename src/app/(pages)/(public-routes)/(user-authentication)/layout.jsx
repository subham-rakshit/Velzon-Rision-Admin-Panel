import Image from "next/image";
import React from "react";

const UserAuthenticationLayout = ({ children, ...props }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#F3F3F9]">
      <div className="relative min-h-[50vh] bg-auth-hero-pattern bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#405582]/90 px-2">
          {/* Content */}
          <div className="flex-col-center size-full gap-4">
            <Image
              src="/assets/logo-light.png"
              alt="light logo"
              width={120}
              height={20}
              className="bg-cover"
              style={{ width: "auto", height: "auto" }}
            />
            <h1 className="auth-banner-text">
              Premium Admin & Dashboard Template
            </h1>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
          className="absolute inset-x-0 bottom-0 z-10"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
            fill="#F3F3F9"
          ></path>
        </svg>
      </div>

      <div className="relative min-h-[50vh] w-full">
        <div className="flex-col-center relative top-[-80px] z-[99] w-full gap-4 px-3 sm:px-5">
          {children}
        </div>
        <p className="h4-dark-light-mode absolute bottom-0 left-1/2 mb-5 -translate-x-1/2 text-center">
          © 2024 Velzon Crafted with <span className="text-red-500">❤</span>{" "}
          by Themesbrand
        </p>
      </div>
    </div>
  );
};

export default UserAuthenticationLayout;
