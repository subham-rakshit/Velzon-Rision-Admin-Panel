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

const Navbar = () => {
  console.log("I am Main Navbar");

  return (
    <div className="bg-white h-[60px] sm:h-[70px] px-5 sm:px-[30px] flex items-center justify-between">
      {/* Toggle Button and Form Section */}
      <div className="flex items-center gap-5">
        <ToggleButton />
        <NavSearchBox />
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center gap-[5px] h-full">
        {/* Languages */}
        <NavbarLanguages />

        {/* WebApps */}
        <NavbarWebApps />

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
