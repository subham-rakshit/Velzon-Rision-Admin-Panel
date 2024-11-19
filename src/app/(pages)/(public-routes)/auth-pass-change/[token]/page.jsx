import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, ResetPasswordForm } from "@components";
import React from "react";

export const metadata = {
  title: titlesObject.authPassChange.title,
};

const ResetPassword = () => {
  return (
    <div className="auth-section-container">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="auth-form-container">
        <div className="main-form-container">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
