"use client";

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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/store/hooks";

const NavProfile = () => {
  const { sidebarUserProfileAvtarType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );
  const router = useRouter();

  //NOTE: Logout functionality
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/logout`
      );
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/login"); //NOTE: redirect to login page
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (sidebarUserProfileAvtarType === "show") {
    return (
      <div
        className={`relative h-full flex items-center ml-5 ${
          topbarColorType === "dark-color"
            ? "nav-profile-bg-dark"
            : "nav-profile-bg-light"
        }`}
      >
        <Dropdown
          label={
            <span className="flex items-center gap-[10px]">
              <Image
                alt="User settings"
                src={avatarImg}
                width={35}
                height={35}
                className="rounded-full border"
              />
              <span className="flex flex-col">
                <span
                  className={`text-[13px] ${
                    topbarColorType === "dark-color"
                      ? "text-[#fff]"
                      : "text-dark"
                  }`}
                >
                  Badsha
                </span>
                <span className="text-soft text-[11px]">Founder</span>
              </span>
            </span>
          }
          arrowIcon={false}
          style={{ backgroundColor: "transparent" }}
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
            <span className="text-dark text-[13px] font-light">
              Lock screen
            </span>
          </Dropdown.Item>
          {/* Logout Button */}
          <Dropdown.Item
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <MdLogout size={16} color="#878a99" />
            <span className="text-dark text-[13px] font-light">Logout</span>
          </Dropdown.Item>
        </Dropdown>
      </div>
    );
  } else {
    return null;
  }
};

export default NavProfile;
