import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, ForgotPasswordForm } from "@/components";

export const metadata = {
  title: titlesObject.forgotPassword.title,
};

const ForgetPasswordPage = () => {
  return (
    <div className="auth-section-container">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="auth-form-container">
        <div className="main-form-container">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
