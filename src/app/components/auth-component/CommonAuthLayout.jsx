import Image from "next/image";
import React from "react";

const CommonAuthLayout = () => {
  return (
    <div className="relative min-h-[58vh] bg-auth-hero-pattern bg-center bg-cover">
      {/* Blurred Gradient Overlay */}
      <div className="absolute inset-0 bg-[#405582]/90 px-2">
        {/* Content */}
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <Image
            src="/assets/logo-light.png"
            alt="light logo"
            width={120}
            height={20}
            className="bg-cover"
            style={{ width: "auto", height: "auto" }}
          />
          <h1 className="font-hk-grotesk font-semibold text-[#A6ADC4] text-base text-center text-[16px] sm:text-[20px]">
            Premium Admin & Dashboard Template
          </h1>
        </div>
      </div>

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
  );
};

export default CommonAuthLayout;
