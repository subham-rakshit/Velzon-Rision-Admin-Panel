import React from "react";

import {
  NavbarLanguages,
  NavbarMyCart,
  NavbarNotification,
  NavbarSearchSmallDevice,
  NavbarThemeSwitcher,
  NavbarWebApps,
  NavFullScreenToggleButton,
  NavLogo,
  NavProfile,
  NavSearchBox,
  ToggleButton,
} from "../..";

import { layout } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";

const Navbar = ({ layoutType }) => {
  return (
    <nav
      className={`${globalStyleObj.backgroundLight900Dark200} ${globalStyleObj.flexBetween} sticky top-0 h-[70px] shadow-light ${layoutType === layout.HORIZONTAL ? "px-5 md:px-10 lg:px-[50px]" : "px-5"}`}
    >
      <div className={`${globalStyleObj.flexStart} h-full gap-2 md:gap-5`}>
        {layoutType === layout.HORIZONTAL && <NavLogo />}

        <ToggleButton />
        <NavSearchBox />
      </div>

      <div
        className={`${globalStyleObj.flexStart} h-full gap-2 sm:gap-0 lg:gap-2`}
      >
        <NavbarSearchSmallDevice />

        <NavbarLanguages />

        <NavbarWebApps />

        <NavbarMyCart />

        <NavFullScreenToggleButton />

        <NavbarThemeSwitcher />

        <NavbarNotification />

        <NavProfile />
      </div>
    </nav>
  );
};

export default Navbar;
