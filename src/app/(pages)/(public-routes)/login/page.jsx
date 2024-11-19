import { titlesObject } from "@/app/assets/titlesData/titles";
import { CommonAuthLayout, LoginForm } from "@/components";

import React from "react";

//NOTE: Login Page meta data
export const metadata = {
  title: titlesObject.login.title,
};

const Login = () => {
  return (
    <div className="auth-section-container">
      {/* Common Background */}
      <CommonAuthLayout />
      {/* Login Form Section */}
      <div className="auth-form-container">
        <div className="main-form-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
