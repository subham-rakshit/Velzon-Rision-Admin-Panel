import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { VerifyAccount } from "@/components";

export const metadata = {
  title: titlesObject.authTwoStep.title,
};

const VerifyEmailAccount = () => {
  return <VerifyAccount />;
};

export default VerifyEmailAccount;
