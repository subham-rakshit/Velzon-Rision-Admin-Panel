import { globalStyleObj } from "@/app/assets/styles";
import AuthProtectedLayoutProvider from "@/components/navigation/AuthProtectedLayoutProvider";
import DarkModeProvider from "@/context/DarkModeProvider";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";

const CommonLayoutForAdminAndUser = async ({ children }) => {
  const accessTokenData = await getAccessTokenData();

  return (
    <div
      id="full-screen-toggle-container"
      className={`${globalStyleObj.backgroundLight800Dark600} flex w-full justify-center`}
    >
      <DarkModeProvider>
        <AuthProtectedLayoutProvider accessTokenData={accessTokenData}>
          {children}
        </AuthProtectedLayoutProvider>
      </DarkModeProvider>
    </div>
  );
};

export default CommonLayoutForAdminAndUser;
