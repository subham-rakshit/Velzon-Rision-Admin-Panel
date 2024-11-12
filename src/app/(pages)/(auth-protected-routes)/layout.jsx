import { AuthProtectedLayoutProvider } from "@/app/components";
import React from "react";

const CommonLayoutForAdminAndUser = ({ children }) => {
  return (
    <div
      className="flex justify-between w-full min-h-[100vh] bg-red-300"
      id="full-screen-toggle-container"
    >
      <AuthProtectedLayoutProvider>{children}</AuthProtectedLayoutProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
