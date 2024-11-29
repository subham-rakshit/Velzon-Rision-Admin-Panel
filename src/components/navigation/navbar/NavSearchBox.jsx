"use client";

import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSearch } from "react-icons/md";

import { NavSearchBoxRecentSearches } from "../..";

import { sidebarSize } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/lib/store/hooks";

const NavSearchBox = () => {
  const { leftSidebarSizeType } = useAppSelector((state) => state.layout);
  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  return (
    <form
      className={`text-soft ${globalStyleObj.backgroundLight800Dark300} relative hidden rounded-[3px] bg-[#f3f3f9] px-4 md:flex md:items-center md:justify-center`}
    >
      <MdSearch size={18} />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={() => setIsRecentSearchOpen(true)}
        className={`${globalStyleObj.text13Light550Dark550} border-none bg-transparent tracking-wide focus:ring-0 ${leftSidebarSizeType === sidebarSize.DEFAULT ? "md:w-[100px] lg:w-[180px]" : "w-[180px]"}`}
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
        />
      )}
    </form>
  );
};

export default NavSearchBox;
