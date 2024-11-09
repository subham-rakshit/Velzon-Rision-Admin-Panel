"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";

const VerifyAccount = () => {
  const [otpInputs, setOtpInputs] = useState(new Array(4).fill(""));
  const inputBoxRef = useRef([]); // All input box elem will store here as ref
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  console.log(otpInputs.join(""));

  //NOTE: Initial set the focus on the first input box
  useEffect(() => {
    if (inputBoxRef.current[0]) {
      inputBoxRef.current[0].focus();
    }
  }, []);

  //NOTE: Handle OnChange
  const handleOnChange = (e, index) => {
    console.log(index);
    console.log(e.target.value);

    const value = e.target.value;

    // Check value isNaN
    if (isNaN(value)) {
      return toast.error("Enter a valid number", {
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

    // Destructure the existing array a store in to a variable
    const newOtpArray = [...otpInputs];

    // Take only the last digit entered in each box and store it at the same index in the array as the box's position
    newOtpArray[index] = value.substring(value.length - 1);

    setOtpInputs(newOtpArray);

    // Handle the next auto focus event
    if (
      value &&
      index < otpInputs.length - 1 &&
      inputBoxRef.current[index + 1]
    ) {
      inputBoxRef.current[newOtpArray.indexOf("")].focus();
    }
  };

  //NOTE: Handle Backspace key event
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otpInputs[index] &&
      index > 0 &&
      inputBoxRef.current[index - 1]
    ) {
      inputBoxRef.current[index - 1].focus();
    }
  };

  //NOTE: Handle Verify Button clicks
  const handleVerifyAccount = async (e) => {
    e.preventDefault();

    const otp = otpInputs.join("");

    if (otp && otp.length === 4) {
      try {
        setIsProcessing(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/verify-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp }),
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
          setIsProcessing(false);
          setOtpInputs(new Array(4).fill(""));
          router.push(`/login`); // Redirect to login page
        } else {
          setIsProcessing(false);
          setOtpInputs(new Array(4).fill(""));
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
                autoClose: 3000 * (i + 1 * 0.0035),
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
      toast.error("Please fill the inputs value properly", {
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

  //NOTE: Handle Resend otp
  const handleRenedOTP = async () => {};

  return (
    <>
      <form
        onSubmit={handleVerifyAccount}
        className="bg-white w-full max-w-[450px] px-5 sm:px-8 py-6 rounded-md shadow-light"
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="bg-[#F3F6F9] p-5 rounded-full">
            <AiOutlineMail color="#405189" size="65" />
          </div>

          <div className="text-center font-hk-grotesk">
            <h1 className="text-center text-[#495057] font-hk-grotesk font-bold text-xl mb-2">
              Verify Your Email
            </h1>
            <p className="text-soft text-[17px]">
              Please click the below button to proceed
            </p>
            <p className="text-[#878A99] font-bold text-[20px]">
              example@abc.com
            </p>
          </div>

          <div className="flex items-center justify-center w-full gap-4 my-5">
            {otpInputs.map((value, index) => {
              return (
                <input
                  key={`box${index + 1}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleOnChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(input) => (inputBoxRef.current[index] = input)}
                  className="w-10 h-10 text-center text-black rounded-md bg-[#F3F6F9] border border-gray-300 shadow-light"
                />
              );
            })}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`bg-[#099885] text-white text-[20px] font-hk-grotesk px-5 py-2 rounded-[6px] flex justify-center items-center w-full ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>

      <p className="text-dark text-[20px] font-normal text-center">
        Didn&apos;t receive a code ?{" "}
        <Link href="/auth-otp-resend">
          <span className="underline text-[#405189] font-base hover:font-semibold">
            Resend
          </span>
        </Link>
      </p>
    </>
  );
};

export default VerifyAccount;
