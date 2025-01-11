"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPasswordForm = () => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

  const router = useRouter();

  // Error handling function
  const handleZodValidationErrors = (data) => {
    if (data.errors) {
      const errors = data.errors;
      Object.keys(errors).forEach((field) => {
        setError(field, {
          type: "server",
          message: errors[field].message,
        });
      });
    } else {
      showErrorToast(data.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/reset-password`,
        {
          ...data,
        }
      );

      if (response.data.success && response.status === 201) {
        showSuccessToast(response.data.message);
        reset();
        router.push(ROUTES.LOGIN); // Redirect to Login page
      }
    } catch (error) {
      console.log(`Error in reset password CLIENT: ${error}`);
      if (error.response) {
        handleZodValidationErrors(error.response.data);
      } else {
        showErrorToast("Internal Server Error. Please try again later.");
      }
    }
  };

  return (
    <>
      {/* Form Element */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Password Reset Code Input */}
        <div className="mb-5">
          <label
            htmlFor="pass-reset-code"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Reset CODE
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border border-gray-400 pr-3 mt-2">
            <input
              id="pass-reset-code"
              type={isCodeVisible ? "text" : "password"}
              name="resetPasswordCode"
              {...register("resetPasswordCode")}
              className="w-full border-0 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0"
              placeholder="Enter your reset code"
            />
            <button
              type="button"
              onClick={() => setIsCodeVisible(!isCodeVisible)}
              className="text-[16px] text-light-weight-400"
            >
              {isCodeVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors && errors.resetPasswordCode ? (
            <p className="mt-2 font-poppins-rg text-[12px] text-red-500">
              {errors.resetPasswordCode.message}
            </p>
          ) : null}
        </div>

        {/* New Password Input */}
        <div className="mb-5">
          <label
            htmlFor="pass-rest-new-pass"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            New Password
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border border-gray-400 pr-3 mt-2">
            <input
              id="pass-rest-new-pass"
              type={isPasswordVisible ? "text" : "password"}
              name="newPassword"
              {...register("newPassword")}
              className="w-full border-0 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="text-[16px] text-light-weight-400"
            >
              {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors && errors.newPassword ? (
            <p className="mt-2 font-poppins-rg text-[12px] text-red-500">
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>

        {/* Confirm New Password Input */}
        <div className="mb-5">
          <label
            htmlFor="pass-reset-confirm-pass"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Confirm New Password
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border border-gray-400 pr-3 mt-2">
            <input
              id="pass-reset-confirm-pass"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmNewPassword"
              {...register("confirmNewPassword")}
              className="w-full border-0 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              className="text-[16px] text-light-weight-400"
            >
              {isConfirmPasswordVisible ? (
                <AiOutlineEye />
              ) : (
                <AiOutlineEyeInvisible />
              )}
            </button>
          </div>
          {errors && errors.confirmNewPassword ? (
            <p className="mt-2 font-poppins-rg text-[12px] text-red-500">
              {errors.confirmNewPassword.message}
            </p>
          ) : null}
        </div>

        {/* Sign up Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${globalStyleObj.authButton} mt-3 w-full ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-4">
              <ClipLoader color="#ffffff" size={16} />
              <span className="text-light-weight-850">Processing...</span>
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
