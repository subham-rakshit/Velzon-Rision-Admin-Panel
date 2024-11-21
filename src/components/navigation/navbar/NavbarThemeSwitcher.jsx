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
      className={`hidden sm:flex items-center justify-center rounded-full border p-[5px] sm:p-[10px]`}
    >
      <span>
        {theme === "light" ? (
          <IoMoonOutline size={22} className="icon-light450_dark350" />
        ) : (
          <IoSunnyOutline size={22} className="icon-light450_dark350" />
        )}
      </span>
    </button>
  );
};

export default NavbarThemeSwitcher;
