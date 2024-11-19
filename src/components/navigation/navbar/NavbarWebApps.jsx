import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import { webAppsData } from "@/app/assets/navData/navData";

const NavbarWebApps = ({ topbarColorType, layoutModeType }) => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span
          className={`rounded-full p-[9px] transition-all duration-300 ease-in-out ${layoutModeType === "light" ? "nav-icons-hover-light" : "nav-icons-hover-dark"}`}
        >
          <BiCategoryAlt size={20} color="#878A99" />
        </span>
      }
      className="w-full max-w-[320px]"
    >
      <Dropdown.Header className="flex items-center justify-between gap-2">
        <span className="text-dark block text-[15px] font-[600] tracking-wide">
          Web Apps
        </span>
        <button className="flex items-center gap-1 rounded-[4px] bg-[#DFF0FA] px-2 py-1 text-[11px] font-[500] tracking-wide text-[#299CDB] transition-all duration-300 ease-in-out hover:bg-[#568df3] hover:text-white">
          View All Apps
          <IoIosArrowForward />
        </button>
      </Dropdown.Header>
      <div className="flex flex-wrap items-center justify-center">
        {webAppsData.map((app) => {
          return (
            <Dropdown.Item
              key={app.id}
              className={`flex h-[90px] w-[100px] flex-col items-center justify-center gap-3 rounded-[4px]`}
            >
              <Image
                src={app.appImage}
                alt={app.appName}
                width={20}
                height={20}
              />
              <span className="text-dark text-[13px] tracking-wide">
                {app.appName}
              </span>
            </Dropdown.Item>
          );
        })}
      </div>
    </Dropdown>
  );
};

export default NavbarWebApps;
