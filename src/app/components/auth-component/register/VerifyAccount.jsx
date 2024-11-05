"use client";

import { Button } from "flowbite-react";
import { usePathname } from "next/navigation";
import React from "react";

const VerifyAccount = () => {
  const pathname = usePathname();
  const tokenId = pathname.split("/").pop();

  const handleVerifyAccount = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/verify-user?token=${tokenId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      router.push(`/verify-account`);
    } else {
      console.log(data.message);
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
          <Button
            type="submit"
            className="bg-[#099885] text-white text-[20px] font-hk-grotesk px-5 rounded-md hover:shadow-light"
          >
            Verify
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VerifyAccount;
