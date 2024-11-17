"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const NavbarThemeSwitcher = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className={`rounded-full p-[9px] flex items-center justify-center ${
        topbarColorType === "dark-color"
          ? "hover:bg-[#4A5A8F]"
          : "hover:bg-[#E6EEFD]"
      }`}
    >
      <span>
        {isDark ? (
          <IoSunnyOutline
            size={22}
            color={`${
              topbarColorType === "dark-color" ? "#B0C4D9" : "#878A99"
            }`}
          />
        ) : (
          <IoMoonOutline
            size={22}
            color={`${
              topbarColorType === "dark-color" ? "#B0C4D9" : "#878A99"
            }`}
          />
        )}
      </span>
    </button>
  );
};

export default NavbarThemeSwitcher;
