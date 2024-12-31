"use client";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { EmailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({ resolver: zodResolver(EmailSchema) });

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
    } else {
      showErrorToast(data.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/forgot-password`,
        {
          ...data,
        }
      );

      if (response.data.success && response.status === 200) {
        showSuccessToast(response.data.message);
        reset();
        router.push(ROUTES.AUTH_PASS_CHANGE);
      }
    } catch (error) {
      console.log(`Error in forgot password CLIENT: ${error}`);
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
        {/* Fogot Password Email Input */}
        <div className="mb-5">
          <label
            htmlFor="forgot-password-email"
            className="text-dark-weight-500 text-[13px] font-poppins-rg"
          >
            Registered Email
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            {...register("email")}
            type="email"
            id="forgot-password-email"
            name="email"
            placeholder="Enter your registered email"
            className="w-full rounded-md border border-gray-400 px-3 py-2 font-poppins-rg text-[13px] text-dark-weight-400 focus:outline-none focus:ring-0 mt-2"
          />

          {errors && errors.email && (
            <p className="text-[12px] font-poppins-rg text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Sign in Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${globalStyleObj.authButton} w-full ${
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

export default ForgotPasswordForm;
