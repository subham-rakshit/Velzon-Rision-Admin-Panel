"use client";

import React, { useState } from "react";

import { MdSearch } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { NavSearchBoxRecentSearches } from "../..";

const NavSearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  return (
    <form className="relative min-w-[270px] px-4 bg-[#f3f3f9] text-soft flex items-center rounded-[3px]">
      <MdSearch size={18} />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={() => setIsRecentSearchOpen(true)}
        className="flex-1 bg-transparent text-[13px] border-none font-poppins-rg focus:ring-0 tracking-wide"
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
