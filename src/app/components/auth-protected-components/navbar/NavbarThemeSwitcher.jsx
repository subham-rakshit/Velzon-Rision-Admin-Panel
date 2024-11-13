"use client";

import React, { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const NavbarThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className="hover:bg-[#E6EEFD] rounded-full p-[9px] flex items-center justify-center"
    >
      <span>
        {isDark ? (
          <IoSunnyOutline size={22} color="#878A99" />
        ) : (
          <IoMoonOutline size={22} color="#878A99" />
        )}
      </span>
    </button>
  );
};

export default NavbarThemeSwitcher;
