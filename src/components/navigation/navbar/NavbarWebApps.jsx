"use client";

import Image from "next/image";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import { webAppsData } from "@/app/assets/navData/navData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

const NavbarWebApps = ({ topbarColorType }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="hover:background-light400_dark100 rounded-full p-[5px] sm:p-[10px]">
        <BiCategoryAlt size={20} className="icon-light450_dark350" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="background-light900_dark200 w-screen gap-2 border-none sm:max-w-[320px]"
      >
        <DropdownMenuLabel className="flex-between">
          Web Apps
          <button
            type="button"
            className="flex-start gap-1 rounded-[3px] bg-custom-blue-200 px-2 py-1 text-[11px] text-accent-light-blue hover:bg-custom-blue-500 hover:text-white dark:bg-custom-green-100 dark:hover:bg-custom-blue-500"
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
                className={`flex-col-center h-[90px] w-[100px] cursor-pointer gap-3 rounded-[4px]`}
              >
                <Image
                  src={app.appImage}
                  alt={app.appName}
                  width={20}
                  height={20}
                />
                <span className="text-13-light500_dark550 tracking-wide">
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
