"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlternateAuthentication,
  PasswordInputFiled,
  RememberMe,
  TextInputFile,
} from "../..";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ isRememberMe: false });
  const [isLoginProcessing, setIsLoginProcessing] = useState(false);

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //NOTE: Handle the Login form
  async function handleFromSubmit(event) {
    event.preventDefault();

    if (Object.keys(loginData).length > 1) {
      try {
        setIsLoginProcessing(true);
        const { email, password, isRememberMe } = loginData;

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
              isRememberMe,
            }),
          }
        );
        const data = await response.json();

        if (response.ok && data.success) {
          toast.success(data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoginData({ isRememberMe: false });
          setIsLoginProcessing(false);
          if (data.userData.isAdmin) {
            router.push("/admin/dashboard"); // redirect to Dashboard page
          } else {
            router.push("/"); // redirect to Home page
          }
        } else {
          setIsLoginProcessing(false);
          if (typeof data.message === "string") {
            toast.error(data.message, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (typeof data.message === "object") {
            Object.values(data.message).map((err, i) =>
              toast.error(err[0], {
                position: "bottom-center",
                autoClose: 3000 * (i + 1),
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Invalid input field", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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
            Forgot Password?
          </h1>
          <p className="text-center text-soft text-[18px]">
            Reset password with velzon
          </p>
          <Image
            src="/assets/auth-images/email.gif"
            alt="email gif"
            width={120}
            height={80}
            color="grren"
            className="mx-auto my-4"
          />
          <div className="bg-[#FEF4E4] w-full px-3 py-3 rounded shadow-light">
            <p className="text-[#D49C20] font-hk-grotesk text-center text-[17px]">
              Enter your email and instructions will be sent to you!
            </p>
          </div>
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
          {/* Sign in Button */}
          <button
            type="submit"
            className="bg-[#099885] text-white text-[20px] font-hk-grotesk px-2 py-2 rounded-md flex justify-center items-center"
          >
            {isLoginProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Send Recet Link"
            )}
          </button>
        </div>
      </form>
      {/* Sign Up */}
      <p className="text-dark text-[20px] font-normal text-center">
        Wait, I remember my password...{" "}
        <Link href="/login">
          <span className="underline text-[#405189] font-semibold">
            Click here
          </span>
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordForm;
