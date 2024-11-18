"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

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

import leftSidebarData from "../../leftSidebarData/leftSidebarData";
import logoSmall from "../../../assets/images/logo-sm.png";
import logoLight from "../../../assets/images/logo-light.png";
import TransitionLink from "./TransitionLink";

const LeftSidebar = ({ width, isSidebarCollapse }) => {
  const pathname = usePathname();
  const router = useRouter();

  // NOTE Default Sidebar State to manage open tabs based on pathname
  const [parentTabDetails, setParentTabDetails] = useState(null);
  const [firstChildTabDetails, setFirstChildTabDetails] = useState(null);
  const [secondChildTabDetails, setSecondChildTabDetails] = useState(null);
  const [thirdChildTabDetails, setThirdChildTabDetails] = useState(null);

  // NOTE Small(Icon View) Sidebar state to manage tab open based on hover
  const [parentTabIsOpen, setParentTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });
  const [firstChildTabIsOpen, setFirstChildTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });
  const [secondChilTabIsOpen, setSecondChilTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });
  const [thirdChildTabIsOpen, setThirdChildTabIsOpen] = useState({
    id: "",
    isOpen: false,
  });

  //TODO Need To Remove
  // console.log("Parent: ", parentTabDetails);
  // console.log("FirstChild: ", firstChildTabDetails);
  // console.log("SecondChild: ", secondChildTabDetails);
  // console.log("ThirdChild: ", thirdChildTabDetails);

  // console.log("Parent: ", parentTabIsOpen);
  // console.log("FirstChild: ", firstChildTabIsOpen);
  // console.log("SecondChild: ", secondChilTabIsOpen);
  // console.log("ThirdChild: ", thirdChildTabIsOpen);

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
  }, [pathname, isSidebarCollapse]);

  // Handle Parent Tab toggle
  const handleParentTabToggle = (parentId) => {
    setParentTabDetails((prev) => ({
      ...prev,
      id: parentId,
      isOpen: prev.id === parentId ? !prev.isOpen : true,
    }));
  };

  // Handle First Child Tab toggle
  const handleFirstChildTabToggle = (firstChildId) => {
    setFirstChildTabDetails((prev) => ({
      ...prev,
      id: firstChildId,
      isOpen: prev.id === firstChildId ? !prev.isOpen : true,
    }));
  };

  // Handle First Child Tab toggle
  const handleSecondChildTabToggle = (secondChildId) => {
    setSecondChildTabDetails((prev) => ({
      ...prev,
      id: secondChildId,
      isOpen: prev.id === secondChildId ? !prev.isOpen : true,
    }));
  };

  // Handle First Child Tab toggle
  const handleThirdChildTabToggle = (thirdChildId) => {
    setThirdChildTabDetails((prev) => ({
      ...prev,
      id: thirdChildId,
      isOpen: prev.id === thirdChildId ? !prev.isOpen : true,
    }));
  };

  // NOTE Vertical Default LeftSidebar View ----
  const verticalDefaultLeftSidebarView = () => {
    return (
      <ul className="px-[20px] text-[#a6b4e4] bg-[#405189] h-[calc(100vh-70px)] py-2 overflow-y-auto custom-left-sidebar-scrollbar hide-scrollbar transition-style">
        {leftSidebarData.map((tab, index) => {
          return (
            <li key={tab.tabCategory} className="flex flex-col gap-5 pt-[20px]">
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
                      {tabList.tabDropdownList.length > 0 ? (
                        // DEBUG Parent Tab having child
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
                            className={`text-[15px] flex items-center justify-between w-full transition-style group-hover:text-white`}
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
                      ) : (
                        // DEBUG Parent Tab having no child
                        <TransitionLink href={tabList.pathName}>
                          <div
                            className={`group ${
                              pathname.includes(tabList.id.toLowerCase())
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {/* NOTE Parent Tab */}
                            <span
                              className={`flex items-center gap-2 group-hover:text-white transition-style`}
                            >
                              {tabList.tabIcon}
                              {/* NOTE Parent Tabname */}
                              <span>{tabList.tabName}</span>
                            </span>
                          </div>
                        </TransitionLink>
                      )}

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
                                <TransitionLink href={firstChild.pathName}>
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
                                </TransitionLink>
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
            </li>
          );
        })}
      </ul>
    );
  };

  // NOTE Vertical Small Icon LeftSidebar View ----
  const verticalSmallIconLeftSideView = () => {
    return (
      <ul className="relative text-[#a6b4e4] bg-[#405189] py-2 transition-style h-[100%]">
        {leftSidebarData.map((category) =>
          category.tabNameList.map((parentTabIcon) => (
            // Tab Icon Main Container
            <li
              key={parentTabIcon.id}
              className="relative py-[13px] flex items-center justify-center hover:cursor-pointer"
              onMouseEnter={() =>
                setParentTabIsOpen({ id: parentTabIcon.id, isOpen: true })
              }
              onMouseLeave={() => setParentTabIsOpen({ id: "", isOpen: false })}
            >
              {/* NOTE Parent Icon */}
              <span
                className={`text-[22px] ${
                  pathname.includes(parentTabIcon.id.toLowerCase())
                    ? "text-white"
                    : ""
                }`}
              >
                {parentTabIcon.tabIcon}
              </span>

              {/* NOTE Parent Dropdown Box */}
              <ul
                className={`absolute top-0 left-[100%] bg-[#405189] z-[9999] w-[200px] transition-style px-2 py-3 rounded-tr-[5px] rounded-br-[5px] font-poppins-rg ${
                  parentTabIsOpen.isOpen &&
                  parentTabIsOpen.id === parentTabIcon.id
                    ? "visible opacity-100"
                    : "hidden opacity-0"
                }`}
              >
                {/* Parent Tab Name  */}
                <span
                  className={`text-[15px] flex items-center justify-between w-full transition-style group-hover:text-white ${
                    parentTabIsOpen.id === parentTabIcon.id ? "text-white" : ""
                  } ${
                    parentTabIcon.tabDropdownList.length > 0 ? "mb-3" : "mb-0"
                  }`}
                >
                  <span>{parentTabIcon.tabName}</span>
                  {parentTabIcon.tabDropdownList.length > 0 && (
                    <IoIosArrowForward
                      className={`${
                        parentTabIsOpen.id === parentTabIcon.id
                          ? "rotate-[90deg]"
                          : ""
                      }`}
                    />
                  )}
                </span>

                {/* First Childrens */}
                {parentTabIcon.tabDropdownList.length > 0 &&
                  parentTabIcon.tabDropdownList.map((firstChild) => {
                    return (
                      <li
                        key={firstChild.id}
                        className={`font-poppins-rg cursor-pointer transition-style`}
                      >
                        {firstChild.tabDropdownList.length > 0 ? (
                          // FirstChild Tab having dropdown
                          <ul
                            className={`relative flex text-[13px] items-center gap-2 p-2`}
                            onMouseEnter={() =>
                              setFirstChildTabIsOpen({
                                id: firstChild.id,
                                isOpen: true,
                              })
                            }
                            onMouseLeave={() =>
                              setFirstChildTabIsOpen({ id: "", isOpen: false })
                            }
                          >
                            <span
                              className={`text-[13px] flex items-center justify-between w-full transition-style hover:text-white ${
                                firstChildTabDetails &&
                                firstChildTabDetails.id === firstChild.id
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              <span>{firstChild.tabName}</span>
                              <IoIosArrowForward />
                            </span>

                            {/* Second Children */}
                            <li
                              className={`absolute top-0 left-[100%] bg-[#405189] z-[9999] w-[200px] transition-style p-3 rounded-tr-[5px] rounded-br-[5px] font-poppins-rg ${
                                firstChildTabIsOpen.isOpen &&
                                firstChildTabIsOpen.id === firstChild.id
                                  ? "visible opacity-100"
                                  : "hidden opacity-0"
                              }`}
                            >
                              {firstChild.tabDropdownList.map((secondChild) =>
                                // Second Child Having Dropdown
                                secondChild.tabDropdownList.length > 0 ? (
                                  <ul
                                    key={secondChild.id}
                                    className={`relative flex text-[13px] items-center gap-2 p-2`}
                                    onMouseEnter={() =>
                                      setSecondChilTabIsOpen({
                                        id: secondChild.id,
                                        isOpen: true,
                                      })
                                    }
                                    onMouseLeave={() =>
                                      setSecondChilTabIsOpen({
                                        id: "",
                                        isOpen: false,
                                      })
                                    }
                                  >
                                    <span
                                      className={`text-[13px] flex items-center justify-between w-full transition-style hover:text-white ${
                                        secondChildTabDetails &&
                                        secondChildTabDetails.id ===
                                          secondChild.id
                                          ? "text-white"
                                          : ""
                                      }`}
                                    >
                                      <span>{secondChild.tabName}</span>
                                      <IoIosArrowForward />
                                    </span>

                                    {/* Third Child */}
                                    <li
                                      className={`absolute top-0 left-[100%] bg-[#405189] z-[9999] w-[200px] transition-style p-3 rounded-[5px] font-poppins-rg ${
                                        secondChilTabIsOpen.isOpen &&
                                        secondChilTabIsOpen.id ===
                                          secondChild.id
                                          ? "visible opacity-100"
                                          : "hidden opacity-0"
                                      }`}
                                    >
                                      {secondChild.tabDropdownList.map(
                                        (thirdChild) =>
                                          thirdChild.tabDropdownList >
                                          0 ? null : (
                                            <Link
                                              href={thirdChild.pathName}
                                              key={thirdChild.id}
                                            >
                                              <span
                                                className={`flex items-center gap-2 hover:text-white text-[13px] p-2 transition-style ${
                                                  thirdChildTabDetails &&
                                                  thirdChildTabDetails.id ===
                                                    thirdChild.id
                                                    ? "text-white"
                                                    : ""
                                                }`}
                                              >
                                                {secondChild.tabName}
                                              </span>
                                            </Link>
                                          )
                                      )}
                                    </li>
                                  </ul>
                                ) : (
                                  // Second Child Having No Dropdown
                                  <Link
                                    href={secondChild.pathName}
                                    key={secondChild.id}
                                  >
                                    <span
                                      className={`flex items-center gap-2 hover:text-white text-[13px] p-2 transition-style ${
                                        secondChildTabDetails &&
                                        secondChildTabDetails.id ===
                                          secondChild.id
                                          ? "text-white"
                                          : ""
                                      }`}
                                    >
                                      {secondChild.tabName}
                                    </span>
                                  </Link>
                                )
                              )}
                            </li>
                          </ul>
                        ) : (
                          // FirstChild Tab having no dropdown
                          <Link href={firstChild.pathName}>
                            <span
                              className={`flex items-center gap-2 text-[13px] p-2 hover:text-white transition-style ${
                                firstChildTabDetails &&
                                firstChildTabDetails.id === firstChild.id
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              {firstChild.tabName}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))
        )}
      </ul>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isSidebarCollapse ? "sticky" : `fixed`
      } left-0 top-0 z-[99] ${width}`}
    >
      {/* NOTE Sidebar Top Logo Section */}
      <div
        className={`h-[70px] bg-[#405189] px-[20px] transition-style sticky left-0 top-0 z-[100] w-full`}
      >
        <Link
          href="/dashboard"
          className="h-full w-full flex items-center justify-center"
        >
          {isSidebarCollapse ? (
            <Image src={logoSmall} alt="logo small" width={25} height={25} />
          ) : (
            <Image src={logoLight} alt="logo light" width={100} height={20} />
          )}
        </Link>
      </div>

      {/* NOTE Tab Section */}
      {isSidebarCollapse
        ? verticalSmallIconLeftSideView()
        : verticalDefaultLeftSidebarView()}
    </div>
  );
};

export default LeftSidebar;
