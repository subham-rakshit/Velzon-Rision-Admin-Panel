import React from "react";
import Image from "next/image";
import { Avatar, Dropdown } from "flowbite-react";
import avatarImg from "../../../assets/images/users/avatar-1.jpg";

import {
  MdAccountCircle,
  MdOutlineMessage,
  MdLock,
  MdLogout,
} from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { RiLifebuoyLine } from "react-icons/ri";
import { IoMdWallet } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

const NavProfile = () => {
  return (
    <div className="relative h-full flex items-center px-[15px] bg-[#f3f3f9] ml-4">
      <Dropdown
        label={
          <div className="flex items-center gap-[10px] h-full">
            <Image
              alt="User settings"
              src={avatarImg}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="flex flex-col">
              <span className="text-dark text-[13px]">Badsha</span>
              <span className="text-soft text-[11px]">Founder</span>
            </span>
          </div>
        }
        arrowIcon={false}
        inline
        className="absolute top-0 left-0"
      >
        <Dropdown.Header>
          <span className="text-soft text-[11px] font-semibold">
            Welcome Badsha!
          </span>
        </Dropdown.Header>
        <Dropdown.Item className="flex items-center gap-2">
          <MdAccountCircle size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light">Profile</span>
        </Dropdown.Item>
        <Dropdown.Item className="flex items-center gap-2">
          <MdOutlineMessage size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light">Messages</span>
        </Dropdown.Item>
        <Dropdown.Item className="flex items-center gap-2">
          <BiTask size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light">Taskboard</span>
        </Dropdown.Item>
        <Dropdown.Item className="flex items-center gap-2">
          <RiLifebuoyLine size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light">Help</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="flex items-center gap-2">
          <IoMdWallet size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light flex items-center justify-between gap-1 w-full">
            <span>Balance:</span>
            <span className="font-medium text-black">$5971.67</span>
          </span>
        </Dropdown.Item>
        <Dropdown.Item className="flex items-center gap-2">
          <IoSettingsOutline size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light flex items-center justify-between gap-1 w-full">
            <span>Settings</span>
            <span className="font-medium bg-[#daf4f0] text-[#0ab39c] px-[4px] text-[11px]">
              New
            </span>
          </span>
        </Dropdown.Item>
        <Dropdown.Item className="flex items-center gap-2">
          <MdLock size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light">Lock screen</span>
        </Dropdown.Item>
        <Dropdown.Item className="flex items-center gap-2">
          <MdLogout size={16} color="#878a99" />
          <span className="text-dark text-[13px] font-light">Logout</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default NavProfile;