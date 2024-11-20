"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { TextInputFile } from "..";
import ICON from "../../app/assets/jsonData/animate-mail-2.json";

import ROUTES from "@/constants/routes";

// Dynamically import the Player component to disable SSR
const Player = dynamic(
  () => import("@lordicon/react").then((mod) => mod.Player),
  { ssr: false }
);

const ResendOtpForm = () => {
  const playerRef = useRef(null);
  const [userEmail, setUserEmail] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  // NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setUserEmail({
      ...userEmail,
      [name]: value,
    });
  };

  // NOTE: Handle the Login form
  async function handleFromSubmit(event) {
    event.preventDefault();

    if (Object.keys(userEmail).length > 0) {
      try {
        setIsProcessing(true);
        const { email } = userEmail;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/resend-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
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
          setUserEmail({});
          setIsProcessing(false);
          router.replace(ROUTES.AUTH_TWO_STEP); // Redirect Login page
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
        {/* Welcome Text */}
        <div className="mb-6 flex flex-col items-center">
          <h1 className="form-heading">Resend OTP?</h1>
          <p className="form-description">Resend otp with velzon</p>

          <Player
            ref={playerRef}
            size={96}
            icon={ICON}
            speed={0.4}
            colors="primary:#0ab39c"
            className="mx-auto"
            onComplete={() => playerRef.current?.playFromBeginning()}
          />

          <div className="mt-4 w-full rounded bg-[#FEF4E4] p-3 shadow-light">
            <p className="text-center font-poppins-md text-[13px] text-[#d29c40]">
              Enter your email and otp will be sent to you!
            </p>
          </div>
        </div>

        {/* Form Element */}
        <div className="flex flex-col gap-5">
          {/* Email Input */}
          <TextInputFile
            labelText="Email"
            inputId="resend-otp-email"
            inputName="email"
            inputValue={userEmail.email ? userEmail.email : ""}
            inputPlaceholder="Enter email"
            helperText="Please Enter Your Email"
            onHandleInputs={onHandleInputs}
          />
          {/* Sign in Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`auth-button ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light-850">Processing...</span>
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </form>

      <p className="auth-direction-text text-center">
        Hold on, I just received my code...{" "}
        <Link href={ROUTES.AUTH_TWO_STEP}>
          <span className="text-[#405189] underline">Click here</span>
        </Link>
      </p>
    </>
  );
};

export default ResendOtpForm;
