import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { LoginForm } from "@/components";

// NOTE: Login Page meta data
export const metadata = {
  title: titlesObject.login.title,
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
