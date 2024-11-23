import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

import logoDark from "../../../app/assets/images/logo-dark.png";
import logoLight from "../../../app/assets/images/logo-light.png";

const NavLogo = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "light" ? logoDark : logoLight}
      alt="logo"
      width={100}
      height={40}
      className="mr-2 hidden md:inline"
    />
  );
};

export default NavLogo;
