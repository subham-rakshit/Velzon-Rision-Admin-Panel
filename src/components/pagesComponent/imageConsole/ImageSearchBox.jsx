"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { MdSearch } from "react-icons/md";

import { imageTypeOptions } from "@/app/assets/data/imageData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ImageSearchBox = ({ searchValue }) => {
  const [searchBoxDefaultValue, setSearchBoxDefaultValue] = useState("");
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, active } = customColor;
  const router = useRouter();

  useEffect(() => {
    setSearchBoxDefaultValue(searchValue);
  }, [searchValue]);

  // NOTE Handle Search Box Submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    router.push(`?search=${encodeURIComponent(value)}`, undefined, {
      shallow: true,
    });

    //* `?search=${encodeURIComponent(value)}` -> The new URL query string, safely encoded.
    //* undefined -> This means the path will not be changed, only the query string will.
    //* {shallow: true} -> This ensures that the page will not reload and only the URL will update.
  };

  // NOTE Handle Dropdown Menu Item Click
  const handleDropdownMenuItemClick = (value) => {
    router.push(`?search=${encodeURIComponent(value)}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="flex items-center overflow-hidden rounded-md border dark:border-gray-700 h-[35px]"
      >
        <input
          type="text"
          name="search"
          placeholder="Search"
          defaultValue={searchBoxDefaultValue}
          className="border-none px-3 font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-450 focus:outline-none focus:ring-0 bg-[#f3f3f3] dark:bg-[#000]/20 h-full"
        />

        <button type="submit" className={`${active} px-2 h-full`}>
          <MdSearch size={13} color="#fff" />
        </button>
      </form>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <BsThreeDotsVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-fit ${globalStyleObj.backgroundLight900Dark300} text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-450`}
        >
          <DropdownMenuLabel className="text-[13px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-550">
            Image Types
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            value=""
            checked={searchValue === ""}
            onClick={() => handleDropdownMenuItemClick("")}
          >
            All
          </DropdownMenuCheckboxItem>
          {(imageTypeOptions || []).map((item) => (
            <DropdownMenuCheckboxItem
              key={item.id}
              value={item.value}
              checked={item.value === searchValue}
              onClick={() => handleDropdownMenuItemClick(item.value)}
            >
              {item.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ImageSearchBox;
