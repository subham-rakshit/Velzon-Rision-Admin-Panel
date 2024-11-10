import React from "react";
import { CommonAuthLayout, ForgotPasswordForm } from "@/app/components";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.forgotPassword.title,
  description: titlesObject.forgotPassword.description,
};

const ForgetPasswordPage = () => {
  return (
    <div className="w-full min-h-[100vh] bg-[#F3F3F9]">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="w-full bg-[#F3F3F9] px-2">
        <div className="relative -top-[100px] sm:-top-[200px] lg:-top-[100px] z-[50] flex flex-col items-center justify-center gap-5">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
