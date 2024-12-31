"use client";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { SignInSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

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
      if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password.message,
        });
      }
    } else {
      showErrorToast(data.message);
    }
  };

  // Handle onSubmit function
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/login`,
        {
          ...data,
        }
      );

      if (response.data.success && response.status === 200) {
        showSuccessToast(response.data.message);
        reset();
        router.push(ROUTES.DASHBOARD_ECOMMERCE); // Redirect to dashboard page
      }
    } catch (error) {
      console.log(`Error in login CLIENT: ${error}`);
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
        {/* Email Input */}
        <div className="mb-5">
          <label
            htmlFor="login-email"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Email
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            {...register("email")}
            type="email"
            id="login-email"
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
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="login-password"
              className="text-dark-weight-500 text-[13px] font-poppins-rg"
            >
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>

            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-dark-weight-500 text-[13px] font-poppins-rg"
            >
              Forgot Password
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border border-gray-400 pr-3 mt-2">
            <input
              id="login-password"
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

        {/* RememberMe Input */}
        <div className="mb-5">
          <input
            {...register("rememberMe")}
            type="checkbox"
            id="login-remember-me"
            name="rememberMe"
            placeholder="Enter email address"
            className="rounded-sm border border-gray-400 mr-2"
          />

          <label
            htmlFor="login-remember-me"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Remember me
          </label>

          {errors && errors.rememberMe && (
            <p className="text-[12px] font-poppins-rg text-red-500">
              {errors.rememberMe.message}
            </p>
          )}
        </div>

        {/* Sign in Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${globalStyleObj.authButton} mt-3 w-full ${
            isSubmitting ? "cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-4 font-poppins-rg">
              <ClipLoader color="#ffffff" size={16} />
              <span className="text-light-weight-850">Processing...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
