"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { PasswordInputFiled } from "..";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";

const ResetPasswordForm = () => {
  const [resetPasswordInput, setResetPasswordInput] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const resetToken = pathname.split("/").pop();

  // NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setResetPasswordInput({
      ...resetPasswordInput,
      [name]: value,
    });
  };

  // NOTE: Handle the Login form
  const handleFromSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(resetPasswordInput).length > 0) {
      try {
        setIsProcessing(true);
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
          setIsProcessing(false);

          router.push(ROUTES.LOGIN); // INFO: redirect to Root page
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
  };

  return (
    <>
      <form
        className={`${globalStyleObj.formInnerContainer}`}
        onSubmit={handleFromSubmit}
      >
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className={`${globalStyleObj.formHeading}`}>
            Create new password
          </h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Your new password must be different from pervious used password.
          </p>
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-3">
          {/* Password Input */}
          <PasswordInputFiled
            labelText="Password"
            inputId="reset-password"
            inputName="newPassword"
            inputValue={
              resetPasswordInput.newPassword
                ? resetPasswordInput.newPassword
                : ""
            }
            helperText="This field is required"
            placeholderText="Enter password"
            userInfo="Must be at least 6 characters."
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
            helperText="Confirm Password Required"
            placeholderText="Confirm password"
            onHandleInputs={onHandleInputs}
          />
          {/* Sign in Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`${globalStyleObj.authButton} mt-3 ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light-weight-850">Processing...</span>
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </form>
      {/* Sign In */}
      <p className={`${globalStyleObj.authDescriptionText}`}>
        Wait, I remember my password...{" "}
        <Link href={ROUTES.LOGIN}>
          <span className="text-[#405189] underline">Click here</span>
        </Link>
      </p>
    </>
  );
};

export default ResetPasswordForm;
