import React from "react";

import {
  NavbarLanguages,
  NavbarMyCart,
  NavbarNotification,
  NavbarSearchSmallDevice,
  NavbarThemeSwitcher,
  NavbarWebApps,
  NavFullScreenToggleButton,
  NavProfile,
  NavSearchBox,
  ToggleButton,
} from "../..";

const Navbar = ({ topbarColorType, layoutModeType }) => {
  return (
    <nav
      className={`background-light900_dark200 flex-between sticky top-0 h-[70px] px-5 shadow-light`}
    >
      <div className="flex-start h-full gap-2 md:gap-5">
        <ToggleButton />
        <NavSearchBox />
      </div>

      <div className="flex-start h-full gap-2 sm:gap-0 lg:gap-2">
        <NavbarSearchSmallDevice />

        <NavbarLanguages />

        <NavbarWebApps
          topbarColorType={topbarColorType}
          layoutModeType={layoutModeType}
        />

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
