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
import { useAppSelector } from "@/lib/store/hooks";

const Navbar = ({ topbarColorType }) => {
  return (
    <div
      className={`h-[60px] sm:h-[70px] px-5 sm:px-[30px] flex items-center justify-between sticky top-0 shadow-light ${
        topbarColorType === "dark-color" ? "nav-bg-dark" : "bg-white"
      }`}
    >
      {/* Toggle Button and Form Section */}
      <div className="flex items-center gap-2 h-full">
        <ToggleButton />
        <NavSearchBox />
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center gap-[5px] h-full">
        {/* Languages */}
        <NavbarLanguages />

        {/* WebApps */}
        <NavbarWebApps topbarColorType={topbarColorType} />

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
    </div>
  );
};

export default Navbar;
