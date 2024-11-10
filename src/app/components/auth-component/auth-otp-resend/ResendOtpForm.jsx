"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { TextInputFile } from "../..";

import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Player } from "@lordicon/react";

import ICON from "../../../assets/jsonData/animate-mail-2.json"; // Mail Icon JSON file
import { useRouter } from "next/navigation";

const ResendOtpForm = () => {
  const playerRef = useRef(null);
  const [userEmail, setUserEmail] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  //NOTE: Handle the all input fields
  const onHandleInputs = (name, value) => {
    setUserEmail({
      ...userEmail,
      [name]: value,
    });
  };

  //NOTE: Handle the Login form
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
          router.replace("/auth-twostep"); // Redirect Login page
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
      <form
        className="bg-white w-full max-w-[450px] px-5 sm:px-8 py-6 rounded-md shadow-light"
        onSubmit={handleFromSubmit}
      >
        {/* Welcome Text */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="mb-2 text-center auth-heading">Resend OTP?</h1>
          <p className="mb-4 text-center auth-description">
            Resend otp with velzon
          </p>

          <Player
            ref={playerRef}
            size={96}
            icon={ICON}
            speed={0.4}
            colors="primary:#0ab39c"
            className="mx-auto"
            onComplete={() => playerRef.current?.playFromBeginning()}
          />

          <div className="bg-[#FEF4E4] w-full px-3 py-3 rounded shadow-light mt-4">
            <p className="text-[#D49C20] font-poppins-rg text-center text-[17px]">
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
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      </form>

      <p className="text-center auth-direction-text">
        Hold on, I just received my code...{" "}
        <Link href="/auth-twostep">
          <span className="underline text-[#405189]">Click here</span>
        </Link>
      </p>
    </>
  );
};

export default ResendOtpForm;
