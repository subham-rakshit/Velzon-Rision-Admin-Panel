import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, ResendOtpForm } from "@/components";

export const metadata = {
  title: titlesObject.authOtpResend.title,
};

const ResendOtp = () => {
  return (
    <div className="auth-section-container">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="auth-form-container">
        <div className="main-form-container">
          <ResendOtpForm />
        </div>
      </div>
    </div>
  );
};

export default ResendOtp;
