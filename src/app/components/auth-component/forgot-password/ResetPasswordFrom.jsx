"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PasswordInputFiled } from "../..";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Image from "next/image";

import {
  authenticationStart,
  authenticationSuccess,
  authenticationFailure,
} from "@/lib/store/features/userDetails/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const ResetPasswordForm = () => {
  const [resetPasswordInput, setResetPasswordInput] = useState({});
  const { loading } = useAppSelector((state) => state.user);

  const router = useRouter();
  const pathname = usePathname();
  const resetToken = pathname.split("/").pop();
  const dispatch = useAppDispatch();

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setResetPasswordInput({
      ...resetPasswordInput,
      [name]: value,
    });
  };

  //NOTE: Handle the Login form
  async function handleFromSubmit(event) {
    event.preventDefault();

    if (Object.keys(resetPasswordInput).length > 0) {
      try {
        dispatch(authenticationStart());
        const { newPassword, confirmPassword } = resetPasswordInput;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword,
              confirmPassword,
              token: resetToken,
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
          setResetPasswordInput({});
          dispatch(authenticationSuccess());

          router.push("/"); // redirect to Home page
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
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className="text-center text-[#405189] font-hk-grotesk font-semibold text-lg mb-2">
            Forgot Password?
          </h1>
          <p className="text-center text-soft text-[18px]">
            Reset password with velzon
          </p>
          <Image
            src="/assets/auth-images/lock.png"
            alt="email gif"
            width={70}
            height={70}
            className="mx-auto my-4"
          />
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-3">
          {/* Password Input */}
          <PasswordInputFiled
            labelText="New Password"
            inputId="reset-password"
            inputName="newPassword"
            inputValue={
              resetPasswordInput.newPassword
                ? resetPasswordInput.newPassword
                : ""
            }
            onHandleInputs={onHandleInputs}
          />
          {/* Confirm Password Input */}
          <PasswordInputFiled
            labelText="Confirm Password"
            inputId="reset-confirm-password"
            inputName="confirmPassword"
            inputValue={
              resetPasswordInput.confirmPassword
                ? resetPasswordInput.confirmPassword
                : ""
            }
            onHandleInputs={onHandleInputs}
          />
          {/* Sign in Button */}
          <button
            type="submit"
            className="bg-[#099885] text-white text-[20px] font-hk-grotesk px-2 py-2 rounded-md flex justify-center items-center"
          >
            {loading ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
      {/* Sign In */}
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

export default ResetPasswordForm;
