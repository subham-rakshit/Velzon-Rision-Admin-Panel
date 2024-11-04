"use client";

import React, { useState } from "react";
import {
  AlternateAuthentication,
  PasswordInputFiled,
  RememberMe,
  TextInputFile,
} from "../..";
import Link from "next/link";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ isRememberMe: false });

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //NOTE: Handle the Login form
  const handleFromSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <>
      <form
        className="bg-white w-full max-w-[450px] px-5 sm:px-8 py-6 rounded-md shadow-light"
        onSubmit={handleFromSubmit}
      >
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className="text-center text-[#405189] font-hk-grotesk font-semibold text-xl">
            Welcome Back !
          </h1>
          <p className="text-center text-soft text-[20px]">
            Sign in to continue to Velzon
          </p>
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-5">
          {/* Email Input */}
          <TextInputFile
            labelText="Email"
            inputId="login-email"
            inputName="email"
            inputPlaceholder="Enter email"
            onHandleInputs={onHandleInputs}
          />
          {/* Password Input */}
          <PasswordInputFiled
            labelText="Password"
            inputId="login-password"
            inputName="password"
            onHandleInputs={onHandleInputs}
          />
          {/* RememberMe Input */}
          <RememberMe
            boxId="remember-checkbox"
            boxName="isRememberMe"
            onHandleInputs={onHandleInputs}
          />
          {/* Sign in Button */}
          <button
            type="submit"
            className="bg-[#099885] text-white text-[20px] font-hk-grotesk px-2 py-2 rounded-md"
          >
            Sign In
          </button>
        </div>
        <div className="flex items-center gap-2 my-5">
          <hr className="flex-grow border-gray-300 border-dotted border-t-1" />
          <span className="text-dark font-hk-grotesk text-[18px] font-medium">
            Sign in with
          </span>
          <hr className="flex-grow border-gray-300 border-dotted border-t-1" />
        </div>
        {/* Alternate Sign in */}
        <AlternateAuthentication />
      </form>
      {/* Sign Up */}
      <p className="text-dark text-[20px] font-normal">
        Don&apos;t have an account?{" "}
        <Link href="/register">
          <span className="underline text-[#405189] font-semibold">Signup</span>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
