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
  sidebarMainSize,
  toggleStatus,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { LeftSidebarCompactView, LeftSidebarSmallIconView } from "@/components";
import { changeToggleButtonStatus } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const LeftSidebar = ({
  width,
  leftSidbarSizeType,
  leftSidbarSizeMain,
  leftSidebarColorType,
  toggleButtonStatus,
}) => {
  const pathname = usePathname();
  const mainPath = pathname.split("/")[1];
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [tabDetails, setTabDetails] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
    thirdChild: { id: "", isOpen: false },
  });

  const [isContainerHover, setIsContainerHover] = useState(false);
  const [isFixedBtnCliked, setIsFixedBtnClicked] = useState(false);

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

  const handleSmallHoverIconFixedButton = () => {
    const status = toggleButtonStatus === toggleStatus.CLOSE;
    setIsFixedBtnClicked(!isFixedBtnCliked);
    dispatch(changeToggleButtonStatus(status));
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

  // NOTE Small Icon Hover View
  const verticalSmallIconHoverView = () => {
    return (
      <>
        {isContainerHover ? (
          verticalDefaultLeftSidebarView()
        ) : (
          <ul
            className={`h-full py-2 text-light-weight-450 dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
          >
            {leftSidebarData.map((category) =>
              category.tabNameList.map((parent) => (
                // Tab Icon Main Container
                <li
                  key={parent.id}
                  className="flex items-center justify-center py-[13px] hover:cursor-pointer"
                >
                  {/* NOTE Parent Icon */}
                  <span
                    className={`text-[22px] ${
                      pathname.includes(parent.id.toLowerCase())
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {parent.tabIcon}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}
      </>
    );
  };

  return (
    <div
      className={`h-screen ${
        leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW
          ? "sticky"
          : leftSidbarSizeType === sidebarSize.SMALL_HOVER_VIEW &&
              isFixedBtnCliked
            ? "sticky"
            : "fixed"
      } transition-300 left-0 top-0 z-[99] ${isContainerHover ? "w-[250px]" : width}`}
      onMouseEnter={() =>
        leftSidbarSizeType === sidebarSize.SMALL_HOVER_VIEW && !isFixedBtnCliked
          ? setIsContainerHover(true)
          : null
      }
      onMouseLeave={() =>
        leftSidbarSizeType === sidebarSize.SMALL_HOVER_VIEW && !isFixedBtnCliked
          ? setIsContainerHover(false)
          : null
      }
    >
      {/* NOTE Sidebar Top Logo Section */}
      <div
        className={`transition-300 sticky left-0 top-0 z-[100] h-[70px] w-full px-[20px] dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
      >
        <Link
          href="/dashboard"
          className={`${leftSidbarSizeType === sidebarSize.SMALL_HOVER_VIEW ? "hidden" : "flex-center"} size-full`}
        >
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

        <div
          className={`${leftSidbarSizeType === sidebarSize.SMALL_HOVER_VIEW ? "flex-between transition-300" : "hidden"} h-full`}
        >
          <Link
            href="/dashboard"
            className={`flex-start transition-300 h-full w-fit`}
          >
            {leftSidbarSizeMain === sidebarMainSize.SM_HOVER &&
            !isContainerHover ? (
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

          <button
            type="button"
            className={`${isContainerHover ? "visible" : "hidden"}`}
            onClick={handleSmallHoverIconFixedButton}
          >
            <span className="flex-center size-[16px] rounded-full border-2 border-light-weight-400 dark:border-light-weight-450">
              <span
                className={`${isFixedBtnCliked ? "opacity-100" : "opacity-0"} size-[8px] rounded-full bg-light-weight-400 dark:bg-light-weight-450`}
              ></span>
            </span>
          </button>
        </div>
      </div>

      {/* NOTE Left Sidebar Changes According Sizes */}
      {leftSidbarSizeMain === sidebarMainSize.LG &&
      leftSidbarSizeType === sidebarSize.DEFAULT ? (
        verticalDefaultLeftSidebarView()
      ) : leftSidbarSizeMain === sidebarMainSize.LG &&
        leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
        <LeftSidebarSmallIconView
          tabDetails={tabDetails}
          leftSidebarColorType={leftSidebarColorType}
          pathname={pathname}
        />
      ) : leftSidbarSizeMain === sidebarMainSize.MD &&
        leftSidbarSizeType === sidebarSize.DEFAULT ? (
        verticalDefaultLeftSidebarView()
      ) : leftSidbarSizeMain === sidebarMainSize.MD &&
        leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
        <LeftSidebarSmallIconView
          tabDetails={tabDetails}
          leftSidebarColorType={leftSidebarColorType}
          pathname={pathname}
        />
      ) : leftSidbarSizeMain === sidebarMainSize.MD &&
        leftSidbarSizeType === sidebarSize.COMPACT ? (
        <LeftSidebarCompactView
          pathname={pathname}
          mainPath={mainPath}
          tabDetails={tabDetails}
          leftSidebarColorType={leftSidebarColorType}
          leftSidbarSizeType={leftSidbarSizeType}
          handleParentTabToggle={handleParentTabToggle}
          handleFirstChildTabToggle={handleFirstChildTabToggle}
          handleSecondChildTabToggle={handleSecondChildTabToggle}
        />
      ) : leftSidbarSizeMain === sidebarMainSize.SM &&
        leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
        <LeftSidebarSmallIconView
          tabDetails={tabDetails}
          leftSidebarColorType={leftSidebarColorType}
          pathname={pathname}
        />
      ) : leftSidbarSizeMain === sidebarMainSize.SM &&
        leftSidbarSizeType === sidebarSize.DEFAULT ? (
        verticalDefaultLeftSidebarView()
      ) : leftSidbarSizeMain === sidebarMainSize.SM_HOVER &&
        leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
        <LeftSidebarSmallIconView
          tabDetails={tabDetails}
          leftSidebarColorType={leftSidebarColorType}
          pathname={pathname}
        />
      ) : leftSidbarSizeMain === sidebarMainSize.SM_HOVER &&
        leftSidbarSizeType === sidebarSize.DEFAULT ? (
        verticalDefaultLeftSidebarView()
      ) : leftSidbarSizeMain === sidebarMainSize.SM_HOVER &&
        leftSidbarSizeType === sidebarSize.SMALL_HOVER_VIEW ? (
        verticalSmallIconHoverView()
      ) : null}
    </div>
  );
};

export default LeftSidebar;
