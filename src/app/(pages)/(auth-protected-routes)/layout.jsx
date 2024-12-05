import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import AuthProtectedLayoutProvider from "@/components/navigation/AuthProtectedLayoutProvider";
import DarkModeProvider from "@/context/DarkModeProvider";

const CommonLayoutForAdminAndUser = ({ children }) => {
  return (
    <div
      id="full-screen-toggle-container"
      className={`${globalStyleObj.backgroundLight800Dark600} flex justify-center`}
    >
      <DarkModeProvider>
        <AuthProtectedLayoutProvider>{children}</AuthProtectedLayoutProvider>
      </DarkModeProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
