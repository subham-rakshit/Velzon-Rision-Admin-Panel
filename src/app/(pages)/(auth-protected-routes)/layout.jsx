import { AuthProtectedLayoutProvider } from "@/app/components";
import React from "react";

const CommonLayoutForAdminAndUser = ({ children }) => {
  return (
    <div className="" id="full-screen-toggle-container">
      <AuthProtectedLayoutProvider>{children}</AuthProtectedLayoutProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
