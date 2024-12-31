"use client";

import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSearch } from "react-icons/md";

import { NavSearchBoxRecentSearches } from "../..";

import {
  sidebarSize,
  topbarColor,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";

const NavSearchBox = () => {
  const { leftSidebarSizeType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );
  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  return (
    <form
      className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.backgroundLight800Dark300} text-soft` : `bg-[#fff]/10`} relative hidden rounded-[3px] px-4 md:flex md:items-center md:justify-center`}
    >
      <MdSearch
        size={18}
        className={`${topbarColorType !== topbarColor.LIGHT_COLOR && `${globalStyleObj.topbarDarkIconColor}`}`}
      />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={() => setIsRecentSearchOpen(true)}
        className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.text13Light550Dark550}` : `font-poppins-rg text-[13px] text-light-weight-900 placeholder:text-light-weight-550`} border-none bg-transparent tracking-wide focus:ring-0 ${leftSidebarSizeType === sidebarSize.DEFAULT ? "md:w-[100px] lg:w-[180px]" : "w-[180px]"}`}
        placeholder="Search..."
      />
      {searchInput && (
        <button type="button" onClick={() => setSearchInput("")}>
          <IoMdCloseCircle
            className={`${topbarColorType !== topbarColor.LIGHT_COLOR ? `${globalStyleObj.topbarDarkIconColor}` : ""}`}
          />
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
