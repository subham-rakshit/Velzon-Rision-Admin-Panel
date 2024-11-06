import { CommonAuthLayout, ResetPasswordForm } from "@/app/components";
import React from "react";

export const metadata = {
  title: "Basic Password Reset | Velzon - Next Admin & Dashboard Template",
  description:
    "To identify the reset password page for Velzon Admin & Dashboard Template",
};

const ResetPassword = () => {
  return (
    <div className="w-full min-h-[100vh] bg-[#F3F3F9]">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="w-full px-2">
        <div className="relative -top-[100px] sm:-top-[200px] lg:-top-[100px] z-[50] flex flex-col items-center justify-center gap-5">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
