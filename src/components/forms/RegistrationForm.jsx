"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { RegistrationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RegistrationForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm({ resolver: zodResolver(RegistrationSchema) });

  const router = useRouter();

  // Error handling function
  const handleZodValidationErrors = (data) => {
    if (data.errors) {
      const errors = data.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email.message,
        });
      }
      if (errors.username) {
        setError("username", {
          type: "server",
          message: errors.username.message,
        });
      }
      if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password.message,
        });
      }
      if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword.message,
        });
      }
    } else {
      showErrorToast(data.message);
    }
  };

  // Handle form onSubmit function
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/register`,
        {
          ...data,
        }
      );

      if (response.data.success && response.status === 201) {
        showSuccessToast(response.data.message);
        reset();
        router.push(ROUTES.AUTH_TWO_STEP);
      }
    } catch (error) {
      console.log(`Error in Register New User CLIENT: ${error}`);
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
        {/* Username Input */}
        <div className="mb-5">
          <label
            htmlFor="signup-username"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Username
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            {...register("username")}
            type="text"
            id="signup-username"
            name="username"
            placeholder="Enter email full name"
            className="w-full rounded-md border border-gray-400 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0 mt-2"
          />

          {errors && errors.username && (
            <p className="text-[12px] font-poppins-rg text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label
            htmlFor="signup-email"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            {...register("email")}
            type="email"
            id="signup-email"
            name="email"
            placeholder="Enter email address"
            className="w-full rounded-md border border-gray-400 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0 mt-2"
          />

          {errors && errors.email && (
            <p className="text-[12px] font-poppins-rg text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label
            htmlFor="signup-password"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border border-gray-400 pr-3 mt-2">
            <input
              id="signup-password"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              {...register("password")}
              className="w-full border-0 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="text-[16px] text-light-weight-400"
            >
              {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {errors && errors.password ? (
            <p className="mt-2 font-poppins-rg text-[12px] text-red-500">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-5">
          <label
            htmlFor="signup-confirm-password"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Confirm Password
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border border-gray-400 pr-3 mt-2">
            <input
              id="signup-confirm-password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              {...register("confirmPassword")}
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
          {errors && errors.confirmPassword ? (
            <p className="mt-2 font-poppins-rg text-[12px] text-red-500">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <p className={`${globalStyleObj.formDescription} mt-2 italic`}>
          By registering you agree to the Velzon{" "}
          <Link href="#">
            <span className="font-poppins-md not-italic text-[#405189] underline">
              Terms of Use
            </span>
          </Link>
        </p>

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
            "Sign Up"
          )}
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
