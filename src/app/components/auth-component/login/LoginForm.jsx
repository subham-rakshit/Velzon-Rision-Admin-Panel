"use client";

import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  AlternateAuthentication,
  PasswordInputFiled,
  RememberMe,
  TextInputFile,
} from "../..";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ rememberMe: false });
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //NOTE: Login from basic API hit
  async function handleFromSubmit(event) {
    event.preventDefault();

    if (Object.keys(loginData).length > 1) {
      try {
        setIsProcessing(true);
        const { email, password, rememberMe } = loginData;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              rememberMe,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          toast.success(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setLoginData({ rememberMe: false });
          setIsProcessing(false);

          router.push("/dashboard"); // Redirect to dashboard page
        } else {
          setIsProcessing(false);
          if (typeof data.message === "string") {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (typeof data.message === "object") {
            Object.values(data.message).map((err, i) =>
              toast.error(err[0], {
                position: "top-right",
                autoClose: 3000 * (i + 1),
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Invalid input field", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <form
        className="bg-white w-full max-w-[450px] px-5 sm:px-8 py-6 rounded-md shadow-light"
        onSubmit={handleFromSubmit}
      >
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className="text-center text-[#405189] font-hk-grotesk font-semibold text-lg mb-2">
            Welcome Back !
          </h1>
          <p className="text-center text-soft text-[18px]">
            Sign in to continue to Velzon
          </p>
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-3">
          {/* Email Input */}
          <TextInputFile
            labelText="Email"
            inputId="login-email"
            inputName="email"
            inputPlaceholder="Enter email"
            inputValue={loginData.email ? loginData.email : ""}
            helperText="Please Enter Your Email"
            onHandleInputs={onHandleInputs}
          />
          {/* Password Input */}
          <PasswordInputFiled
            labelText="Password"
            inputId="login-password"
            inputName="password"
            inputValue={loginData.password ? loginData.password : ""}
            helperText="Please Enter Your Password"
            placeholderText="Enter password"
            onHandleInputs={onHandleInputs}
          />
          {/* RememberMe Input */}
          <RememberMe
            boxId="remember-checkbox"
            boxName="rememberMe"
            checkedStatus={loginData.rememberMe ? loginData.rememberMe : false}
            onHandleInputs={onHandleInputs}
          />
          {/* Sign in Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`bg-[#099885] text-white text-[20px] font-hk-grotesk px-2 py-2 rounded-md flex justify-center items-center ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Sign In"
            )}
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
        <AlternateAuthentication isRememberMe={loginData.isRememberMe} />
      </form>
      {/* Sign Up */}
      <p className="text-dark text-[20px] font-normal text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register">
          <span className="underline text-[#405189] font-semibold">Signup</span>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
