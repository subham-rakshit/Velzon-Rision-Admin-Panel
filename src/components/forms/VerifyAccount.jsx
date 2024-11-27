"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import { globalStyleObj } from "@/app/assets/styles";
import ROUTES from "@/constants/routes";

const VerifyAccount = () => {
  const [otpInputs, setOtpInputs] = useState(new Array(4).fill(""));
  const inputBoxRef = useRef([]); // All input box elem will store here as ref
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  // NOTE: Initial set the focus on the first input box
  useEffect(() => {
    if (inputBoxRef.current[0]) {
      inputBoxRef.current[0].focus();
    }
  }, []);

  // NOTE: Handle OnChange
  const handleOnChange = (e, index) => {
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

  // NOTE: Handle Backspace key event
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

  // NOTE: Handle Verify Button clicks
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
          inputBoxRef.current[0].focus();
          router.push(ROUTES.LOGIN); // Redirect to login page
        } else {
          setIsProcessing(false);
          setOtpInputs(new Array(4).fill(""));
          inputBoxRef.current[0].focus();
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
      setOtpInputs(new Array(4).fill(""));
      inputBoxRef.current[0].focus();

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

  return (
    <>
      <form
        onSubmit={handleVerifyAccount}
        className={`${globalStyleObj.formInnerContainer}`}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="rounded-full bg-[#F3F6F9] p-5">
            <AiOutlineMail color="#405189" size="65" />
          </div>

          <div>
            <h1 className={`${globalStyleObj.formHeading}`}>
              Verify Your Email
            </h1>
            <p className={`${globalStyleObj.formDescription}`}>
              Please click the below button to proceed
            </p>
            <p className="text-center font-poppins-sb text-[13px] text-light-weight-400">
              example@abc.com
            </p>
          </div>

          <div className="my-5 flex w-full items-center justify-center gap-4">
            {otpInputs.map((value, index) => {
              return (
                <input
                  key={`box${index + 1}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleOnChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(input) => (inputBoxRef.current[index] = input)}
                  className="size-10 rounded-md border border-gray-300 bg-[#F3F6F9] text-center text-black shadow-light"
                />
              );
            })}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`${globalStyleObj.authButton} w-full ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light-weight-850">Processing...</span>
              </span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>

      <p className={`${globalStyleObj.authDescriptionText}`}>
        Didn&apos;t receive a code ?{" "}
        <Link href={ROUTES.AUTH_OTP_RESEND}>
          <span className="text-[#405189] underline">Resend</span>
        </Link>
      </p>
    </>
  );
};

export default VerifyAccount;
