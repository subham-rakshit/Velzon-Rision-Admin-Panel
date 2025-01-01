"use client";

import { IoSearch } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/store/hooks";

const NavbarSearchSmallDevice = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);

  return (
    <Popover>
      <PopoverTrigger
        className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} rounded-full p-[5px] sm:p-[10px] md:hidden`}
      >
        <IoSearch
          size={20}
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
        />
      </PopoverTrigger>
      <PopoverContent
        className={`${globalStyleObj.backgroundLight900Dark200} w-screen border-none sm:max-w-[320px] md:hidden`}
      >
        <form
          className={`${globalStyleObj.flexStart} h-[35px] rounded-l-[3px] border dark:border-none`}
        >
          <input
            type="text"
            placeholder="Search..."
            className={`${globalStyleObj.text13Light550Dark550} ${globalStyleObj.backgroundLight800Dark300} no-focus size-full border-none px-3 dark:border-none`}
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
