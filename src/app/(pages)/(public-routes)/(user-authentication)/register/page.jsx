import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { RegistrationForm } from "@/components";

export const metadata = {
  title: titlesObject.register.title,
  description: titlesObject.register.description,
};

const Register = () => {
  return <RegistrationForm />;
};

export default Register;
