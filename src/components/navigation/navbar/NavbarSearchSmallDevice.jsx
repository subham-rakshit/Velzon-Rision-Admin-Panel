"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavbarSearchSmallDevice = () => {
  return (
    <Popover>
      <PopoverTrigger className="hover:background-light400_dark100 rounded-full p-[5px] sm:p-[10px] md:hidden">
        <IoSearch size={20} className="icon-light450_dark350" />
      </PopoverTrigger>
      <PopoverContent className="background-light900_dark200 w-screen border-none sm:max-w-[320px] md:hidden">
        <form className="flex-start h-[35px] rounded-l-[3px] border dark:border-none">
          <input
            type="text"
            placeholder="Search..."
            className="text-13-light500_dark550 background-light800_dark300 no-focus size-full border-none px-3 dark:border-none"
          />

          <button
            type="submit"
            className="h-full rounded-r-[3px] bg-accent-indigo-blue px-3"
          >
            <MdSearch size={16} color="#fff" />
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarSearchSmallDevice;
