import React from "react";
import Image from "next/image";
import { CommonAuthLayout, ForgotPasswordForm } from "@/app/components";

export const metadata = {
  title: "Reset Password | Velzon - Next Admin & Dashboard Template",
  description:
    "To identify the Forget Password page for Velzon Admin & Dashboard Template",
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
