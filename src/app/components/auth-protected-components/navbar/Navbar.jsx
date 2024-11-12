"use client";

import React, { useState } from "react";
import {
  NavbarLanguages,
  NavbarWebApps,
  NavSearchBox,
  ToggleButton,
} from "../..";
import languagesDetails from "../../../assets/languagesData/languagesDetails";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.values(languagesDetails)[0]
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
      <div className="flex items-center gap-1">
        <NavbarLanguages
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <NavbarWebApps />
      </div>
      {/* User Profile Avatar Sidebar */}
    </div>
  );
};

export default Navbar;
