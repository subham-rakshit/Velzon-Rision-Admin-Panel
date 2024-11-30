"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { RiBriefcase2Line } from "react-icons/ri";

import { position } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import leftSidebarData from "@/app/assets/leftSidebarData/leftSidebarData";
import { globalStyleObj } from "@/app/assets/styles";
import { TransitionLink } from "@/components";
import { useAppSelector } from "@/lib/store/hooks";

const HorizontalSidebar = ({ resizeHeight }) => {
  const { layoutPositionType } = useAppSelector((state) => state.layout);
  const pathname = usePathname();
  const mainPath = pathname.split("/")[1];

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

  const [moreTabIsOpen, setMoreTabIsOpen] = useState(false);
  const [moreTabOnHover, setMoreTabOnHover] = useState(false);

  const moreTabs = useMemo(
    () => [
      "Advance",
      "Widgets",
      "Forms",
      "Tables",
      "Charts",
      "Icons",
      "Maps",
      "Level",
    ],
    []
  );

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

      if (moreTabs.some((tab) => tab === newTabDetails.parent.id)) {
        setMoreTabIsOpen(true);
      }
      setTabDetails(newTabDetails);
    }
  }, [mainPath, moreTabs]);

  // NOTE Handle Default State Functionality
  const handleParentTabToggle = (parentId) => {
    if (resizeHeight !== "h-[48px]") {
      setTabDetails((prev) => ({
        ...prev,
        parent: {
          ...prev.parent,
          id: parentId,
          isOpen: prev.parent.id === parentId ? !prev.parent.isOpen : true,
        },
      }));
    }
  };

  const handleFirstChildTabToggle = (firstChildId) => {
    if (resizeHeight !== "h-[48px]") {
      setTabDetails((prev) => ({
        ...prev,
        firstChild: {
          ...prev.firstChild,
          id: firstChildId,
          isOpen:
            prev.firstChild.id === firstChildId
              ? !prev.firstChild.isOpen
              : true,
        },
      }));
    }
  };

  const handleSecondChildTabToggle = (secondChildId) => {
    if (resizeHeight !== "h-[48px]") {
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
    }
  };

  const handleMoreTabsToggle = () => {
    if (resizeHeight !== "h-[48px]") {
      setTabDetails((prev) => ({
        ...prev,
        parent: {
          isOpen: false,
        },
      }));

      setMoreTabIsOpen(!moreTabIsOpen);
    }
  };

  // NOTE Handle Hover State Functionality
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

  const commonParentTab = ({ parent }) => {
    return parent.tabDropdownList.length > 0 ? (
      <li
        key={parent.id}
        className={`pb-5 pl-1 lg:relative lg:flex lg:h-full lg:pb-0 lg:pl-[20px]`}
        onMouseEnter={() => handleParentHoverState(parent.id)}
        onMouseLeave={() => handleParentHoverState(parent.id)}
      >
        {/* Parent Tab */}
        <div
          className={`${globalStyleObj.flexStart} cursor-pointer gap-2 ${pathname.includes(parent.id.toLowerCase()) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} hover:text-accent-yankees-blue dark:hover:text-light-weight-800`}
          onClick={() => handleParentTabToggle(parent.id)}
        >
          <span className="text-[18px]">{parent.tabIcon}</span>
          <span className="font-poppins-rg text-[15px]">{parent.tabName}</span>
          <IoIosArrowForward
            className={`ml-auto ${pathname.includes(parent.id.toLowerCase()) ? "rotate-90" : "lg:rotate-90"}`}
          />
        </div>

        <ul
          className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} overflow-y-hidden transition-all duration-500 lg:overflow-y-visible lg:shadow-light ${hoverState.parent.id === parent.id && hoverState.parent.isOpen && parent.id !== "base-ui" ? "lg:absolute lg:top-full lg:min-w-[180px] lg:rounded-b-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : hoverState.parent.id === parent.id && hoverState.parent.isOpen && parent.id === "base-ui" ? "lg:absolute lg:top-full lg:flex lg:min-w-[600px] lg:flex-wrap lg:justify-between lg:rounded-b-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"}`}
        >
          {parent.tabDropdownList.map((firstChild) =>
            firstChild.tabDropdownList.length > 0 ? (
              // First Child
              <li
                key={firstChild.id}
                className="lg:relative"
                onMouseEnter={() => handleFirstChildHoverState(firstChild.id)}
                onMouseLeave={() => handleFirstChildHoverState(firstChild.id)}
              >
                <div
                  className={`${pathname.includes(firstChild.id.toLowerCase()) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} ${globalStyleObj.flexStart} cursor-pointer gap-2 pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-3 lg:pr-2`}
                  onClick={() => handleFirstChildTabToggle(firstChild.id)}
                >
                  <BsDash className="lg:hidden" />
                  {firstChild.tabName}
                  <IoIosArrowForward
                    size={15}
                    className={`ml-auto ${pathname.includes(firstChild.id.toLowerCase()) ? "rotate-90 lg:rotate-0" : "lg:rotate-0"}`}
                  />
                </div>

                <ul
                  className={`${tabDetails.firstChild.id === firstChild.id && tabDetails.firstChild.isOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} overflow-y-hidden transition-all duration-500 lg:overflow-y-visible lg:shadow-light ${hoverState.firstChild.id === firstChild.id && hoverState.firstChild.isOpen ? "lg:absolute lg:left-full lg:top-0 lg:min-w-[200px] lg:rounded-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"}`}
                >
                  {firstChild.tabDropdownList.map((secondChild) =>
                    secondChild.tabDropdownList.length > 0 ? (
                      // Second Child
                      <li
                        key={secondChild.id}
                        className="lg:relative"
                        onMouseEnter={() =>
                          handleSecondChildHoverState(secondChild.id)
                        }
                        onMouseLeave={() =>
                          handleSecondChildHoverState(secondChild.id)
                        }
                      >
                        <div
                          className={`${globalStyleObj.flexStart} cursor-pointer gap-3 pl-7 pt-4 font-poppins-rg text-[13px] lg:px-5 ${pathname.includes(secondChild.id) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} group hover:text-accent-yankees-blue dark:hover:text-light-weight-800`}
                          onClick={() =>
                            handleSecondChildTabToggle(secondChild.id)
                          }
                        >
                          <span
                            className={`size-[5px] rounded-full border ${pathname.includes(secondChild.id) ? "border-accent-yankees-blue dark:border-light-weight-800" : "border-light-weight-400 dark:border-light-weight-450"} group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden`}
                          ></span>
                          {secondChild.tabName}
                          <IoIosArrowForward
                            size={15}
                            className={`ml-auto ${pathname.includes(secondChild.id.toLowerCase()) ? "rotate-90 lg:rotate-0" : "lg:rotate-0"}`}
                          />
                        </div>

                        <ul
                          className={`${tabDetails.secondChild.id === secondChild.id && tabDetails.secondChild.isOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} overflow-y-hidden transition-all duration-500 lg:overflow-y-visible lg:shadow-light ${hoverState.secondChild.id === secondChild.id && hoverState.secondChild.isOpen ? "lg:absolute lg:left-full lg:top-0 lg:min-w-[200px] lg:rounded-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"}`}
                        >
                          {secondChild.tabDropdownList.map((thirdChild) =>
                            thirdChild.tabDropdownList.length > 0 ? null : (
                              // Third Child
                              <Link
                                key={thirdChild.id}
                                href={thirdChild.pathName}
                              >
                                <li
                                  id={thirdChild.id}
                                  parenttabid={thirdChild.parentTabId}
                                  firstchildid={thirdChild.firstChildId}
                                  secondchildid={thirdChild.secondChildId}
                                  className={`${mainPath === thirdChild.id ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"}  ${globalStyleObj.flexStart} group gap-3 pl-10 pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-5`}
                                >
                                  <span
                                    className={`size-[5px] rounded-full border border-light-weight-450 group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden ${mainPath === thirdChild.id ? "bg-accent-yankees-blue dark:bg-white" : ""}`}
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
                      <Link key={secondChild.id} href={secondChild.pathName}>
                        <li
                          id={secondChild.id}
                          parenttabid={secondChild.parentTabId}
                          firstchildid={secondChild.firstChildId}
                          className={`${mainPath === secondChild.id ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"}  ${globalStyleObj.flexStart} group gap-3 pl-7 pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-5`}
                        >
                          <span
                            className={`size-[5px] rounded-full border border-light-weight-450 group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden ${mainPath === secondChild.id ? "bg-accent-yankees-blue dark:bg-white" : ""}`}
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
              <TransitionLink key={firstChild.id} href={firstChild.pathName}>
                <li
                  id={firstChild.id}
                  parenttabid={firstChild.parentTabId}
                  className={`${mainPath === firstChild.id ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} ${globalStyleObj.flexStart} gap-2 pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-3 lg:pr-2 ${parent.id === "base-ui" ? "w-[180px]" : ""}`}
                >
                  <BsDash className="lg:hidden" />
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
          className={`pb-5 pl-1 ${pathname.includes(parent.id.toLowerCase()) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} hover:text-accent-yankees-blue dark:hover:text-light-weight-800`}
        >
          <div className={`${globalStyleObj.flexStart} cursor-pointer gap-2`}>
            <span className="text-[18px]">{parent.tabIcon}</span>
            <span className="font-poppins-light text-[15px]">
              {parent.tabName}
            </span>
          </div>
        </li>
      </Link>
    );
  };

  return (
    <ul
      className={`${resizeHeight} ${globalStyleObj.backgroundLight900Dark300} ${resizeHeight !== "h-0" ? "pt-5 lg:pt-0" : "pt-0"} ${layoutPositionType === position.FIXED ? "fixed top-[70px] lg:sticky" : ""} custom-left-sidebar-scrollbar w-full overflow-y-auto border-t px-5 shadow-light transition-all dark:border-none md:px-10 lg:flex  lg:overflow-y-visible lg:pl-[30px]`}
    >
      {/* Upto category = Components & index = 0 */}
      {leftSidebarData.map((category) =>
        category.tabCategory !== "Components"
          ? category.tabNameList.map((parent) => commonParentTab({ parent }))
          : category.tabNameList.map((parent, index) =>
              index === 0 ? commonParentTab({ parent }) : null
            )
      )}

      {/* After category = Components & index > 0 */}
      <li
        className={`pb-5 pl-1 lg:relative lg:flex lg:h-full lg:pb-0 lg:pl-[20px]`}
        onMouseEnter={() => setMoreTabOnHover(true)}
        onMouseLeave={() => setMoreTabOnHover(false)}
      >
        <div
          className={`${globalStyleObj.flexStart} cursor-pointer gap-2 ${moreTabs.some((tab) => tab.toLowerCase() === mainPath.split("-")[0]) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} hover:text-accent-yankees-blue dark:hover:text-light-weight-800`}
          onClick={handleMoreTabsToggle}
        >
          <span className="text-[18px]">
            <RiBriefcase2Line />
          </span>
          <span className="font-poppins-rg text-[15px]">More</span>
          <IoIosArrowForward
            className={`ml-auto ${moreTabs.some((tab) => tab.toLowerCase() === mainPath.split("-")[0]) ? "rotate-90" : "rotate-90"}`}
          />
        </div>

        <ul
          className={`${moreTabIsOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} overflow-y-hidden transition-all duration-500 lg:overflow-y-visible lg:shadow-light ${moreTabOnHover ? "lg:absolute lg:left-0 lg:top-full lg:min-w-[180px] lg:rounded-b-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"}`}
        >
          {leftSidebarData.map((category) =>
            category.tabCategory === "Components"
              ? category.tabNameList.map((parent, index) =>
                  index !== 0 ? (
                    parent.tabDropdownList.length > 0 ? (
                      <li
                        key={parent.id}
                        className={`pt-5 lg:relative lg:pl-2 lg:pr-3`}
                        onMouseEnter={() => handleParentHoverState(parent.id)}
                        onMouseLeave={() => handleParentHoverState(parent.id)}
                      >
                        {/* Parent Tab */}
                        <div
                          className={`${globalStyleObj.flexStart} cursor-pointer gap-2 ${pathname.includes(parent.id.toLowerCase()) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} hover:text-accent-yankees-blue dark:hover:text-light-weight-800`}
                          onClick={() => handleParentTabToggle(parent.id)}
                        >
                          <BsDash className="lg:hidden" />
                          <IoIosArrowForward
                            className={`mr-auto hidden lg:inline ${pathname.includes(parent.id.toLowerCase()) ? "rotate-180" : "rotate-180"}`}
                          />

                          <span className="font-poppins-rg text-[13px]">
                            {parent.tabName}
                          </span>
                          <IoIosArrowForward
                            className={`ml-auto lg:hidden ${pathname.includes(parent.id.toLowerCase()) ? "rotate-90" : ""}`}
                          />
                        </div>

                        <ul
                          className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} ${hoverState.parent.id === parent.id && hoverState.parent.isOpen ? "lg:absolute lg:right-full lg:top-0 lg:min-w-[160px] lg:rounded-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"} overflow-y-hidden transition-all duration-500 lg:overflow-y-visible lg:shadow-light`}
                        >
                          {parent.tabDropdownList.map((firstChild) =>
                            firstChild.tabDropdownList.length > 0 ? (
                              // First Child
                              <li
                                key={firstChild.id}
                                className={`lg:relative`}
                                onMouseEnter={() =>
                                  handleFirstChildHoverState(firstChild.id)
                                }
                                onMouseLeave={() =>
                                  handleFirstChildHoverState(firstChild.id)
                                }
                              >
                                <div
                                  className={`${pathname.includes(firstChild.id.toLowerCase()) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} ${globalStyleObj.flexStart} group cursor-pointer gap-2 pl-[24px] pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-2 lg:pr-4`}
                                  onClick={() =>
                                    handleFirstChildTabToggle(firstChild.id)
                                  }
                                >
                                  <span
                                    className={`size-[5px] rounded-full border ${pathname.includes(firstChild.id) ? "border-accent-yankees-blue dark:border-light-weight-800" : "border-light-weight-400 dark:border-light-weight-450"} group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden`}
                                  ></span>
                                  <IoIosArrowForward
                                    size={15}
                                    className={`mr-auto hidden lg:inline ${pathname.includes(firstChild.id.toLowerCase()) ? "rotate-180" : "rotate-180"}`}
                                  />
                                  <span className="lg:ml-auto">
                                    {firstChild.tabName}
                                  </span>
                                  <IoIosArrowForward
                                    size={15}
                                    className={`ml-auto lg:hidden ${pathname.includes(firstChild.id.toLowerCase()) ? "rotate-90" : ""}`}
                                  />
                                </div>

                                <ul
                                  className={`${tabDetails.firstChild.id === firstChild.id && tabDetails.firstChild.isOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} ${hoverState.firstChild.id === firstChild.id && hoverState.firstChild.isOpen ? "lg:absolute lg:right-full lg:top-0 lg:min-w-[160px] lg:rounded-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"} overflow-y-hidden transition-all duration-500 lg:overflow-y-visible lg:shadow-light`}
                                >
                                  {firstChild.tabDropdownList.map(
                                    (secondChild) =>
                                      secondChild.tabDropdownList.length > 0 ? (
                                        // Second Child
                                        <li
                                          key={secondChild.id}
                                          className={`lg:relative`}
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
                                          <div
                                            className={`${globalStyleObj.flexStart} cursor-pointer gap-3 pl-[34px] pt-4 font-poppins-rg text-[13px] ${pathname.includes(secondChild.id) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} group hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-2 lg:pr-4`}
                                            onClick={() =>
                                              handleSecondChildTabToggle(
                                                secondChild.id
                                              )
                                            }
                                          >
                                            <span
                                              className={`size-[5px] rounded-full border ${pathname.includes(secondChild.id) ? "border-accent-yankees-blue dark:border-light-weight-800" : "border-light-weight-400 dark:border-light-weight-450"} group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden`}
                                            ></span>
                                            <IoIosArrowForward
                                              size={15}
                                              className={`mr-auto hidden lg:inline ${pathname.includes(secondChild.id.toLowerCase()) ? "rotate-180" : "rotate-180"}`}
                                            />
                                            <span className="lg:ml-auto">
                                              {secondChild.tabName}
                                            </span>
                                            <IoIosArrowForward
                                              size={15}
                                              className={`ml-auto lg:hidden ${pathname.includes(secondChild.id.toLowerCase()) ? "rotate-90" : ""}`}
                                            />
                                          </div>

                                          <ul
                                            className={`${tabDetails.secondChild.id === secondChild.id && tabDetails.secondChild.isOpen ? "h-fit opacity-100" : "max-h-0 opacity-0 lg:max-h-fit lg:opacity-100"} ${hoverState.secondChild.id === secondChild.id && hoverState.secondChild.isOpen ? "lg:absolute lg:right-full lg:top-0 lg:min-w-[160px] lg:rounded-[5px] lg:bg-light-dencity-900 lg:pb-5 lg:dark:bg-dark-dencity-300" : "lg:hidden"} overflow-y-hidden transition-all duration-500 lg:shadow-light`}
                                          >
                                            {secondChild.tabDropdownList.map(
                                              (thirdChild) =>
                                                thirdChild.tabDropdownList
                                                  .length > 0 ? null : (
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
                                                      className={`${mainPath === thirdChild.id ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} ${globalStyleObj.flexStart} group gap-3 pl-[50px] pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-2 lg:pr-4`}
                                                    >
                                                      <span
                                                        className={`size-[5px] rounded-full border border-light-weight-450 group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden ${mainPath === thirdChild.id ? "bg-accent-yankees-blue dark:bg-white" : ""}`}
                                                      ></span>
                                                      <span className="lg:ml-auto">
                                                        {thirdChild.tabName}
                                                      </span>
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
                                            parenttabid={
                                              secondChild.parentTabId
                                            }
                                            firstchildid={
                                              secondChild.firstChildId
                                            }
                                            className={`${mainPath === secondChild.id ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"}  ${globalStyleObj.flexStart} group gap-3 pl-[34px] pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-2 lg:pr-4`}
                                          >
                                            <span
                                              className={`size-[5px] rounded-full border border-light-weight-450 group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden ${mainPath === secondChild.id ? "bg-accent-yankees-blue dark:bg-white" : ""}`}
                                            ></span>
                                            <span className="lg:ml-auto">
                                              {secondChild.tabName}
                                            </span>
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
                                  className={`${mainPath === firstChild.id ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} ${globalStyleObj.flexStart} group gap-2 pl-[24px] pt-4 font-poppins-rg text-[13px] hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-2 lg:pr-4`}
                                >
                                  <span
                                    className={`size-[5px] rounded-full border border-light-weight-450 group-hover:border-accent-yankees-blue dark:group-hover:border-light-weight-800 lg:hidden ${mainPath === firstChild.id ? "bg-accent-yankees-blue dark:bg-white" : ""}`}
                                  ></span>
                                  <span className="lg:ml-auto">
                                    {firstChild.tabName}
                                  </span>
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
                          className={`pt-5 ${pathname.includes(parent.id.toLowerCase()) ? "text-accent-yankees-blue dark:text-light-weight-800" : "text-light-weight-400 dark:text-light-weight-450"} hover:text-accent-yankees-blue dark:hover:text-light-weight-800 lg:pl-2 lg:pr-3`}
                        >
                          <div
                            className={`${globalStyleObj.flexStart} cursor-pointer gap-2`}
                          >
                            <BsDash className="lg:hidden" />

                            <span className="font-poppins-rg text-[13px] lg:ml-auto">
                              {parent.tabName}
                            </span>
                          </div>
                        </li>
                      </Link>
                    )
                  ) : null
                )
              : null
          )}
        </ul>
      </li>
    </ul>
  );
};

export default HorizontalSidebar;
