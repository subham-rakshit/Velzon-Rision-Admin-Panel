"use client";

import Image from "next/image";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import { topbarColor } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { webAppsData } from "@/app/assets/data/navData/navData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";

const NavbarWebApps = () => {
  const { topbarColorType } = useAppSelector((state) => state.layout);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `hover:bg-light-dencity-400 dark:hover:bg-dark-dencity-100` : `hover:bg-[#fff]/5`} rounded-full p-[5px] sm:p-[10px]`}
      >
        <BiCategoryAlt
          size={20}
          className={`${topbarColorType === topbarColor.LIGHT_COLOR ? `${globalStyleObj.iconLight450Dark350}` : `${globalStyleObj.topbarDarkIconColor}`}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`${globalStyleObj.backgroundLight900Dark200} w-screen gap-2 border-none sm:max-w-[320px]`}
      >
        <DropdownMenuLabel className={`${globalStyleObj.flexBetween}`}>
          <span className={`${globalStyleObj.text16Light550Dark550}`}>
            Web Apps
          </span>
          <button
            type="button"
            className={`${globalStyleObj.flexStart} gap-1 rounded-[3px] bg-custom-blue-200 px-2 py-1 text-[11px] text-accent-light-blue hover:bg-custom-blue-500 hover:text-white dark:bg-custom-green-100 dark:hover:bg-custom-blue-500`}
          >
            View All Apps
            <IoIosArrowForward />
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className={`${globalStyleObj.flexCenter} flex-wrap`}>
          {webAppsData.map((app) => {
            return (
              <DropdownMenuItem
                key={app.id}
                className={`${globalStyleObj.flexColCenter} h-[90px] w-[100px] cursor-pointer gap-3 rounded-[4px]`}
              >
                <Image
                  src={app.appImage}
                  alt={app.appName}
                  width={20}
                  height={20}
                />
                <span
                  className={`${globalStyleObj.text13Light550Dark550} tracking-wide`}
                >
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
