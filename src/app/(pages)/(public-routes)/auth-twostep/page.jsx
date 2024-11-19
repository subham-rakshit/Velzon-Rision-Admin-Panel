import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, VerifyAccount } from "@/components";

import React from "react";

export const metadata = {
  title: titlesObject.authTwoStep.title,
};

const VerifyEmailAccount = () => {
  return (
    <div className="auth-section-container">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Verify Form Section */}
      <div className="auth-form-container">
        <div className="main-form-container">
          <VerifyAccount />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailAccount;
