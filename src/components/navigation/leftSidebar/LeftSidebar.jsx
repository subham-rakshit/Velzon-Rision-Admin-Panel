"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import TransitionLink from "./TransitionLink";
import logoDark from "../../../app/assets/images/logo-dark.png";
import logoLight from "../../../app/assets/images/logo-light.png";
import logoSmall from "../../../app/assets/images/logo-sm.png";
import leftSidebarData from "../../../app/assets/leftSidebarData/leftSidebarData";

import {
  sidebarColor,
  sidebarSize,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";

const LeftSidebar = ({ width, leftSidbarSizeType, leftSidebarColorType }) => {
  const pathname = usePathname();
  const mainPath = pathname.split("/")[1];
  const { theme } = useTheme();

  const [tabDetails, setTabDetails] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
    thirdChild: { id: "", isOpen: false },
  });

  const [hoverState, setHoverState] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
  });

  useEffect(() => {
    const newTabDetails = {
      parent: { id: "", isOpen: false },
      firstChild: { id: "", isOpen: false },
      secondChild: { id: "", isOpen: false },
      thirdChild: { id: "", isOpen: false },
    };

    leftSidebarData.some((category) =>
      category.tabNameList.some((parent) => {
        if (mainPath.includes(parent.id.toLowerCase())) {
          newTabDetails.parent = { id: parent.id, isOpen: true };
        }

        return parent.tabDropdownList.some((firstChild) => {
          if (firstChild.tabDropdownList.length === 0) {
            if (mainPath === firstChild.id) {
              newTabDetails.firstChild = { id: firstChild.id, isOpen: true };
              newTabDetails.parent = { id: parent.id, isOpen: true };
            }
          } else {
            if (mainPath.includes(firstChild.id)) {
              newTabDetails.firstChild = { id: firstChild.id, isOpen: true };
              newTabDetails.parent = { id: parent.id, isOpen: true };
            }
          }

          return firstChild.tabDropdownList.some((secondChild) => {
            if (secondChild.tabDropdownList.length === 0) {
              if (mainPath === secondChild.id) {
                newTabDetails.secondChild = {
                  id: secondChild.id,
                  isOpen: true,
                };
                newTabDetails.firstChild = { id: firstChild.id, isOpen: true };
                newTabDetails.parent = { id: parent.id, isOpen: true };
              }
            } else {
              if (mainPath.includes(secondChild.id)) {
                newTabDetails.secondChild = {
                  id: secondChild.id,
                  isOpen: true,
                };
                newTabDetails.firstChild = { id: firstChild.id, isOpen: true };
                newTabDetails.parent = { id: parent.id, isOpen: true };
              }
            }

            return secondChild.tabDropdownList.some((thirdChild) => {
              if (mainPath === thirdChild.id) {
                newTabDetails.thirdChild = { id: thirdChild.id, isOpen: true };
                newTabDetails.secondChild = {
                  id: secondChild.id,
                  isOpen: true,
                };
                newTabDetails.firstChild = { id: firstChild.id, isOpen: true };
                newTabDetails.parent = { id: parent.id, isOpen: true };
                return true;
              }
              return false;
            });
          });
        });
      })
    );

    // If a match was found, update the state
    setTabDetails(newTabDetails);
  }, [mainPath]);

  // NOTE Handle Toggle Tabs Functionality
  const handleParentTabToggle = (parentId) => {
    setTabDetails((prev) => ({
      ...prev,
      parent: {
        ...prev.parent,
        id: parentId,
        isOpen: prev.parent.id === parentId ? !prev.parent.isOpen : true,
      },
    }));
  };

  const handleFirstChildTabToggle = (firstChildId) => {
    setTabDetails((prev) => ({
      ...prev,
      firstChild: {
        ...prev.firstChild,
        id: firstChildId,
        isOpen:
          prev.firstChild.id === firstChildId ? !prev.firstChild.isOpen : true,
      },
    }));
  };

  const handleSecondChildTabToggle = (secondChildId) => {
    setTabDetails((prev) => ({
      ...prev,
      secondChild: {
        ...prev.secondChild,
        id: secondChildId,
        isOpen:
          prev.secondChild.id === secondChildId
            ? !prev.secondChild.isOpen
            : true,
      },
    }));
  };

  // NOTE Handle Hove State Functionality
  const handleParentHoverState = (parentId) => {
    setHoverState((prev) => ({
      ...prev,
      parent: {
        ...prev.parent,
        id: parentId,
        isOpen: prev.parent.id === parentId ? !prev.parent.isOpen : true,
      },
    }));
  };

  const handleFirstChildHoverState = (firstChildId) => {
    setHoverState((prev) => ({
      ...prev,
      firstChild: {
        ...prev.firstChild,
        id: firstChildId,
        isOpen:
          prev.firstChild.id === firstChildId ? !prev.firstChild.isOpen : true,
      },
    }));
  };

  const handleSecondChildHoverState = (secondChildId) => {
    setHoverState((prev) => ({
      ...prev,
      secondChild: {
        ...prev.secondChild,
        id: secondChildId,
        isOpen:
          prev.secondChild.id === secondChildId
            ? !prev.secondChild.isOpen
            : true,
      },
    }));
  };

  // NOTE Default Sidebar Size
  const verticalDefaultLeftSidebarView = () => {
    return (
      <ul
        className={`custom-left-sidebar-scrollbar h-[calc(100vh-70px)] overflow-y-auto px-4 dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
      >
        {leftSidebarData.map((category) => (
          // Main Category Container
          <li
            key={category.tabCategory}
            className={`${leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? "py-0" : "py-[10px]"}`}
          >
            <span
              className={`${leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? "hidden" : "inline"} text-11-light400-sb uppercase tracking-widest`}
            >
              {category.tabCategory}
            </span>

            <ul>
              {category.tabNameList.map((parent) =>
                parent.tabDropdownList.length > 0 ? (
                  <li key={parent.id} className={`pl-1 pt-5`}>
                    {/* Parent Tab */}
                    <div
                      className={`flex-start cursor-pointer gap-2 ${pathname.includes(parent.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} hover:text-light-weight-800`}
                      onClick={() => handleParentTabToggle(parent.id)}
                    >
                      <span className="text-[18px]">{parent.tabIcon}</span>
                      <span className="font-poppins-rg text-[15px]">
                        {parent.tabName}
                      </span>
                      <IoIosArrowForward
                        className={`ml-auto ${pathname.includes(parent.id.toLowerCase()) ? "rotate-90" : ""}`}
                      />
                    </div>

                    <ul
                      className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} custom-left-sidebar-scrollbar overflow-y-auto transition-all duration-500`}
                    >
                      {parent.tabDropdownList.map((firstChild) =>
                        firstChild.tabDropdownList.length > 0 ? (
                          // First Child
                          <li key={firstChild.id}>
                            <div
                              className={`${pathname.includes(firstChild.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} flex-start cursor-pointer gap-2 pl-2 pt-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
                              onClick={() =>
                                handleFirstChildTabToggle(firstChild.id)
                              }
                            >
                              <BsDash />
                              {firstChild.tabName}
                              <IoIosArrowForward
                                size={15}
                                className={`ml-auto ${pathname.includes(firstChild.id.toLowerCase()) ? "rotate-90" : ""}`}
                              />
                            </div>

                            <ul
                              className={`${tabDetails.firstChild.id === firstChild.id && tabDetails.firstChild.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} custom-left-sidebar-scrollbar overflow-y-auto transition-all duration-500`}
                            >
                              {firstChild.tabDropdownList.map((secondChild) =>
                                secondChild.tabDropdownList.length > 0 ? (
                                  // Second Child
                                  <li key={secondChild.id}>
                                    <div
                                      className={`flex-start cursor-pointer gap-3 pl-7 pt-4 font-poppins-rg text-[13px] ${pathname.includes(secondChild.id) ? "text-light-weight-800" : "text-light-weight-450"} group hover:text-light-weight-800`}
                                      onClick={() =>
                                        handleSecondChildTabToggle(
                                          secondChild.id
                                        )
                                      }
                                    >
                                      <span
                                        className={`size-[5px] rounded-full border border-light-weight-450 group-hover:bg-white ${pathname.includes(secondChild.id.toLowerCase()) ? "bg-white" : ""}`}
                                      ></span>
                                      {secondChild.tabName}
                                      <IoIosArrowForward
                                        size={15}
                                        className={`ml-auto ${pathname.includes(secondChild.id.toLowerCase()) ? "rotate-90" : ""}`}
                                      />
                                    </div>

                                    <ul
                                      className={`${tabDetails.secondChild.id === secondChild.id && tabDetails.secondChild.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} custom-left-sidebar-scrollbar overflow-y-auto transition-all duration-500`}
                                    >
                                      {secondChild.tabDropdownList.map(
                                        (thirdChild) =>
                                          thirdChild.tabDropdownList.length >
                                          0 ? null : (
                                            // Third Child
                                            <Link
                                              key={thirdChild.id}
                                              href={thirdChild.pathName}
                                            >
                                              <li
                                                className={`${mainPath === thirdChild.id ? "text-light-weight-800" : "text-light-weight-450"} flex-start group gap-3 pl-10 pt-4 font-poppins-rg text-[12px] hover:text-light-weight-800`}
                                              >
                                                <span
                                                  className={`size-[5px] rounded-full border border-light-weight-450 group-hover:bg-white ${mainPath === thirdChild.id ? "bg-white" : ""}`}
                                                ></span>
                                                {thirdChild.tabName}
                                              </li>
                                            </Link>
                                          )
                                      )}
                                    </ul>
                                  </li>
                                ) : (
                                  // Second Child
                                  <Link
                                    key={secondChild.id}
                                    href={secondChild.pathName}
                                  >
                                    <li
                                      className={`${mainPath === secondChild.id ? "text-light-weight-800" : "text-light-weight-450"} flex-start group gap-3 pl-7 pt-4 font-poppins-rg text-[13px] hover:text-light-weight-800`}
                                    >
                                      <span
                                        className={`size-[5px] rounded-full border border-light-weight-450 group-hover:bg-white ${mainPath === secondChild.id ? "bg-white" : ""}`}
                                      ></span>
                                      {secondChild.tabName}
                                    </li>
                                  </Link>
                                )
                              )}
                            </ul>
                          </li>
                        ) : (
                          // First Child
                          <TransitionLink
                            key={firstChild.id}
                            href={firstChild.pathName}
                          >
                            <li
                              className={`${mainPath === firstChild.id ? "text-light-weight-800" : "text-light-weight-450"} flex-start gap-2 pl-2 pt-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
                            >
                              <BsDash />
                              {firstChild.tabName}
                            </li>
                          </TransitionLink>
                        )
                      )}
                    </ul>
                  </li>
                ) : (
                  // Parent Tab
                  <Link key={parent.id} href={parent.pathName}>
                    <li
                      className={`pl-1 pt-5 ${pathname.includes(parent.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} hover:text-light-weight-800`}
                    >
                      <div className="flex-start cursor-pointer gap-2">
                        <span className="text-[18px]">{parent.tabIcon}</span>
                        <span className="font-poppins-rg text-[15px]">
                          {parent.tabName}
                        </span>
                      </div>
                    </li>
                  </Link>
                )
              )}
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  // NOTE Small Icon View Size
  const verticalSmallIconLeftSideView = () => {
    return (
      <ul
        className={`relative h-full bg-[#405189] py-2 text-[#a6b4e4] dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
      >
        {leftSidebarData.map((category) =>
          category.tabNameList.map((parent) => (
            // Tab Icon Main Container
            <li
              key={parent.id}
              className="relative flex items-center justify-center py-[13px] hover:cursor-pointer"
              onMouseEnter={() => handleParentHoverState(parent.id)}
              onMouseLeave={() => handleParentHoverState(parent.id)}
            >
              {/* NOTE Parent Icon */}
              <span
                className={`text-[22px] ${
                  pathname.includes(parent.id.toLowerCase()) ? "text-white" : ""
                }`}
              >
                {parent.tabIcon}
              </span>

              {/* NOTE Parent Dropdown Box */}
              <ul
                className={`absolute left-full top-0 z-[9999] w-[200px] rounded-r-[5px] px-2 py-3 font-poppins-rg dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"} ${
                  hoverState.parent.isOpen && hoverState.parent.id === parent.id
                    ? "visible opacity-100"
                    : "hidden opacity-0"
                }`}
              >
                {/* Parent Tab Name  */}
                <span
                  className={`flex w-full items-center justify-between text-[15px] group-hover:text-white ${
                    tabDetails.parent.id === parent.id ? "text-white" : ""
                  } ${parent.tabDropdownList.length > 0 ? "mb-3" : "mb-0"}`}
                >
                  <span>{parent.tabName}</span>
                  {parent.tabDropdownList.length > 0 && (
                    <IoIosArrowForward
                      className={`${
                        hoverState.parent.id === parent.id ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </span>

                {/* First Childrens */}
                {parent.tabDropdownList.length > 0 &&
                  parent.tabDropdownList.map((firstChild) => {
                    return (
                      <li
                        key={firstChild.id}
                        className={`cursor-pointer font-poppins-rg`}
                      >
                        {firstChild.tabDropdownList.length > 0 ? (
                          // FirstChild Tab having dropdown
                          <ul
                            className={`relative flex items-center gap-2 p-2 text-[13px]`}
                            onMouseEnter={() =>
                              handleFirstChildHoverState(firstChild.id)
                            }
                            onMouseLeave={() =>
                              handleFirstChildHoverState(firstChild.id)
                            }
                          >
                            <span
                              className={`flex w-full items-center justify-between text-[13px] hover:text-white ${
                                tabDetails.firstChild.id === firstChild.id
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              <span>{firstChild.tabName}</span>
                              <IoIosArrowForward />
                            </span>

                            {/* Second Children */}
                            <li
                              className={`absolute left-full top-0 z-[9999] w-[200px] rounded-r-[5px] p-3 font-poppins-rg dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"} ${
                                hoverState.firstChild.isOpen &&
                                hoverState.firstChild.id === firstChild.id
                                  ? "visible opacity-100"
                                  : "hidden opacity-0"
                              }`}
                            >
                              {firstChild.tabDropdownList.map((secondChild) =>
                                // Second Child Having Dropdown
                                secondChild.tabDropdownList.length > 0 ? (
                                  <ul
                                    key={secondChild.id}
                                    className={`relative flex items-center gap-2 p-2 text-[13px]`}
                                    onMouseEnter={() =>
                                      handleSecondChildHoverState(
                                        secondChild.id
                                      )
                                    }
                                    onMouseLeave={() =>
                                      handleSecondChildHoverState(
                                        secondChild.id
                                      )
                                    }
                                  >
                                    <span
                                      className={`flex w-full items-center justify-between text-[13px] hover:text-white ${
                                        tabDetails.secondChild.id ===
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
                                      className={`absolute left-full top-0 z-[9999] w-[200px] rounded-[5px] p-3 font-poppins-rg dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"} ${
                                        hoverState.secondChild.isOpen &&
                                        hoverState.secondChild.id ===
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
                                                className={`flex items-center gap-2 p-2 text-[13px] hover:text-white ${
                                                  tabDetails.thirdChild.id ===
                                                  thirdChild.id
                                                    ? "text-white"
                                                    : ""
                                                }`}
                                              >
                                                {thirdChild.tabName}
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
                                      className={`flex items-center gap-2 p-2 text-[13px] hover:text-white ${
                                        tabDetails.secondChild.id ===
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
                          <Link href={firstChild.pathName} key={firstChild.id}>
                            <span
                              className={`flex items-center gap-2 p-2 text-[13px] hover:text-white ${tabDetails.firstChild.id === firstChild.id ? "text-white" : ""}`}
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
        leftSidbarSizeType === "small-icon-view" ? "sticky" : `fixed`
      } transition-300 left-0 top-0 z-[99] ${width}`}
    >
      {/* NOTE Sidebar Top Logo Section */}
      <div
        className={`sticky left-0 top-0 z-[100] h-[70px] w-full ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"} px-[20px] dark:bg-dark-dencity-300`}
      >
        <Link href="/dashboard" className="flex-center size-full">
          {leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
            <Image src={logoSmall} alt="logo small" width={25} height={25} />
          ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? (
            <Image src={logoLight} alt="logo light" width={100} height={22} />
          ) : (
            <Image
              src={theme === "light" ? logoDark : logoLight}
              alt="logo light"
              width={100}
              height={22}
            />
          )}
        </Link>
      </div>

      {/* NOTE Tab Section */}
      {leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW
        ? verticalSmallIconLeftSideView()
        : verticalDefaultLeftSidebarView()}
    </div>
  );
};

export default LeftSidebar;
