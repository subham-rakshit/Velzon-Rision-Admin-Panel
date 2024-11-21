import React from "react";

import {
  NavbarLanguages,
  NavbarMyCart,
  NavbarNotification,
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
      className={`background-light900_dark200 sticky top-0 flex h-[60px] items-center justify-between px-5 shadow-light sm:h-[70px] sm:px-[30px]`}
    >
      <div className="flex h-full items-center gap-2">
        {/* <ToggleButton /> */}
        <NavSearchBox />
      </div>

      <div className="flex h-full items-center gap-[5px]">
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
