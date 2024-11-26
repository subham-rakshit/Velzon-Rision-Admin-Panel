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

import { sidebarColor } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { changeToggleButtonStatus } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const LeftTwoColumnSidebar = ({
  width,
  leftSidebarColorType,
  toggleButtonStatus,
}) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const mainPath = pathname.split("/")[1];

  const [tabDetails, setTabDetails] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
    thirdChild: { id: "", isOpen: false },
  });

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

  const handleParentTabToggle = (parentId) => {
    if (tabDetails.parent.id !== parentId) {
      setTabDetails((prev) => ({
        ...prev,
        parent: {
          ...prev.parent,
          id: parentId,
          isOpen: true,
        },
      }));
    }
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

  return (
    <div
      className={`transition-300 fixed z-[999] flex h-screen overflow-hidden ${width}`}
    >
      {/* Icon View */}
      <div
        className={`custom-left-sidebar-scrollbar flex h-full w-[70px] flex-col items-center overflow-y-auto shadow-xl dark:bg-dark-dencity-200 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-custom-blue-600" : "bg-light-dencity-800"}`}
      >
        <div className="flex-center min-h-[70px]">
          <Image src={logoSmall} alt="small logo" width={22} height={22} />
        </div>

        <ul className="my-[10px] flex flex-col items-center gap-2">
          {leftSidebarData.map((category) =>
            category.tabNameList.map((tab) =>
              tab.tabDropdownList.length > 0 ? (
                <li
                  key={tab.id}
                  className={`flex-center size-[42px] cursor-pointer rounded-[4px] text-[22px] text-light-weight-450 ${
                    pathname.includes(tab.id.toLowerCase())
                      ? "bg-[#5A6895] text-white dark:bg-dark-dencity-50"
                      : ""
                  }`}
                  onClick={() => handleParentTabToggle(tab.id)}
                >
                  <span
                    className={`${tabDetails.parent.id === tab.id ? "text-white" : ""}`}
                  >
                    {tab.tabIcon}
                  </span>
                </li>
              ) : (
                <Link
                  key={tab.id}
                  href={tab.pathName}
                  onClick={() => {
                    handleParentTabToggle(tab.id);
                    dispatch(changeToggleButtonStatus(true));
                  }}
                >
                  <li
                    id={tab.id}
                    className={`flex-center size-[42px] rounded-[4px] text-[22px] text-light-weight-450 ${
                      pathname.includes(tab.id.toLowerCase())
                        ? "bg-[#5A6895] text-white dark:bg-dark-dencity-50"
                        : ""
                    }`}
                  >
                    <span
                      className={`${tabDetails.parent.id === tab.id ? "text-white" : ""}`}
                    >
                      {tab.tabIcon}
                    </span>
                  </li>
                </Link>
              )
            )
          )}
        </ul>
      </div>

      {/* Tabnames */}
      <div
        className={`h-full flex-1 overflow-hidden dark:bg-dark-dencity-300 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? "bg-light-weight-500" : "bg-light-dencity-900"}`}
      >
        <div className="flex-center min-h-[70px]">
          {leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? (
            <Image src={logoLight} alt="logo light" width={100} height={22} />
          ) : (
            <Image
              src={theme === "light" ? logoDark : logoLight}
              alt="logo light"
              width={100}
              height={22}
            />
          )}
        </div>

        <div className="custom-left-sidebar-scrollbar h-[calc(100vh-70px)] overflow-y-auto p-[10px]">
          {leftSidebarData.map((category) =>
            category.tabNameList.map((parent) =>
              parent.tabDropdownList.length > 0 ? (
                <ul
                  key={parent.id}
                  className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "block" : "hidden"}`}
                >
                  {parent.tabDropdownList.map((firstChild) =>
                    firstChild.tabDropdownList.length > 0 ? (
                      // First Child
                      <li key={firstChild.id}>
                        <div
                          className={`${pathname.includes(firstChild.id.toLowerCase()) ? "text-light-weight-800" : "text-light-weight-450"} flex-start cursor-pointer gap-2 pb-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
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
                                  className={`flex-start cursor-pointer gap-3 pb-4 pl-3 font-poppins-rg text-[13px] ${pathname.includes(secondChild.id) ? "text-light-weight-800" : "text-light-weight-450"} group hover:text-light-weight-800`}
                                  onClick={() =>
                                    handleSecondChildTabToggle(secondChild.id)
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
                                            id={thirdChild.id}
                                            parenttabid={thirdChild.parentTabId}
                                            firstchildid={
                                              thirdChild.firstChildId
                                            }
                                            secondchildid={
                                              thirdChild.secondChildId
                                            }
                                            className={`${mainPath === thirdChild.id ? "text-light-weight-800" : "text-light-weight-450"} flex-start group gap-3 pb-4 pl-6 font-poppins-rg text-[12px] hover:text-light-weight-800`}
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
                                  className={`${mainPath === secondChild.id ? "text-light-weight-800" : "text-light-weight-450"} flex-start group gap-3 pb-4 pl-3 font-poppins-rg text-[13px] hover:text-light-weight-800`}
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
                      <Link key={firstChild.id} href={firstChild.pathName}>
                        <li
                          id={firstChild.id}
                          parenttabid={firstChild.parentTabId}
                          className={`${mainPath === firstChild.id ? "text-light-weight-800" : "text-light-weight-450"} flex-start gap-2 pb-4 font-poppins-rg text-[14px] hover:text-light-weight-800`}
                        >
                          <BsDash />
                          {firstChild.tabName}
                        </li>
                      </Link>
                    )
                  )}
                </ul>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftTwoColumnSidebar;
