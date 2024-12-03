import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

import logoDark from "../../../app/assets/images/logo-dark.png";
import logoLight from "../../../app/assets/images/logo-light.png";

import { topbarColor } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { TransitionLink } from "@/components";
import ROUTES from "@/constants/routes";

const NavLogo = ({ topbarColorType }) => {
  const { theme } = useTheme();

  return (
    <TransitionLink href={ROUTES.DASHBOARD_ECOMMERCE}>
      <Image
        src={
          theme === "light" && topbarColorType === topbarColor.LIGHT_COLOR
            ? logoDark
            : logoLight
        }
        alt="logo"
        width={100}
        height={40}
        className="mr-2 hidden md:inline"
      />
    </TransitionLink>
  );
};

export default NavLogo;
