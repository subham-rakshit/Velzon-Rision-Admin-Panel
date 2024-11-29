"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import logoDark from "../../../app/assets/images/logo-dark.png";
import logoLight from "../../../app/assets/images/logo-light.png";
import logoSmall from "../../../app/assets/images/logo-sm.png";
import leftSidebarData from "../../../app/assets/leftSidebarData/leftSidebarData";
import TransitionLink from "../TransitionLink";

import {
  sidebarColor,
  sidebarSize,
  sidebarMainSize,
  toggleStatus,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { LeftSidebarCompactView, LeftSidebarSmallIconView } from "@/components";
import {
  changeToggleButtonStatus,
  changeToggleSmallButtonStatus,
} from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const LeftSidebar = ({ width }) => {
  const {
    leftSidebarSizeType,
    leftSidebarSizeMain,
    leftSidebarColorType,
    toggleButtonStatus,
    toggleSmallButtonStatus,
  } = useAppSelector((state) => state.layout);
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
    const elem = document.getElementById(mainPath);
    if (elem) {
      const newTabDetails = {
        parent: { id: "", isOpen: false },
        firstChild: { id: "", isOpen: false },
        secondChild: { id: "", isOpen: false },
        thirdChild: { id: "", isOpen: false },
      };

      if (elem.attributes.parenttabid) {
        newTabDetails.parent = {
          id: elem.attributes.parenttabid.value,
          isOpen: true,
        };
      }

      if (elem.attributes.firstchildid) {
        newTabDetails.firstChild = {
          id: elem.attributes.firstchildid.value,
          isOpen: true,
        };
      }

      if (elem.attributes.secondchildid) {
        newTabDetails.secondChild = {
          id: elem.attributes.secondchildid.value,
          isOpen: true,
        };
      }

      setTabDetails(newTabDetails);
    }
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
            className={`${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? "py-0" : "py-[10px]"}`}
          >
            <span
              className={`${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? "hidden" : "inline"} ${globalStyleObj.text11Light400Semibold} uppercase tracking-widest`}
            >
              {category.tabCategory}
            </span>

            <ul>
              {category.tabNameList.map((parent) =>
                parent.tabDropdownList.length > 0 ? (
                  <li key={parent.id} className={`pl-1 pt-5`}>
                    {/* Parent Tab */}
                    <div
                      className={`${globalStyleObj.flexStart} cursor-pointer gap-2 ${pathname.includes(parent.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} hover:text-light-weight-800`}
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
                      className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-y-hidden transition-all duration-500`}
                    >
                      {parent.tabDropdownList.map((firstChild) =>
                        firstChild.tabDropdownList.length > 0 ? (
                          // First Child
                          <li key={firstChild.id}>
                            <div
                              className={`${pathname.includes(firstChild.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} ${globalStyleObj.flexStart} cursor-pointer gap-2 pl-2 pt-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
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
                              className={`${tabDetails.firstChild.id === firstChild.id && tabDetails.firstChild.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-y-hidden transition-all duration-500`}
                            >
                              {firstChild.tabDropdownList.map((secondChild) =>
                                secondChild.tabDropdownList.length > 0 ? (
                                  // Second Child
                                  <li key={secondChild.id}>
                                    <div
                                      className={`${globalStyleObj.flexStart} cursor-pointer gap-3 pl-7 pt-4 font-poppins-rg text-[13px] ${pathname.includes(secondChild.id) ? "text-light-weight-800" : "text-light-weight-450"} group hover:text-light-weight-800`}
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
                                      className={`${tabDetails.secondChild.id === secondChild.id && tabDetails.secondChild.isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"} overflow-y-hidden transition-all duration-500`}
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
                                                className={`${mainPath === thirdChild.id ? "text-light-weight-800" : "text-light-weight-450"}  ${globalStyleObj.flexStart} group gap-3 pl-10 pt-4 font-poppins-rg text-[12px] hover:text-light-weight-800`}
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
                                      id={secondChild.id}
                                      parenttabid={secondChild.parentTabId}
                                      firstchildid={secondChild.firstChildId}
                                      className={`${mainPath === secondChild.id ? "text-light-weight-800" : "text-light-weight-450"}  ${globalStyleObj.flexStart} group gap-3 pl-7 pt-4 font-poppins-rg text-[13px] hover:text-light-weight-800`}
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
                              id={firstChild.id}
                              parenttabid={firstChild.parentTabId}
                              className={`${mainPath === firstChild.id ? "text-light-weight-800" : "text-light-weight-450"} ${globalStyleObj.flexStart} gap-2 pl-2 pt-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
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
                      id={parent.id}
                      className={`pl-1 pt-5 ${pathname.includes(parent.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} hover:text-light-weight-800`}
                    >
                      <div
                        className={`${globalStyleObj.flexStart} cursor-pointer gap-2`}
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

  // NOTE Small Icon Hover View
  const verticalSmallIconHoverView = () => {
    return (
      <>
        {isContainerHover ? (
          verticalDefaultLeftSidebarView()
        ) : (
          <ul
            className={`min-h-screen py-2 text-light-weight-450 dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
          >
            {leftSidebarData.map((category) =>
              category.tabNameList.map((parent) => (
                // Tab Icon Main Container
                <li
                  key={parent.id}
                  className={`${globalStyleObj.flexCenter} py-[13px] hover:cursor-pointer`}
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
    <>
      <div
        className={`${window.innerWidth < 768 && toggleSmallButtonStatus ? "fixed left-0 top-0 z-[99] h-screen w-full bg-[#000]/30" : "hidden"}`}
        onClick={() => dispatch(changeToggleSmallButtonStatus(false))}
      ></div>

      <div
        className={`min-h-full ${
          (leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW &&
            isFixedBtnCliked) ||
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW
            ? "sticky"
            : "fixed"
        } ${isContainerHover ? "w-[250px]" : width} sm:transition-300 z-[99]`}
        onMouseEnter={() =>
          leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW &&
          !isFixedBtnCliked
            ? setIsContainerHover(true)
            : null
        }
        onMouseLeave={() =>
          leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW &&
          !isFixedBtnCliked
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
            className={`${leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? "hidden" : `${globalStyleObj.flexCenter}`} size-full `}
          >
            {leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
              <Image
                src={logoSmall}
                alt="logo small"
                width={25}
                height={25}
                style={{ width: "auto", height: "auto" }}
              />
            ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? (
              <Image
                src={logoLight}
                alt="logo light"
                width={100}
                height={22}
                style={{ width: "auto", height: "auto" }}
              />
            ) : (
              <Image
                src={theme === "light" ? logoDark : logoLight}
                alt="logo light"
                width={100}
                height={22}
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </Link>

          <div
            className={`${leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? `${globalStyleObj.flexBetween} transition-300` : "hidden"} h-full`}
          >
            <Link
              href="/dashboard"
              className={`${globalStyleObj.flexStart} transition-300 h-full w-fit`}
            >
              {leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
              !isContainerHover ? (
                <Image
                  src={logoSmall}
                  alt="logo small"
                  width={25}
                  height={25}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? (
                <Image
                  src={logoLight}
                  alt="logo light"
                  width={100}
                  height={22}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <Image
                  src={theme === "light" ? logoDark : logoLight}
                  alt="logo light"
                  width={100}
                  height={22}
                  style={{ width: "auto", height: "auto" }}
                />
              )}
            </Link>

            <button
              type="button"
              className={`${isContainerHover ? "visible" : "hidden"}`}
              onClick={handleSmallHoverIconFixedButton}
            >
              <span
                className={`${globalStyleObj.flexCenter} size-[16px] rounded-full border-2 border-light-weight-400 dark:border-light-weight-450`}
              >
                <span
                  className={`${isFixedBtnCliked ? "opacity-100" : "opacity-0"} size-[8px] rounded-full bg-light-weight-400 dark:bg-light-weight-450`}
                ></span>
              </span>
            </button>
          </div>
        </div>

        {/* NOTE Left Sidebar Changes According Sizes */}
        {leftSidebarSizeMain === sidebarMainSize.LG &&
        leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.LG &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={pathname}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={pathname}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.COMPACT ? (
          <LeftSidebarCompactView
            pathname={pathname}
            mainPath={mainPath}
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            leftSidebarSizeType={leftSidebarSizeType}
            handleParentTabToggle={handleParentTabToggle}
            handleFirstChildTabToggle={handleFirstChildTabToggle}
            handleSecondChildTabToggle={handleSecondChildTabToggle}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.SM &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={pathname}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.SM &&
          leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={pathname}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
          leftSidebarSizeType === sidebarSize.DEFAULT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.SM_HOVER &&
          leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? (
          verticalSmallIconHoverView()
        ) : null}
      </div>
    </>
  );
};

export default LeftSidebar;
