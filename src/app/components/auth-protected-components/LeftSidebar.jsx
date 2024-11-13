"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import leftSidebarData from "@/app/assets/leftSidebarData/leftSidebarData";

import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import {
  RiDashboard2Fill,
  RiApps2Line,
  RiPagesLine,
  RiRocketLine,
} from "react-icons/ri";

import { IoIosArrowForward } from "react-icons/io";
import { BsDash } from "react-icons/bs";

import logo from "../../assets/images/logo-sm.png";
import logoLight from "../../assets/images/logo-light.png";
import Link from "next/link";

const LeftSidebar = ({ width, isSidebarCollapse }) => {
  const pathname = usePathname();
  const router = useRouter();

  const extractId = pathname.split("/")[1].split("-")[0]; // /dashboard-crypto -> dashboard
  const initialId = extractId.charAt(0).toUpperCase() + extractId.slice(1); // dashboard -> Dashboard

  const [parentObj, setParentObj] = useState({
    id: initialId,
    isOpen: true,
  });
  const [firstChildObj, setFirstChildObj] = useState({ id: "", isOpen: false });
  const [secondChildObj, setSecondChildObj] = useState({
    id: "",
    isOpen: false,
  });

  //IDEA: Handle tab onClick
  const handleParentId = (id) => {
    if (parentObj.id === id) {
      setParentObj((prev) => ({
        ...prev,
        isOpen: !prev.isOpen,
      }));
    } else {
      setParentObj({ id, isOpen: true });
    }
  };

  return (
    <div
      as="div"
      className={`bg-[#405189] h-full fixed left-0 top-0 transition-style ${width}`}
    >
      {/* DEBUG Sidebar Top Logo Section */}
      <Link href="/dashboard">
        <div
          className={`h-[70px] flex items-center justify-center px-[20px] ${
            isSidebarCollapse ? "mb-0" : "mb-[20px]"
          } transition-style`}
        >
          {isSidebarCollapse ? (
            <Image src={logo} alt="logo" width={20} height={20} />
          ) : (
            <Image
              src={logoLight}
              alt="logo light"
              width={100}
              height={20}
              className="mx-auto"
            />
          )}
        </div>
      </Link>

      {/* DEBUG Tab Section */}
      <div className="px-[20px] text-[#a6b4e4]">
        {leftSidebarData.map((tab, index) => {
          return (
            <div key={tab.tabCategory} className="flex flex-col">
              <span
                className={`${
                  isSidebarCollapse
                    ? "opacity-0 scale-0"
                    : "opacity-100 scale-100"
                } text-soft text-[11px] font-semibold tracking-wider uppercase`}
              >
                {tab.tabCategory}
              </span>

              <ul
                className={`flex flex-col ${
                  isSidebarCollapse ? "mt-0" : "mt-4"
                }`}
              >
                {tab.tabNameList.map((tabList) => {
                  return (
                    // DEBUG Main Tab box
                    <li
                      key={tabList.id}
                      id={tabList.id}
                      className={`font-poppins-rg cursor-pointer ${
                        isSidebarCollapse ? "pb-8" : "py-3"
                      }`}
                    >
                      {/* DEBUG Parent Tab */}
                      <div
                        className="flex items-center gap-2 hover:text-white"
                        onClick={() => handleParentId(tabList.id)}
                      >
                        <span
                          className={`${
                            isSidebarCollapse ? "text-[22px]" : "text-[18px]"
                          } ${
                            pathname.includes(tabList.id.toLowerCase())
                              ? "text-white"
                              : ""
                          }`}
                        >
                          {tabList.tabIcon}
                        </span>

                        <span
                          className={`text-[16px] flex items-center justify-between w-full ${
                            isSidebarCollapse
                              ? "opacity-0 scale-0"
                              : "opacity-100 scale-100"
                          } transition-style`}
                        >
                          <span
                            className={`${
                              pathname.includes(tabList.id.toLowerCase())
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {tabList.tabName}
                          </span>
                          <IoIosArrowForward
                            color={`${
                              pathname.includes(tabList.id.toLowerCase())
                                ? "#fff"
                                : ""
                            }`}
                            className={`${
                              pathname.includes(tabList.id.toLowerCase())
                                ? "rotate-[90deg]"
                                : ""
                            }`}
                          />
                        </span>
                      </div>

                      {/* DEBUG First Child Parent Tab */}
                      <ul
                        className={`${
                          parentObj.id === tabList.id && parentObj.isOpen
                            ? "h-fit pt-2"
                            : "h-0"
                        } overflow-hidden flex flex-col justify-center transition-all duration-200 ease-linear`}
                      >
                        {tabList.tabDropdownList.map((item) => {
                          // TODO Working here need to create else part ****
                          if (item.tabDropdownList.length === 0) {
                            return (
                              <Link href={item.pathName} key={item.id}>
                                <li
                                  id={item.id}
                                  className="py-2 font-poppins-rg"
                                >
                                  <div className="flex items-center gap-2 hover:text-white transition-all duration-300 ease-in-out">
                                    <BsDash
                                      size={18}
                                      color={`${
                                        pathname.includes(item.id) ? "#fff" : ""
                                      }`}
                                    />
                                    <span
                                      className={`text-[14px] ${
                                        pathname === `/${item.id}`
                                          ? "text-white"
                                          : ""
                                      } w-full flex items-center justify-between`}
                                    >
                                      {item.tabName}
                                      {item.isNew && (
                                        <span className="bg-[#0ab39c] text-white text-[10px] px-1 rounded-[2px]">
                                          New
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </li>
                              </Link>
                            );
                          }
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
