import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { ResendOtpForm } from "@/components";

export const metadata = {
  title: titlesObject.authOtpResend.title,
};

const ResendOtp = () => {
  return <ResendOtpForm />;
};

export default ResendOtp;
