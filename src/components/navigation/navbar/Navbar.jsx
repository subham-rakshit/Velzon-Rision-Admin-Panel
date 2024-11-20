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
      className={`background-light900_dark200 sticky top-0 flex h-[60px] items-center justify-between px-5 shadow-light dark:bg-dark-600 sm:h-[70px] sm:px-[30px]`}
    >
      {/* Toggle Button and Form Section */}
      <div className="flex h-full items-center gap-2">
        <ToggleButton />
        <NavSearchBox />
      </div>

      {/* Nav Buttons */}
      <div className="flex h-full items-center gap-[5px]">
        {/* Languages */}
        <NavbarLanguages />

        {/* WebApps */}
        <NavbarWebApps
          topbarColorType={topbarColorType}
          layoutModeType={layoutModeType}
        />

        {/* My Cart */}
        <NavbarMyCart />

        {/* Fullscreen Toggle Button */}
        <NavFullScreenToggleButton />

        {/* Theme Swicher TODO Convert this through Redux */}
        <NavbarThemeSwitcher />

        {/* Notification */}
        <NavbarNotification />

        {/* User Profile Avatar Sidebar NOTE need to fetch the register user data */}
        <NavProfile />
      </div>
    </nav>
  );
};

export default Navbar;
