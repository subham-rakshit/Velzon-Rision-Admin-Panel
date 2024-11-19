"use client";

import { useTheme } from "next-themes";
import React from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const NavbarThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className={`flex items-center justify-center rounded-full p-[9px]`}
    >
      <span>
        {theme === "light" ? (
          <IoMoonOutline size={22} color="#878A99" />
        ) : (
          <IoSunnyOutline size={22} color="#878A99" />
        )}
      </span>
    </button>
  );
};

export default NavbarThemeSwitcher;
