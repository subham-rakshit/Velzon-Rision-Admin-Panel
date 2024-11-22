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
      className={`sm:flex-center hover:background-light400_dark100 hidden rounded-full p-[5px] sm:p-[10px]`}
    >
      {theme === "light" ? (
        <IoMoonOutline size={20} className="icon-light450_dark350" />
      ) : (
        <IoSunnyOutline size={20} className="icon-light450_dark350" />
      )}
    </button>
  );
};

export default NavbarThemeSwitcher;
