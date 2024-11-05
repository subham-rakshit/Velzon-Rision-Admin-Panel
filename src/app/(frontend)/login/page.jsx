import { CommonAuthLayout, LoginForm } from "@/app/components";
import React from "react";

//NOTE: Login Page meta data
export const metadata = {
  title: "Basic SignIn | Velzon - Next Admin & Dashboard Template",
  description:
    "To identify the SignIn page for Velzon Admin & Dashboard Template",
};

const Login = () => {
  return (
    <div className="w-full min-h-[100vh]">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="w-full bg-[#F3F3F9] px-2">
        <div className="relative -top-[100px] sm:-top-[200px] lg:-top-[100px] z-[50] flex flex-col items-center justify-center gap-5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
