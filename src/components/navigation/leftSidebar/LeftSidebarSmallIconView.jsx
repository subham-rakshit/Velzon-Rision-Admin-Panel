"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { sidebarColor } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import leftSidebarData from "@/app/assets/leftSidebarData/leftSidebarData";
import { globalStyleObj } from "@/app/assets/styles";

const LeftSidebarSmallIconView = ({
  tabDetails,
  leftSidebarColorType,
  pathname,
}) => {
  const [hoverState, setHoverState] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
  });

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

  return (
    <ul
      className={`relative h-full py-2 text-light-weight-450 dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
    >
      {leftSidebarData.map((category) =>
        category.tabNameList.map((parent) =>
          parent.tabDropdownList.length > 0 ? (
            // Tab Icon Main Container
            <li
              key={parent.id}
              className={`relative ${globalStyleObj.flexCenter} py-[13px] hover:cursor-pointer`}
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
                  className={`${globalStyleObj.flexBetween} w-full text-[15px] group-hover:text-white ${
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
                            className={`relative ${globalStyleObj.flexStart} gap-2 p-2 text-[13px]`}
                            onMouseEnter={() =>
                              handleFirstChildHoverState(firstChild.id)
                            }
                            onMouseLeave={() =>
                              handleFirstChildHoverState(firstChild.id)
                            }
                          >
                            <span
                              className={`${globalStyleObj.flexBetween} w-full text-[13px] hover:text-white ${
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
                                    className={`relative ${globalStyleObj.flexStart} gap-2 p-2 text-[13px]`}
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
                                      className={`${globalStyleObj.flexBetween} w-full text-[13px] hover:text-white ${
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
                                                id={thirdChild.id}
                                                parenttabid={
                                                  thirdChild.parentTabId
                                                }
                                                firstchildid={
                                                  thirdChild.firstChildId
                                                }
                                                secondchildid={
                                                  thirdChild.secondChildId
                                                }
                                                className={`${globalStyleObj.flexStart} gap-2 p-2 text-[13px] hover:text-white ${
                                                  pathname.split("/")[1] ===
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
                                      id={secondChild.id}
                                      parenttabid={secondChild.parentTabId}
                                      firstchildid={secondChild.firstChildId}
                                      className={`${globalStyleObj.flexStart} gap-2 p-2 text-[13px] hover:text-white ${
                                        pathname.split("/")[1] ===
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
                              id={firstChild.id}
                              parenttabid={firstChild.parentTabId}
                              className={`${globalStyleObj.flexStart} gap-2 p-2 text-[13px] hover:text-white ${pathname.split("/")[1] === firstChild.id ? "text-white" : ""}`}
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
          ) : (
            <Link href={parent.pathName} key={parent.id}>
              <li
                id={parent.id}
                className={`relative ${globalStyleObj.flexCenter} py-[13px] hover:cursor-pointer`}
                onMouseEnter={() => handleParentHoverState(parent.id)}
                onMouseLeave={() => handleParentHoverState(parent.id)}
              >
                <span
                  className={`text-[22px] ${
                    pathname.includes(parent.id.toLowerCase())
                      ? "text-white"
                      : ""
                  }`}
                >
                  {parent.tabIcon}
                </span>
                <div
                  className={`absolute left-full top-0 z-[9999] w-[200px] rounded-r-[5px] px-2 py-3 font-poppins-rg dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"} ${
                    hoverState.parent.isOpen &&
                    hoverState.parent.id === parent.id
                      ? "visible opacity-100"
                      : "hidden opacity-0"
                  }`}
                >
                  <span
                    className={`${globalStyleObj.flexBetween} w-full text-[15px] group-hover:text-white ${
                      tabDetails.parent.id === parent.id ? "text-white" : ""
                    }`}
                  >
                    {parent.tabName}
                  </span>
                </div>
              </li>
            </Link>
          )
        )
      )}
    </ul>
  );
};

export default LeftSidebarSmallIconView;
