import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import ResetPasswordForm from "@/components/authentications/ResetPasswordFrom";

export const metadata = {
  title: titlesObject.authPassChange.title,
};

const ResetPassword = () => {
  return <ResetPasswordForm />;
};

export default ResetPassword;
