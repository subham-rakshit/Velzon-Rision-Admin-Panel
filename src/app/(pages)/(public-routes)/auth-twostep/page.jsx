import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, VerifyAccount } from "@/app/components";
import React from "react";

export const metadata = {
  title: titlesObject.authTwoStep.title,
};

const VerifyEmailAccount = () => {
  return (
    <div className="w-full min-h-[100vh] bg-[#F3F3F9]">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Verify Form Section */}
      <div className="w-full px-2">
        <div className="relative -top-[100px] sm:-top-[200px] lg:-top-[100px] z-[50] flex flex-col items-center justify-center gap-5">
          <VerifyAccount />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailAccount;
