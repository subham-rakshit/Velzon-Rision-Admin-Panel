"use client";

import React, { useState } from "react";
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
import {
  languagesDetails,
  myCartData,
  notificationsData,
} from "../../../assets/navData/navData";

const Navbar = () => {
  // Left navabr
  const [isToggle, setIsToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  // Right navbar
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.values(languagesDetails)[0]
  );
  const [cartData, setCartData] = useState(myCartData);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(
    notificationsData[0]
  );

  //NOTE Toggle button functionality
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="bg-white h-[60px] sm:h-[70px] px-5 sm:px-[30px] flex items-center justify-between">
      {/* Toggle Button and Form Section */}
      <div className="flex items-center gap-5">
        <ToggleButton handleToggle={handleToggle} toggleStatus={isToggle} />
        <NavSearchBox
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isRecentSearchOpen={isRecentSearchOpen}
          setIsRecentSearchOpen={setIsRecentSearchOpen}
        />
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center gap-[5px] h-full">
        {/* Languages */}
        <NavbarLanguages
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        {/* WebApps */}
        <NavbarWebApps />

        {/* My Cart */}
        <NavbarMyCart cartData={cartData} setCartData={setCartData} />

        {/* Fullscreen Toggle Button */}
        <NavFullScreenToggleButton
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />

        {/* Theme Swicher TODO Convert this through Redux */}
        <NavbarThemeSwitcher isDark={isDark} setIsDark={setIsDark} />

        {/* Notification */}
        <NavbarNotification
          selectedNotification={selectedNotification}
          setSelectedNotification={setSelectedNotification}
        />

        {/* User Profile Avatar Sidebar NOTE need to fetch the register user data */}
        <NavProfile />
      </div>
    </div>
  );
};

export default Navbar;
