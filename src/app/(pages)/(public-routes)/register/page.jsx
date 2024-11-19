import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, RegistrationForm } from "@/components";

import React from "react";

export const metadata = {
  title: titlesObject.register.title,
  description: titlesObject.register.description,
};

const Register = () => {
  return (
    <div className="auth-section-container">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="auth-form-container">
        <div className="main-form-container">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
