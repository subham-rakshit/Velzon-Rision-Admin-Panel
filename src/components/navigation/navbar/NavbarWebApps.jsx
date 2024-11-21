import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import Image from "next/image";
import { webAppsData } from "@/app/assets/navData/navData";

const NavbarWebApps = ({ topbarColorType, layoutModeType }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[5px] sm:p-[10px] rounded-full hover:background-light400_dark100">
        <BiCategoryAlt size={20} className="icon-light450_dark350" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="background-light900_dark200 w-screen sm:max-w-[320px] gap-2 border-none">
        <DropdownMenuLabel className="flex-between">
          Web Apps
          <button
            type="button"
            className="flex-start gap-1 bg-custom-blue-200 dark:bg-custom-green-100 hover:bg-custom-blue-500 dark:hover:bg-custom-blue-500 px-2 py-1 rounded-[3px] text-[11px] text-accent-light-blue hover:text-white"
          >
            View All Apps
            <IoIosArrowForward />
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex-center flex-wrap">
          {webAppsData.map((app) => {
            return (
              <DropdownMenuItem
                key={app.id}
                className={`h-[90px] w-[100px] flex-col-center gap-3 rounded-[4px] cursor-pointer`}
              >
                <Image
                  src={app.appImage}
                  alt={app.appName}
                  width={20}
                  height={20}
                />
                <span className="h4-light500_dark550 tracking-wide">
                  {app.appName}
                </span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarWebApps;
