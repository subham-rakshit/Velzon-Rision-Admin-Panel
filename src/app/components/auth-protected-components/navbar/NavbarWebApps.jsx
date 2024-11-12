import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";

import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import { webAppsData } from "@/app/assets/navData/navData";

const NavbarWebApps = () => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-[9px] rounded-full hover:bg-[#E6EEFD] transition-all duration-300 ease-in-out">
          <BiCategoryAlt size={20} color="#878A99" />
        </span>
      }
      className="w-full max-w-[320px]"
    >
      <Dropdown.Header className="flex items-center justify-between gap-2">
        <span className="block text-dark text-[15px] font-[600] tracking-wide">
          Web Apps
        </span>
        <button className="flex items-center gap-1 bg-[#DFF0FA] hover:bg-[#568df3] text-[#299CDB] hover:text-white px-2 py-1 rounded-[4px] text-[11px] tracking-wide font-[500] transition-all duration-300 ease-in-out">
          View All Apps
          <IoIosArrowForward />
        </button>
      </Dropdown.Header>
      <div className="flex items-center justify-center flex-wrap">
        {webAppsData.map((app) => {
          return (
            <Dropdown.Item
              key={app.id}
              className={`flex flex-col justify-center items-center gap-3 w-[100px] h-[90px] rounded-[4px]`}
            >
              <Image
                src={app.appImage}
                alt={app.appName}
                width={20}
                height={20}
              />
              <span className="text-drak text-[13px] tracking-wide">
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
