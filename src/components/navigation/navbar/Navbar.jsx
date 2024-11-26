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

const Navbar = ({
  topbarColorType,
  layoutType,
  leftSidbarSizeType,
  toggleButtonStatus,
  leftSidbarSizeMain,
}) => {
  return (
    <nav
      className={`background-light900_dark200 flex-between sticky top-0 h-[70px] shadow-light ${layoutType === layout.HORIZONTAL ? "px-10" : "px-5"}`}
    >
      <div className="flex-start h-full gap-2 md:gap-5">
        {layoutType === layout.HORIZONTAL && <NavLogo />}

        <ToggleButton
          toggleButtonStatus={toggleButtonStatus}
          leftSidbarSizeType={leftSidbarSizeType}
          layoutType={layoutType}
          leftSidbarSizeMain={leftSidbarSizeMain}
        />
        <NavSearchBox leftSidbarSizeType={leftSidbarSizeType} />
      </div>

      <div className="flex-start h-full gap-2 sm:gap-0 lg:gap-2">
        <NavbarSearchSmallDevice />

        <NavbarLanguages />

        <NavbarWebApps topbarColorType={topbarColorType} />

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
