import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { ForgotPasswordForm } from "@/components";

export const metadata = {
  title: titlesObject.forgotPassword.title,
};

const ForgetPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgetPasswordPage;
