"use client";

import React, { useState } from "react";
import {
  AlternateAuthentication,
  PasswordInputFiled,
  TextInputFile,
} from "../..";
import Link from "next/link";

const RegistrationForm = () => {
  const [loginData, setLoginData] = useState({});

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //NOTE: Handle the SignUp form
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
        {/* Create Text */}
        <div className="mb-6">
          <h1 className="text-center text-[#405189] font-hk-grotesk font-semibold text-lg mb-2">
            Create New Account
          </h1>
          <p className="text-center text-soft text-[18px]">
            Get your free velzon account now
          </p>
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-3">
          {/* Email Input */}
          <TextInputFile
            labelText="Email"
            inputId="sigup-email"
            inputName="email"
            inputPlaceholder="Enter email address"
            onHandleInputs={onHandleInputs}
          />
          {/* Username Input */}
          <TextInputFile
            labelText="Username"
            inputId="sigup-username"
            inputName="username"
            inputPlaceholder="Enter username"
            onHandleInputs={onHandleInputs}
          />
          {/* Password Input */}
          <PasswordInputFiled
            labelText="Password"
            inputId="sigup-password"
            inputName="password"
            onHandleInputs={onHandleInputs}
          />
          {/* Confirm Password Input */}
          <div>
            <PasswordInputFiled
              labelText="Confirm Password"
              inputId="sigup-confirm-password"
              inputName="confirmPassword"
              onHandleInputs={onHandleInputs}
            />
            <p className="text-soft text-[16px] font-normal italic mt-2">
              By registering you agree to the Velzon{" "}
              <Link href="#">
                <span className="underline text-[#405189] font-semibold">
                  Terms of Use
                </span>
              </Link>
            </p>
          </div>
          {/* Sign up Button */}
          <button
            type="submit"
            className="bg-[#099885] text-white text-[20px] font-hk-grotesk px-2 py-2 rounded-md"
          >
            Sign Up
          </button>
        </div>
        <div className="flex items-center gap-2 my-5">
          <hr className="flex-grow border-gray-300 border-dotted border-t-1" />
          <span className="text-dark font-hk-grotesk text-[18px] font-medium">
            Create account with
          </span>
          <hr className="flex-grow border-gray-300 border-dotted border-t-1" />
        </div>
        {/* Alternate Sign in */}
        <AlternateAuthentication />
      </form>
      {/* Sign Up */}
      <p className="text-dark text-[20px] font-normal">
        Already have an account?{" "}
        <Link href="/login">
          <span className="underline text-[#405189] font-semibold">Signin</span>
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
