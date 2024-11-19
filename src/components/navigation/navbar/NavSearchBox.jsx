"use client";

import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSearch } from "react-icons/md";

import { NavSearchBoxRecentSearches } from "../..";

import { useAppSelector } from "@/lib/store/hooks";

const NavSearchBox = () => {
  const { topbarColorType, layoutModeType } = useAppSelector(
    (state) => state.layout
  );
  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  return (
    <form
      className={`text-soft relative flex min-w-[270px] items-center rounded-[3px] bg-[#f3f3f9] px-4 ${
        topbarColorType === "dark-color"
          ? "nav-search-box-dark"
          : "nav-search-box-light"
      } ${
        layoutModeType === "light"
          ? "nav-search-box-light"
          : "nav-search-box-dark"
      }`}
    >
      <MdSearch size={18} />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={() => setIsRecentSearchOpen(true)}
        className={`flex-1 border-none bg-transparent tracking-wide focus:ring-0 ${layoutModeType === "light" ? "h4-dark-light-mode" : "h4-dark-dark-mode"}`}
        placeholder="Search..."
      />
      {searchInput && (
        <button type="button" onClick={() => setSearchInput("")}>
          <IoMdCloseCircle />
        </button>
      )}

      {searchInput && isRecentSearchOpen && (
        <NavSearchBoxRecentSearches
          isRecentSearchOpen={isRecentSearchOpen}
          setIsRecentSearchOpen={setIsRecentSearchOpen}
          layoutModeType={layoutModeType}
        />
      )}
    </form>
  );
};

export default NavSearchBox;
