"use client";

import { useTheme } from "next-themes";
import React from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { globalStyleObj } from "@/app/assets/styles";

const NavbarThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className={`hidden rounded-full p-[5px] hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100 sm:flex sm:items-center sm:justify-center sm:p-[10px]`}
    >
      {theme === "light" ? (
        <IoMoonOutline
          size={20}
          className={`${globalStyleObj.iconLight450Dark350}`}
        />
      ) : (
        <IoSunnyOutline
          size={20}
          className={`${globalStyleObj.iconLight450Dark350}`}
        />
      )}
    </button>
  );
};

export default NavbarThemeSwitcher;
