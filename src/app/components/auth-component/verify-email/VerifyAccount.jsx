"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const VerifyAccount = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const tokenId = pathname.split("/").pop();

  // NOTE: Handle Verify Button clicks
  const handleVerifyAccount = async (e) => {
    e.preventDefault();

    try {
      setIsVerifying(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/verify-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: tokenId }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setIsVerifying(false);
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push(`/login`); // Redirect to login page
      } else {
        setIsVerifying(false);
        if (typeof data.message === "string") {
          toast.error(data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (typeof data.message === "object") {
          Object.values(data.message).map((err, i) =>
            toast.error(err[0], {
              position: "bottom-center",
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
  };

  return (
    <form
      onSubmit={handleVerifyAccount}
      className="bg-white w-full max-w-[450px] px-5 sm:px-8 py-6 rounded-md shadow-light"
    >
      {/* Welcome Text */}
      <div className="mb-6">
        <h1 className="text-center text-[#405189] font-hk-grotesk font-semibold text-lg mb-2">
          Verify Email !
        </h1>
        <p className="text-center text-soft text-[18px]">
          Please click the below button to proceed
        </p>
        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            className="bg-[#099885] text-white text-[20px] font-hk-grotesk px-5 py-2 rounded-md flex justify-center items-center"
          >
            {isVerifying ? (
              <span className="flex items-center gap-4">
                <ClipLoader color="#ffffff" size={16} />
                <span className="text-light">Processing...</span>
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyAccount;