"use client";

import React, { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

import {
  AlternateAuthentication,
  PasswordInputFiled,
  TextInputFile,
} from "../..";

import {
  authenticationStart,
  authenticationSuccess,
  authenticationFailure,
} from "@/lib/store/features/userDetails/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const RegistrationForm = () => {
  const [registerationData, setRegistrationData] = useState({});
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setRegistrationData({
      ...registerationData,
      [name]: value,
    });
  };

  //NOTE: Handle the SignUp form
  async function handleFromSubmit(event) {
    event.preventDefault();

    if (Object.keys(registerationData).length > 0) {
      try {
        dispatch(authenticationStart());
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

        if (response.ok && data.success) {
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
          dispatch(authenticationSuccess());
          router.push("/login");
        } else {
          dispatch(authenticationFailure());
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
        dispatch(authenticationFailure());
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
            inputValue={registerationData.email ? registerationData.email : ""}
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
              onHandleInputs={onHandleInputs}
            />
            <p className="text-soft text-[16px] font-normal italic mt-2">
              By registering you agree to the Velzon{" "}
              <Link href="#">
                <span className="underline not-italic text-[#405189] font-semibold">
                  Terms of Use
                </span>
              </Link>
            </p>
          </div>
          {/* Sign up Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#099885] text-white text-[20px] font-hk-grotesk px-2 py-2 rounded-md flex justify-center items-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Sign Up"
            )}
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
      <p className="text-dark text-[20px] font-normal text-center">
        Already have an account?{" "}
        <Link href="/login">
          <span className="underline text-[#405189] font-semibold">Signin</span>
        </Link>
      </p>
    </>
  );
};

export default RegistrationForm;
