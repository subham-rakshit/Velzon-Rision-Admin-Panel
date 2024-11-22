"use client";

import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSearch } from "react-icons/md";

import { NavSearchBoxRecentSearches } from "../..";

const NavSearchBox = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState(true);

  return (
    <form
      className={`text-soft background-light800_dark300 md:flex-start relative hidden max-w-[230px] rounded-[3px] bg-[#f3f3f9] px-4`}
    >
      <MdSearch size={18} />
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onClick={() => setIsRecentSearchOpen(true)}
        className={`text-13-light500_dark550 flex-1 border-none bg-transparent tracking-wide focus:ring-0`}
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
