import React from "react";

import StoreProvider from "@/app/StoreProvider";
import AuthProtectedLayoutProvider from "@/components/navigation/AuthProtectedLayoutProvider";
import DarkModeProvider from "@/context/DarkModeProvider"

const CommonLayoutForAdminAndUser = ({ children }) => {
  return (
    <div id="full-screen-toggle-container">
      <StoreProvider>
        <DarkModeProvider>
          <AuthProtectedLayoutProvider>{children}</AuthProtectedLayoutProvider>
        </DarkModeProvider>
      </StoreProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
