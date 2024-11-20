import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import ResetPasswordForm from "@/components/forms/ResetPasswordFrom";

export const metadata = {
  title: titlesObject.authPassChange.title,
};

const ResetPassword = () => {
  return <ResetPasswordForm />;
};

export default ResetPassword;
