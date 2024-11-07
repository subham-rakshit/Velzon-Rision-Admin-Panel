"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

const AlternateAuthentication = () => {
  const handleGoogleLogin = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/admin/dashboard",
      }); // Redirect after successful login
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button className="bg-[#364574] h-9 w-9 rounded-md flex items-center justify-center">
        <FaFacebookF size="20" color="white" />
      </button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="bg-[#CC563D] h-9 w-9 rounded-md flex items-center justify-center"
      >
        <FaGoogle size="20" color="white" />
      </button>
      <div className="flex items-center justify-center bg-black rounded-md w-9 h-9">
        <VscGithub size="20" color="white" />
      </div>
      <div className="bg-[#2385BA] h-9 w-9 rounded-md flex items-center justify-center">
        <FaTwitter size="20" color="white" />
      </div>
    </div>
  );
};

export default AlternateAuthentication;
