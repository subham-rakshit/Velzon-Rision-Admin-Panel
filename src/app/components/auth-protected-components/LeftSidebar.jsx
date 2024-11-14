"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
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
import { GoDot, GoDotFill } from "react-icons/go";

import logo from "../../assets/images/logo-sm.png";
import logoLight from "../../assets/images/logo-light.png";
import Link from "next/link";

const LeftSidebar = ({ width, isSidebarCollapse }) => {
  const pathname = usePathname();
  const router = useRouter();

  // State to manage open tabs based on pathname
  const [parentTabDetails, setParentTabDetails] = useState(null);
  const [firstChildTabDetails, setFirstChildTabDetails] = useState(null);
  const [secondChildTabDetails, setSecondChildTabDetails] = useState(null);
  const [thirdChildTabDetails, setThirdChildTabDetails] = useState(null);

  useEffect(() => {
    const mainPath = pathname.split("/")[1];
    const parentObject = { id: "", isOpen: false };
    const firstChildObject = { id: "", isOpen: false };
    const secondChildObject = { id: "", isOpen: false };
    const thirdChildObject = { id: "", isOpen: false };

    // Loop over each category and tab to check if their IDs are in the pathname
    leftSidebarData.forEach((category) => {
      category.tabNameList.forEach((parent) => {
        // Open the main tab if its ID is in the pathname
        if (mainPath.includes(parent.id.toLowerCase())) {
          parentObject.id = parent.id;
          parentObject.isOpen = true;
        }

        // Loop over each dropdown item in this tab to see if they match the pathname
        parent.tabDropdownList.forEach((firstChild) => {
          if (firstChild.tabDropdownList.length > 0) {
            if (mainPath.includes(firstChild.id)) {
              firstChildObject.id = firstChild.id;
              firstChildObject.isOpen = true;

              parentObject.id = parent.id;
              parentObject.isOpen = true;
            }
          } else {
            if (mainPath === firstChild.id) {
              firstChildObject.id = firstChild.id;
              firstChildObject.isOpen = true;

              parentObject.id = parent.id;
              parentObject.isOpen = true;
            }
          }

          // Check for any sub-dropdowns within the dropdown item
          firstChild.tabDropdownList.forEach((secondChild) => {
            if (secondChild.tabDropdownList.length > 0) {
              if (mainPath.includes(secondChild.id)) {
                secondChildObject.id = secondChild.id;
                secondChildObject.isOpen = true;

                firstChildObject.id = firstChild.id;
                firstChildObject.isOpen = true;

                parentObject.id = parent.id;
                parentObject.isOpen = true;
              }
            } else {
              if (mainPath === secondChild.id) {
                secondChildObject.id = secondChild.id;
                secondChildObject.isOpen = true;

                firstChildObject.id = firstChild.id;
                firstChildObject.isOpen = true;

                parentObject.id = parent.id;
                parentObject.isOpen = true;
              }
            }

            // Check for any sub-dropdowns within the dropdown item
            secondChild.tabDropdownList.forEach((thirdChild) => {
              if (thirdChild.tabDropdownList.length > 0) {
                if (mainPath.includes(thirdChild.id)) {
                  thirdChildObject.id = thirdChild.id;
                  thirdChildObject.isOpen = true;

                  secondChildObject.id = secondChild.id;
                  secondChildObject.isOpen = true;

                  firstChildObject.id = firstChild.id;
                  firstChildObject.isOpen = true;

                  parentObject.id = parent.id;
                  parentObject.isOpen = true;
                }
              } else {
                if (mainPath === thirdChild.id) {
                  thirdChildObject.id = thirdChild.id;
                  thirdChildObject.isOpen = true;

                  secondChildObject.id = secondChild.id;
                  secondChildObject.isOpen = true;

                  firstChildObject.id = firstChild.id;
                  firstChildObject.isOpen = true;

                  parentObject.id = parent.id;
                  parentObject.isOpen = true;
                }
              }
            });
          });
        });
      });
    });

    setParentTabDetails(parentObject);
    setFirstChildTabDetails(firstChildObject);
    setSecondChildTabDetails(secondChildObject);
    setThirdChildTabDetails(thirdChildObject);
  }, [pathname]);

  //NOTE Handle Parent Tab toggle
  const handleParentTabToggle = (parentId) => {
    setParentTabDetails((prev) => ({
      ...prev,
      id: parentId,
      isOpen: prev.id === parentId ? !prev.isOpen : true,
    }));
  };

  //NOTE Handle First Child Tab toggle
  const handleFirstChildTabToggle = (firstChildId) => {
    setFirstChildTabDetails((prev) => ({
      ...prev,
      id: firstChildId,
      isOpen: prev.id === firstChildId ? !prev.isOpen : true,
    }));
  };

  //NOTE Handle First Child Tab toggle
  const handleSecondChildTabToggle = (secondChildId) => {
    setSecondChildTabDetails((prev) => ({
      ...prev,
      id: secondChildId,
      isOpen: prev.id === secondChildId ? !prev.isOpen : true,
    }));
  };

  //NOTE Handle First Child Tab toggle
  const handleThirdChildTabToggle = (thirdChildId) => {
    setThirdChildTabDetails((prev) => ({
      ...prev,
      id: thirdChildId,
      isOpen: prev.id === thirdChildId ? !prev.isOpen : true,
    }));
  };

  return (
    <div
      as="div"
      className={`h-screen fixed left-0 top-0 transition-style ${width} overflow-auto custom-left-sidebar-scrollbar`}
    >
      {/* NOTE Sidebar Top Logo Section */}
      <div
        className={`h-[70px] bg-[#405189] px-[20px] transition-style sticky left-0 top-0 z-[100] w-full`}
      >
        <Link
          href="/dashboard"
          className="h-full w-full flex items-center justify-center"
        >
          <Image
            src={logoLight}
            alt="logo light"
            width={100}
            height={20}
            className="mx-auto my-auto"
          />
        </Link>
      </div>

      {/* NOTE Tab Section */}
      <div className="px-[20px] py-[20px] text-[#a6b4e4] bg-[#405189] h-full">
        {leftSidebarData.map((tab, index) => {
          return (
            <div key={tab.tabCategory} className="flex flex-col gap-5">
              {/* NOTE Tab category */}
              <span
                className={`text-soft text-[11px] font-semibold tracking-wider uppercase`}
              >
                {tab.tabCategory}
              </span>

              {/* NOTE Full Category Items Main Container */}
              <ul className={`flex flex-col`}>
                {tab.tabNameList.map((tabList) => {
                  return (
                    // NOTE Parent and childs Tab Main container *****
                    <li
                      key={tabList.id}
                      className={`font-poppins-rg cursor-pointer transition-style py-2`}
                    >
                      {/* DEBUG Parent Tab */}
                      <div
                        className={`flex items-center gap-2 group ${
                          pathname.includes(tabList.id.toLowerCase())
                            ? "text-white"
                            : ""
                        }`}
                        onClick={() => handleParentTabToggle(tabList.id)}
                      >
                        {/* NOTE Parent Tab Icon */}
                        <span
                          className={`group-hover:text-white transition-style`}
                        >
                          {tabList.tabIcon}
                        </span>

                        {/* NOTE Parent Tabname and Arrow Icon Container */}
                        <span
                          className={`text-[16px] flex items-center justify-between w-full transition-style group-hover:text-white`}
                        >
                          {/* NOTE Parent Tabname */}
                          <span>{tabList.tabName}</span>

                          {/* NOTE Parent Arrow Icon */}
                          <IoIosArrowForward
                            className={`${
                              pathname.includes(tabList.id.toLowerCase())
                                ? "rotate-[90deg]"
                                : ""
                            }`}
                          />
                        </span>
                      </div>

                      {/* NOTE All Child's Main container */}
                      <ul
                        className={`overflow-hidden flex flex-col justify-center transition-style ${
                          parentTabDetails &&
                          tabList.id === parentTabDetails.id &&
                          parentTabDetails.isOpen
                            ? "h-fit mt-2"
                            : "h-0"
                        } transition-style`}
                      >
                        {tabList.tabDropdownList.map((firstChild) => {
                          // NOTE If 1st child doesn't have children
                          if (firstChild.tabDropdownList.length === 0) {
                            return (
                              // DEBUG 1st Child (No Children)
                              <li
                                id={firstChild.id}
                                key={firstChild.id}
                                className="font-poppins-rg py-[10px]"
                              >
                                {/* NOTE 1stChild Icon and Name container */}
                                <Link href={firstChild.pathName}>
                                  <span
                                    className={`flex items-center gap-2 hover:text-white transition-all duration-300 ease-in-out ${
                                      firstChildTabDetails &&
                                      firstChildTabDetails.id === firstChild.id
                                        ? "text-white"
                                        : ""
                                    }`}
                                  >
                                    {/* NOTE 1stChild Icon */}
                                    <BsDash size={18} />

                                    {/* NOTE 1stChild Name and New text */}
                                    <span
                                      className={`text-[13px] w-full flex items-center justify-between`}
                                    >
                                      {firstChild.tabName}
                                      {firstChild.isNew && (
                                        <span className="bg-[#0ab39c] text-white text-[10px] px-1 rounded-[2px]">
                                          New
                                        </span>
                                      )}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            );
                          } else {
                            // NOTE If 1st child have children
                            return (
                              // NOTE 1st Child main container
                              <li
                                id={firstChild.id}
                                key={firstChild.id}
                                className="font-poppins-rg py-[10px]"
                              >
                                {/* DEBUG 1st Child (Children) */}
                                <span
                                  className={`flex items-center gap-2 hover:text-white transition-all duration-300 ease-in-out ${
                                    pathname.includes(firstChild.id)
                                      ? "text-white"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleFirstChildTabToggle(firstChild.id)
                                  }
                                >
                                  {/* NOTE 1stChild Icon */}
                                  <BsDash size={18} />

                                  {/* NOTE 1stChild Icon Tabname and Arrow Container */}
                                  <span
                                    className={`text-[13px] w-full flex items-center justify-between`}
                                  >
                                    {firstChild.tabName}
                                    <IoIosArrowForward
                                      className={`${
                                        pathname.includes(firstChild.id)
                                          ? "rotate-[90deg]"
                                          : ""
                                      }`}
                                    />
                                    {firstChild.isNew && (
                                      <span className="bg-[#0ab39c] text-white text-[10px] px-1 rounded-[2px]">
                                        New
                                      </span>
                                    )}
                                  </span>
                                </span>

                                {/* NOTE 2ndChild's main container  */}
                                <ul
                                  className={`pl-5 overflow-hidden ${
                                    firstChildTabDetails &&
                                    firstChildTabDetails.id === firstChild.id &&
                                    firstChildTabDetails.isOpen
                                      ? "h-fit"
                                      : "h-0"
                                  } transition-style`}
                                >
                                  {firstChild.tabDropdownList.map(
                                    (secChild) => {
                                      // NOTE If 2nd Child doesn't have child
                                      if (
                                        secChild.tabDropdownList.length === 0
                                      ) {
                                        return (
                                          // DEBUG 2nd Child
                                          <li
                                            key={secChild.id}
                                            id={secChild.id}
                                            className={`font-poppins-rg text-[13px] pt-[10px] group transition-style ${
                                              pathname.includes(secChild.id)
                                                ? "text-white"
                                                : ""
                                            }`}
                                          >
                                            <Link
                                              href={secChild.pathName}
                                              className="flex items-center gap-3"
                                            >
                                              <span
                                                className={`w-[6px] h-[6px] border border-[#a6b4e4] rounded-full group-hover:bg-white transition-style ${
                                                  pathname.includes(secChild.id)
                                                    ? "bg-white"
                                                    : ""
                                                }`}
                                              ></span>
                                              <span
                                                className={`group-hover:text-white transition-style`}
                                              >
                                                {secChild.tabName}
                                              </span>
                                            </Link>
                                          </li>
                                        );
                                      } else {
                                        //NOTE If 2nd Child have children
                                        return (
                                          <li
                                            key={secChild.id}
                                            id={secChild.id}
                                            className={`font-poppins-rg text-[13px] pt-[10px] transition-style`}
                                          >
                                            <span
                                              className={`flex items-center gap-3 group ${
                                                pathname.includes(secChild.id)
                                                  ? "text-white"
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                handleSecondChildTabToggle(
                                                  secChild.id
                                                )
                                              }
                                            >
                                              <span
                                                className={`w-[6px] h-[6px] border border-[#a6b4e4] rounded-full group-hover:bg-white transition-style ${
                                                  pathname.includes(secChild.id)
                                                    ? "bg-white"
                                                    : ""
                                                }`}
                                              ></span>

                                              {/* NOTE 2ndChild Icon Tabname and Arrow Container */}
                                              <span
                                                className={`text-[13px] w-full flex items-center justify-between group-hover:text-white`}
                                              >
                                                {secChild.tabName}
                                                <IoIosArrowForward
                                                  className={`${
                                                    pathname.includes(
                                                      secChild.id
                                                    )
                                                      ? "rotate-[90deg]"
                                                      : ""
                                                  }`}
                                                />
                                              </span>
                                            </span>

                                            {/* TODO 3rcChild */}
                                            <ul
                                              className={`pl-5 overflow-hidden ${
                                                secondChildTabDetails &&
                                                secondChildTabDetails.id ===
                                                  secChild.id &&
                                                secondChildTabDetails.isOpen
                                                  ? "h-fit"
                                                  : "h-0"
                                              } transition-style`}
                                            >
                                              {secChild.tabDropdownList.map(
                                                (thirdChild) => {
                                                  console.log(thirdChild);

                                                  return (
                                                    <li
                                                      key={thirdChild.id}
                                                      id={thirdChild.id}
                                                      className={`font-poppins-rg text-[13px] pt-[10px] group transition-style`}
                                                    >
                                                      <Link
                                                        href={
                                                          thirdChild.pathName
                                                        }
                                                        className="flex items-center gap-3"
                                                      >
                                                        <span
                                                          className={`w-[6px] h-[6px] border border-[#a6b4e4] rounded-full group-hover:bg-white transition-style ${
                                                            pathname.includes(
                                                              thirdChild.id
                                                            )
                                                              ? "bg-white"
                                                              : ""
                                                          }`}
                                                        ></span>
                                                        <span
                                                          className={`group-hover:text-white transition-style ${
                                                            pathname.includes(
                                                              thirdChild.id
                                                            )
                                                              ? "text-white"
                                                              : ""
                                                          }`}
                                                        >
                                                          {thirdChild.tabName}
                                                        </span>
                                                      </Link>
                                                    </li>
                                                  );
                                                }
                                              )}
                                            </ul>
                                          </li>
                                        );
                                      }
                                    }
                                  )}
                                </ul>
                              </li>
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
