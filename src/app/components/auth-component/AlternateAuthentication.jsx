"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

const AlternateAuthentication = () => {
  // Handle OAuth authentications
  const handleOAuthLogin = async (providerName) => {
    // await signIn("github");
    // await signIn("twitter");

    try {
      const result = await signIn(providerName, {
        redirect: false,
      });

      console.log(result); //TODO
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => handleOAuthLogin("facebook")}
        className="bg-[#364574] h-9 w-9 rounded-md flex items-center justify-center"
      >
        <FaFacebookF size="20" color="white" />
      </button>
      <button
        type="button"
        onClick={() => handleOAuthLogin("google")}
        className="bg-[#CC563D] h-9 w-9 rounded-md flex items-center justify-center"
      >
        <FaGoogle size="20" color="white" />
      </button>
      <button
        type="button"
        onClick={() => handleOAuthLogin("github")}
        className="flex items-center justify-center bg-black rounded-md w-9 h-9"
      >
        <VscGithub size="20" color="white" />
      </button>
      <button
        type="button"
        onClick={() => handleOAuthLogin("twitter")}
        className="bg-[#2385BA] h-9 w-9 rounded-md flex items-center justify-center"
      >
        <FaTwitter size="20" color="white" />
      </button>
    </div>
  );
};

export default AlternateAuthentication;
