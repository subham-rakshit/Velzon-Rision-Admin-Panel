import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";
import { toast } from "react-toastify";

import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const handleLogin = async (provider) => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error occured during login", {
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

  const oAuthBtnStyle = "flex size-9 items-center justify-center rounded-md";

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        // onClick={() => handleLogin("facebook")}
        className={`${oAuthBtnStyle} bg-[#364574]`}
      >
        <FaFacebookF size="20" color="white" />
      </button>
      <button
        type="button"
        onClick={() => handleLogin("google")}
        className={`${oAuthBtnStyle} bg-[#CC563D]`}
      >
        <FaGoogle size="20" color="white" />
      </button>
      <button
        type="button"
        onClick={() => handleLogin("github")}
        className={`${oAuthBtnStyle} bg-black`}
      >
        <VscGithub size="20" color="white" />
      </button>
      <button
        type="button"
        // onClick={() => handleLogin("twitter")}
        className={`${oAuthBtnStyle} bg-[#2385BA]`}
      >
        <FaTwitter size="20" color="white" />
      </button>
    </div>
  );
};

export default SocialAuthForm;
