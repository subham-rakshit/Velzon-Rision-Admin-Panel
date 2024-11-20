"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { SocialAuthForm, PasswordInputFiled, TextInputFile } from "..";

import ROUTES from "@/constants/routes";

const RegistrationForm = () => {
  const [registerationData, setRegistrationData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  // NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setRegistrationData({
      ...registerationData,
      [name]: value,
    });
  };

  // TODO: Registration by Auth.js
  async function handleFromSubmit(event) {
    event.preventDefault();

    if (Object.keys(registerationData).length > 0) {
      try {
        setIsProcessing(true);
        const { email, username, password, confirmPassword } =
          registerationData;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              password,
              confirmPassword,
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
          setRegistrationData({});
          setIsProcessing(false);
          router.push("/auth-twostep"); // Redirect to OTP Verification page
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
      <form className="form-inner-container" onSubmit={handleFromSubmit}>
        {/* Create Text */}
        <div className="mb-6">
          <h1 className="form-heading">Create New Account</h1>
          <p className="form-description">Get your free velzon account now</p>
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-5">
          {/* Email Input */}
          <TextInputFile
            labelText="Email"
            inputId="sigup-email"
            inputName="email"
            inputPlaceholder="Enter email address"
            inputValue={registerationData.email ? registerationData.email : ""}
            helperText="Please Enter Your Email"
            onHandleInputs={onHandleInputs}
          />
          {/* Username Input */}
          <TextInputFile
            labelText="Username"
            inputId="sigup-username"
            inputName="username"
            inputPlaceholder="Enter username"
            inputValue={
              registerationData.username ? registerationData.username : ""
            }
            helperText="Please Enter Your Username"
            onHandleInputs={onHandleInputs}
          />
          {/* Password Input */}
          <PasswordInputFiled
            labelText="Password"
            inputId="sigup-password"
            inputName="password"
            inputValue={
              registerationData.password ? registerationData.password : ""
            }
            helperText="Please enter your password"
            placeholderText="Enter Password"
            onHandleInputs={onHandleInputs}
          />
          {/* Confirm Password Input */}
          <div>
            <PasswordInputFiled
              labelText="Confirm Password"
              inputId="sigup-confirm-password"
              inputName="confirmPassword"
              inputValue={
                registerationData.confirmPassword
                  ? registerationData.confirmPassword
                  : ""
              }
              helperText="Please confirm your password"
              placeholderText="Confirm Password"
              onHandleInputs={onHandleInputs}
            />
            <p className="form-description mt-2 italic">
              By registering you agree to the Velzon{" "}
              <Link href="#">
                <span className="font-poppins-md not-italic text-[#405189] underline">
                  Terms of Use
                </span>
              </Link>
            </p>
          </div>
          {/* Sign up Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`auth-button mt-3 ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light-850">Processing...</span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <div className="my-5 flex items-center gap-2">
          <hr className="grow border-t border-dotted border-gray-300" />
          <span className="auth-direction-text">Create account with</span>
          <hr className="grow border-t border-dotted border-gray-300" />
        </div>
        {/* Alternate Sign in */}
        <SocialAuthForm />
      </form>
      {/* Sign Up */}
      <p className="auth-direction-text">
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN}>
          <span className="text-[#405189] underline">Signin</span>
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
