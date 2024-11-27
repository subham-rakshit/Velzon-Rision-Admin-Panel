"use client";

import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import {
  sidebarColor,
  sidebarSize,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import leftSidebarData from "@/app/assets/leftSidebarData/leftSidebarData";
import { globalStyleObj } from "@/app/assets/styles";
import { TransitionLink } from "@/components";

const LeftSidebarCompactView = ({
  pathname,
  mainPath,
  tabDetails,
  leftSidebarColorType,
  leftSidbarSizeType,
  handleParentTabToggle,
  handleFirstChildTabToggle,
  handleSecondChildTabToggle,
}) => {
  return (
    <ul
      className={`custom-left-sidebar-scrollbar h-[calc(100vh-70px)] overflow-y-auto dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
    >
      {leftSidebarData.map((category) => (
        // Main Category Container
        <li
          key={category.tabCategory}
          className={`${globalStyleObj.flexColCenter} py-[10px]`}
        >
          <span
            className={`${leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? "hidden" : "inline"} text-11-light400-sb uppercase tracking-widest underline`}
          >
            {category.tabCategory}
          </span>

          <ul className="w-full">
            {category.tabNameList.map((parent) =>
              parent.tabDropdownList.length > 0 ? (
                <li key={parent.id} className={`pt-5`}>
                  {/* Parent Tab */}
                  <div
                    className={`${globalStyleObj.flexColCenter} cursor-pointer gap-1 ${pathname.includes(parent.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} hover:text-light-weight-800`}
                    onClick={() => handleParentTabToggle(parent.id)}
                  >
                    <span className="text-[18px]">{parent.tabIcon}</span>
                    <span className="font-poppins-rg text-[15px]">
                      {parent.tabName}
                    </span>
                  </div>

                  <ul
                    className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} custom-left-sidebar-scrollbar overflow-y-auto transition-all duration-500`}
                  >
                    {parent.tabDropdownList.map((firstChild) =>
                      firstChild.tabDropdownList.length > 0 ? (
                        // First Child
                        <li key={firstChild.id}>
                          <div
                            className={`${pathname.includes(firstChild.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} ${globalStyleObj.flexCenter} cursor-pointer gap-1 pt-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
                            onClick={() =>
                              handleFirstChildTabToggle(firstChild.id)
                            }
                          >
                            {firstChild.tabName}
                            <IoIosArrowForward
                              size={15}
                              className={`${pathname.includes(firstChild.id.toLowerCase()) ? "rotate-90" : ""}`}
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
                                    className={`${globalStyleObj.flexCenter} cursor-pointer gap-1 pt-3 font-poppins-rg text-[13px] ${pathname.includes(secondChild.id) ? "text-light-weight-800" : "text-light-weight-450"} group hover:text-light-weight-800`}
                                    onClick={() =>
                                      handleSecondChildTabToggle(secondChild.id)
                                    }
                                  >
                                    {secondChild.tabName}
                                    <IoIosArrowForward
                                      size={15}
                                      className={`${pathname.includes(secondChild.id.toLowerCase()) ? "rotate-90" : ""}`}
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
                                              className={`${mainPath === thirdChild.id ? "text-light-weight-800" : "text-light-weight-450"} ${globalStyleObj.flexCenter} group pt-2 font-poppins-rg text-[12px] hover:text-light-weight-800`}
                                            >
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
                                    id={secondChild.id}
                                    parenttabid={secondChild.parentTabId}
                                    firstchildid={secondChild.firstChildId}
                                    className={`${mainPath === secondChild.id ? "text-light-weight-800" : "text-light-weight-450"} ${globalStyleObj.flexCenter} group pt-3 font-poppins-rg text-[13px] hover:text-light-weight-800`}
                                  >
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
                            id={firstChild.id}
                            parenttabid={firstChild.parentTabId}
                            className={`${mainPath === firstChild.id ? "text-light-weight-800" : "text-light-weight-450"} pt-4 text-center font-poppins-rg text-[14px] hover:text-light-weight-800`}
                          >
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
                    className={`pt-5 ${pathname.includes(parent.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} hover:text-light-weight-800`}
                  >
                    <div
                      className={`${globalStyleObj.flexColCenter} cursor-pointer gap-1`}
                    >
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

export default LeftSidebarCompactView;
