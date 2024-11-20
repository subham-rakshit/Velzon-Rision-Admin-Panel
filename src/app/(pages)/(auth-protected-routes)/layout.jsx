import React from "react";

import AuthProtectedLayoutProvider from "@/components/layoutsStyle/AuthProtectedLayoutProvider";

const CommonLayoutForAdminAndUser = ({ children }) => {
  return (
    <div className="" id="full-screen-toggle-container">
      <AuthProtectedLayoutProvider>{children}</AuthProtectedLayoutProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
