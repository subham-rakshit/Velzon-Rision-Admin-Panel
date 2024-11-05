import { CommonAuthLayout, RegistrationForm } from "@/app/components";
import React from "react";

export const metadata = {
  title: "Basic SignUp | Velzon - Next Admin & Dashboard Template",
  description:
    "To identify the SignUp page for Velzon Admin & Dashboard Template",
};

const Register = () => {
  return (
    <div className="w-full min-h-[100vh]">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="w-full bg-[#F3F3F9] px-2">
        <div className="relative -top-[100px] sm:-top-[200px] lg:-top-[100px] z-[50] flex flex-col items-center justify-center gap-5">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
