import React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { IoSearch } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

const NavbarSearchSmallDevice = () => {
  return (
    <Popover>
      <PopoverTrigger className="md:hidden p-[5px] sm:p-[10px] rounded-full hover:background-light400_dark100">
        <IoSearch size={20} className="icon-light450_dark350" />
      </PopoverTrigger>
      <PopoverContent className="md:hidden background-light900_dark200 border-none w-screen sm:max-w-[320px]">
        <form className="flex-start h-[35px] border dark:border-none rounded-tl-[3px] rounded-bl-[3px]">
          <input
            type="text"
            placeholder="Search..."
            className="h4-light500_dark550 background-light800_dark300 no-focus border-none dark:border-none px-3 w-full h-full"
          />

          <button
            type="submit"
            className="bg-accent-indigo-blue h-full px-3 rounded-tr-[3px] rounded-br-[3px]"
          >
            <MdSearch size={16} color="#fff" />
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarSearchSmallDevice;
