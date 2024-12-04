"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import logoDark from "../../../app/assets/images/logo-dark.png";
import logoLight from "../../../app/assets/images/logo-light.png";
import logoSmall from "../../../app/assets/images/logo-sm.png";
import leftSidebarData from "../../../app/assets/leftSidebarData/leftSidebarData";

import {
  sidebarColor,
  sidebarSize,
  sidebarMainSize,
  position,
  layoutThemePrimaryColor,
  sidebarGradientColor,
  sidebarImage,
  layout,
  sidebarVisibility,
  sidebarView,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { LeftSidebarSmallIconView, TransitionLink } from "@/components";
import { changeToggleSmallButtonStatus } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const LeftSidebar = ({ width }) => {
  const {
    leftSidebarSizeType,
    leftSidebarSizeMain,
    leftSidebarColorType,
    leftSidebarGradientColorType,
    toggleSmallButtonStatus,
    layoutPositionType,
    layoutThemePrimaryColorType,
    leftSidebarImageType,
    layoutType,
    leftSidebarVisibilityType,
    leftSidebarViewType,
  } = useAppSelector((state) => state.layout);
  const pathname = usePathname();
  const mainPath = pathname.split("/")[1];
  const dispatch = useAppDispatch();

  const [tabDetails, setTabDetails] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
    thirdChild: { id: "", isOpen: false },
  });

  const [isContainerHover, setIsContainerHover] = useState(false);
  const [isFixedBtnCliked, setIsFixedBtnClicked] = useState(false);

  let bgColor;
  let bgImageUrl;
  let gradientBgColor;
  let textColor;
  let hoverTextColor;
  let groupHoverBgColor;
  let borderColor;

  switch (layoutThemePrimaryColorType) {
    case layoutThemePrimaryColor.TEAL_GREEN:
      bgColor = "bg-[#066b5e]";
      textColor = "text-[#066b5e]";
      hoverTextColor = "hover:text-[#066b5e]";
      groupHoverBgColor = "group-hover:bg-[#066b5e]";
      borderColor = "border border-[#066b5e]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#1d2129] to-[#066b5e]";
          break;
        default:
          gradientBgColor = "bg-gradient-to-r from-[#066b5e] to-[#10a99a]";
          break;
      }
      break;

    case layoutThemePrimaryColor.ROYAL_PURPLE:
      bgColor = "bg-[#5147A3]";
      textColor = "text-[#5147A3]";
      hoverTextColor = "hover:text-[#5147A3]";
      groupHoverBgColor = "group-hover:bg-[#5147A3]";
      borderColor = "border border-[#5147A3]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#1d2129] to-[#5147A3]";
          break;
        default:
          gradientBgColor = "bg-gradient-to-r from-[#5147A3] to-[#10a99a]";
          break;
      }
      break;

    case layoutThemePrimaryColor.COBALT_BLUE:
      bgColor = "bg-[#2a5fc1]";
      textColor = "text-[#2a5fc1]";
      hoverTextColor = "hover:text-[#2a5fc1]";
      groupHoverBgColor = "group-hover:bg-[#2a5fc1]";
      borderColor = "border border-[#2a5fc1]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#1d2129] to-[#2a5fc1]";
          break;
        default:
          gradientBgColor = "bg-gradient-to-r from-[#2a5fc1] to-[#10a99a]";
          break;
      }
      break;

    default:
      bgColor = "bg-[#405189]";
      textColor = "text-[#405189]";
      hoverTextColor = "hover:text-[#405189]";
      groupHoverBgColor = "group-hover:bg-[#405189]";
      borderColor = "border border-[#405189]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          gradientBgColor = "bg-gradient-to-r from-[#1d2129] to-[#405189]";
          break;
        default:
          gradientBgColor = "bg-gradient-to-r from-[#405189] to-[#10a99a]";
          break;
      }
      break;
  }

  switch (leftSidebarImageType) {
    case sidebarImage.SNOW:
      bgImageUrl = "bg-sidebar-snow";
      break;
    case sidebarImage.OFFICE:
      bgImageUrl = "bg-sidebar-office";
      break;
    case sidebarImage.PATTERN:
      bgImageUrl = "bg-sidebar-pattern";
      break;
    case sidebarImage.BUBBLE:
      bgImageUrl = "bg-sidebar-bubble";
      break;
    default:
      bgImageUrl = "";
      break;
  }

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

  // NOTE Small Hover View
  useEffect(() => {
    const pageContainerElem = document.getElementById("pages-main-container");
    const elem = document.getElementById("left-sidebar-container");

    if (layoutPositionType !== position.SCROLLABLE) {
      if (
        isFixedBtnCliked &&
        leftSidebarSizeMain === sidebarMainSize.SM_HOVER
      ) {
        pageContainerElem.classList.remove("ml-[65px]");
        pageContainerElem.classList.add("ml-[250px]");
      } else {
        setIsFixedBtnClicked(false);
        setIsContainerHover(false);
        if (leftSidebarSizeMain === sidebarMainSize.SM_HOVER) {
          pageContainerElem.classList.remove("ml-[250px]");
          pageContainerElem.classList.add("ml-[65px]");
        } else if (leftSidebarSizeMain !== sidebarMainSize.LG) {
          pageContainerElem.classList.remove("ml-[250px]");
        }
      }
    } else {
      if (
        isFixedBtnCliked &&
        leftSidebarSizeMain === sidebarMainSize.SM_HOVER
      ) {
        elem.classList.add("w-[250px]");
      } else {
        setIsFixedBtnClicked(false);
        setIsContainerHover(false);
        if (leftSidebarSizeMain === sidebarMainSize.MD) {
          elem.classList.add("w-[180px]");
        } else if (leftSidebarSizeMain === sidebarMainSize.SM) {
          elem.classList.add("w-[65px]");
        }
      }
    }
  }, [layoutPositionType, isFixedBtnCliked, leftSidebarSizeMain]);

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

  // NOTE Default AND Compact Sidebar Size
  const verticalDefaultLeftSidebarView = () => {
    return (
      <ul
        className={`custom-left-sidebar-scrollbar relative z-[999] overflow-y-auto ${leftSidebarSizeType === sidebarSize.COMPACT ? "px-0" : "px-4"} ${
          layoutPositionType === position.SCROLLABLE
            ? "h-[calc(100vh-70px)] md:min-h-full"
            : layoutType === layout.SEMI_BOX
              ? "h-[calc(100vh-70px)] 2xl:h-[calc(100vh-110px)]"
              : layoutType === layout.VERTICAL &&
                  leftSidebarViewType === sidebarView.DETACHED
                ? "h-[calc(100vh-70px)] lg:h-[calc(100vh-110px)]"
                : "h-[calc(100vh-70px)]"
        }`}
      >
        {leftSidebarData.map((category) => (
          // Main Category Container
          <li
            key={category.tabCategory}
            className={`${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? "py-0" : "py-[10px]"} ${leftSidebarSizeType === sidebarSize.COMPACT ? `${globalStyleObj.flexColCenter}` : ""}`}
          >
            <span
              className={`${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? "hidden" : "inline"} ${globalStyleObj.text11Light400Semibold} ${leftSidebarSizeType === sidebarSize.COMPACT ? "underline" : ""} uppercase tracking-widest`}
            >
              {category.tabCategory}
            </span>

            <ul className="w-full">
              {category.tabNameList.map((parent) =>
                parent.tabDropdownList.length > 0 ? (
                  <li
                    key={parent.id}
                    className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "pl-0" : "pl-1"} pt-5`}
                  >
                    {/* Parent Tab */}
                    <div
                      className={`cursor-pointer ${
                        leftSidebarSizeType === sidebarSize.COMPACT
                          ? `${globalStyleObj.flexColCenter} gap-1`
                          : `${globalStyleObj.flexStart} gap-2`
                      } 
                        ${
                          pathname.includes(parent.id.toLowerCase())
                            ? `${
                                leftSidebarColorType ===
                                  sidebarColor.DARK_BG_COLOR ||
                                leftSidebarColorType ===
                                  sidebarColor.GRADIENT_BG_COLOR
                                  ? "text-light-weight-800"
                                  : textColor
                              }`
                            : "text-light-weight-450"
                        } 
                        ${
                          leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                          leftSidebarColorType ===
                            sidebarColor.GRADIENT_BG_COLOR
                            ? "hover:text-light-weight-800"
                            : hoverTextColor
                        }`}
                      onClick={() => handleParentTabToggle(parent.id)}
                    >
                      <span className="text-[18px]">{parent.tabIcon}</span>
                      <span className="font-poppins-rg text-[15px]">
                        {parent.tabName}
                      </span>
                      <IoIosArrowForward
                        className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "hidden" : "ml-auto"} ${pathname.includes(parent.id.toLowerCase()) ? "rotate-90" : ""}`}
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
                              className={`${
                                pathname.includes(firstChild.id.toLowerCase())
                                  ? `${
                                      leftSidebarColorType ===
                                        sidebarColor.DARK_BG_COLOR ||
                                      leftSidebarColorType ===
                                        sidebarColor.GRADIENT_BG_COLOR
                                        ? "text-light-weight-800"
                                        : textColor
                                    }`
                                  : "text-light-weight-450"
                              } 
                              ${
                                leftSidebarColorType ===
                                  sidebarColor.DARK_BG_COLOR ||
                                leftSidebarColorType ===
                                  sidebarColor.GRADIENT_BG_COLOR
                                  ? "hover:text-light-weight-800"
                                  : hoverTextColor
                              } 
                              ${
                                leftSidebarSizeType === sidebarSize.COMPACT
                                  ? `${globalStyleObj.flexCenter}`
                                  : `${globalStyleObj.flexStart} gap-2 pl-2`
                              } cursor-pointer pt-4 font-poppins-rg text-[14px]`}
                              onClick={() =>
                                handleFirstChildTabToggle(firstChild.id)
                              }
                            >
                              <BsDash
                                className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "hidden" : "inline"}`}
                              />
                              {firstChild.tabName}
                              <IoIosArrowForward
                                size={15}
                                className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "" : "ml-auto"} ${pathname.includes(firstChild.id.toLowerCase()) ? "rotate-90" : ""}`}
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
                                      className={`group cursor-pointer pt-4 font-poppins-rg text-[13px] 
                                        ${
                                          leftSidebarSizeType ===
                                          sidebarSize.COMPACT
                                            ? `${globalStyleObj.flexCenter}`
                                            : `${globalStyleObj.flexStart} gap-3 pl-7`
                                        }
                                           ${
                                             pathname.includes(secondChild.id)
                                               ? `${
                                                   leftSidebarColorType ===
                                                     sidebarColor.DARK_BG_COLOR ||
                                                   leftSidebarColorType ===
                                                     sidebarColor.GRADIENT_BG_COLOR
                                                     ? "text-light-weight-800"
                                                     : textColor
                                                 }`
                                               : "text-light-weight-450"
                                           } 
                                            ${
                                              leftSidebarColorType ===
                                                sidebarColor.DARK_BG_COLOR ||
                                              leftSidebarColorType ===
                                                sidebarColor.GRADIENT_BG_COLOR
                                                ? "hover:text-light-weight-800"
                                                : hoverTextColor
                                            }`}
                                      onClick={() =>
                                        handleSecondChildTabToggle(
                                          secondChild.id
                                        )
                                      }
                                    >
                                      <span
                                        className={`${
                                          leftSidebarSizeType ===
                                          sidebarSize.COMPACT
                                            ? "hidden"
                                            : "inline"
                                        } 
                                            ${
                                              pathname.includes(
                                                secondChild.id.toLowerCase()
                                              )
                                                ? `${
                                                    leftSidebarColorType ===
                                                      sidebarColor.DARK_BG_COLOR ||
                                                    leftSidebarColorType ===
                                                      sidebarColor.GRADIENT_BG_COLOR
                                                      ? "border border-white"
                                                      : borderColor
                                                  }`
                                                : "border border-light-weight-450"
                                            } 
                                              ${
                                                leftSidebarColorType ===
                                                  sidebarColor.DARK_BG_COLOR ||
                                                leftSidebarColorType ===
                                                  sidebarColor.GRADIENT_BG_COLOR
                                                  ? "group-hover:bg-white"
                                                  : groupHoverBgColor
                                              } size-[5px] rounded-full border`}
                                      ></span>
                                      {secondChild.tabName}
                                      <IoIosArrowForward
                                        size={15}
                                        className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "" : "ml-auto"} ${pathname.includes(secondChild.id.toLowerCase()) ? "rotate-90" : ""}`}
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
                                            <TransitionLink
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
                                                className={`${
                                                  mainPath === thirdChild.id
                                                    ? `${
                                                        leftSidebarColorType ===
                                                          sidebarColor.DARK_BG_COLOR ||
                                                        leftSidebarColorType ===
                                                          sidebarColor.GRADIENT_BG_COLOR
                                                          ? "text-light-weight-800"
                                                          : textColor
                                                      }`
                                                    : "text-light-weight-450"
                                                } 
                                                    ${
                                                      leftSidebarColorType ===
                                                        sidebarColor.DARK_BG_COLOR ||
                                                      leftSidebarColorType ===
                                                        sidebarColor.GRADIENT_BG_COLOR
                                                        ? "hover:text-light-weight-800"
                                                        : hoverTextColor
                                                    } 
                                                      ${
                                                        leftSidebarSizeType ===
                                                        sidebarSize.COMPACT
                                                          ? `${globalStyleObj.flexCenter}`
                                                          : `${globalStyleObj.flexStart} gap-3 pl-10`
                                                      } group pt-4 font-poppins-rg text-[13px]`}
                                              >
                                                <span
                                                  className={`${
                                                    leftSidebarSizeType ===
                                                    sidebarSize.COMPACT
                                                      ? "hidden"
                                                      : "inline"
                                                  } 
                                                    ${
                                                      mainPath === thirdChild.id
                                                        ? `${
                                                            leftSidebarColorType ===
                                                              sidebarColor.DARK_BG_COLOR ||
                                                            leftSidebarColorType ===
                                                              sidebarColor.GRADIENT_BG_COLOR
                                                              ? "border border-white"
                                                              : borderColor
                                                          }`
                                                        : "border border-light-weight-450"
                                                    } 
                                                      ${
                                                        leftSidebarColorType ===
                                                          sidebarColor.DARK_BG_COLOR ||
                                                        leftSidebarColorType ===
                                                          sidebarColor.GRADIENT_BG_COLOR
                                                          ? "group-hover:bg-white"
                                                          : groupHoverBgColor
                                                      } size-[5px] rounded-full`}
                                                ></span>
                                                {thirdChild.tabName}
                                              </li>
                                            </TransitionLink>
                                          )
                                      )}
                                    </ul>
                                  </li>
                                ) : (
                                  // Second Child
                                  <TransitionLink
                                    key={secondChild.id}
                                    href={secondChild.pathName}
                                  >
                                    <li
                                      id={secondChild.id}
                                      parenttabid={secondChild.parentTabId}
                                      firstchildid={secondChild.firstChildId}
                                      className={`${
                                        mainPath === secondChild.id
                                          ? `${
                                              leftSidebarColorType ===
                                                sidebarColor.DARK_BG_COLOR ||
                                              leftSidebarColorType ===
                                                sidebarColor.GRADIENT_BG_COLOR
                                                ? "text-light-weight-800"
                                                : textColor
                                            }`
                                          : "text-light-weight-450"
                                      } 
                                        ${
                                          leftSidebarColorType ===
                                            sidebarColor.DARK_BG_COLOR ||
                                          leftSidebarColorType ===
                                            sidebarColor.GRADIENT_BG_COLOR
                                            ? "hover:text-light-weight-800"
                                            : hoverTextColor
                                        } 
                                          ${
                                            leftSidebarSizeType ===
                                            sidebarSize.COMPACT
                                              ? `${globalStyleObj.flexCenter}`
                                              : `${globalStyleObj.flexStart} gap-3 pl-7`
                                          } group pt-4 font-poppins-rg text-[13px]`}
                                    >
                                      <span
                                        className={`${
                                          leftSidebarSizeType ===
                                          sidebarSize.COMPACT
                                            ? "hidden"
                                            : "inline"
                                        } 
                                          ${
                                            mainPath === secondChild.id
                                              ? `${
                                                  leftSidebarColorType ===
                                                    sidebarColor.DARK_BG_COLOR ||
                                                  leftSidebarColorType ===
                                                    sidebarColor.GRADIENT_BG_COLOR
                                                    ? "border border-white"
                                                    : borderColor
                                                }`
                                              : "border border-light-weight-450"
                                          } 
                                            ${
                                              leftSidebarColorType ===
                                                sidebarColor.DARK_BG_COLOR ||
                                              leftSidebarColorType ===
                                                sidebarColor.GRADIENT_BG_COLOR
                                                ? "group-hover:bg-white"
                                                : groupHoverBgColor
                                            } size-[5px] rounded-full`}
                                      ></span>
                                      {secondChild.tabName}
                                    </li>
                                  </TransitionLink>
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
                              className={`${
                                mainPath === firstChild.id
                                  ? `${
                                      leftSidebarColorType ===
                                        sidebarColor.DARK_BG_COLOR ||
                                      leftSidebarColorType ===
                                        sidebarColor.GRADIENT_BG_COLOR
                                        ? "text-light-weight-800"
                                        : textColor
                                    }`
                                  : "text-light-weight-450"
                              } 
                                ${
                                  leftSidebarColorType ===
                                    sidebarColor.DARK_BG_COLOR ||
                                  leftSidebarColorType ===
                                    sidebarColor.GRADIENT_BG_COLOR
                                    ? "hover:text-light-weight-800"
                                    : hoverTextColor
                                } 
                                  ${
                                    leftSidebarSizeType === sidebarSize.COMPACT
                                      ? "text-center"
                                      : `${globalStyleObj.flexStart} gap-2 pl-2`
                                  } pt-4 font-poppins-rg text-[14px]`}
                            >
                              <BsDash
                                className={`${leftSidebarSizeType === sidebarSize.COMPACT ? "hidden" : "inline"}`}
                              />
                              {firstChild.tabName}
                            </li>
                          </TransitionLink>
                        )
                      )}
                    </ul>
                  </li>
                ) : (
                  // Parent Tab
                  <TransitionLink key={parent.id} href={parent.pathName}>
                    <li
                      id={parent.id}
                      className={`pt-5 ${
                        leftSidebarSizeType === sidebarSize.COMPACT
                          ? "pl-0"
                          : "pl-1"
                      } 
                        ${
                          pathname.includes(parent.id.toLowerCase())
                            ? `${
                                leftSidebarColorType ===
                                  sidebarColor.DARK_BG_COLOR ||
                                leftSidebarColorType ===
                                  sidebarColor.GRADIENT_BG_COLOR
                                  ? "text-light-weight-800"
                                  : textColor
                              }`
                            : "text-light-weight-450"
                        } 
                          ${
                            leftSidebarColorType ===
                              sidebarColor.DARK_BG_COLOR ||
                            leftSidebarColorType ===
                              sidebarColor.GRADIENT_BG_COLOR
                              ? "hover:text-light-weight-800"
                              : hoverTextColor
                          }`}
                    >
                      <div
                        className={`${leftSidebarSizeType === sidebarSize.COMPACT ? `${globalStyleObj.flexColCenter} gap-1` : `${globalStyleObj.flexStart} gap-2`} cursor-pointer`}
                      >
                        <span className="text-[18px]">{parent.tabIcon}</span>
                        <span className="font-poppins-rg text-[15px]">
                          {parent.tabName}
                        </span>
                      </div>
                    </li>
                  </TransitionLink>
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
            className={`relative z-[999] py-2 ${layoutPositionType === position.SCROLLABLE ? "min-h-full" : "min-h-screen"}`}
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
                        ? `${leftSidebarColorType === sidebarColor.DARK_BG_COLOR || leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "text-light-weight-800" : textColor}`
                        : "text-light-weight-450"
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
        id="left-sidebar-container"
        className={`z-[99] bg-cover bg-center ${bgImageUrl} 
        ${
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ||
          layoutPositionType === position.SCROLLABLE
            ? `transition-300 fixed h-screen overflow-hidden md:relative md:h-full md:overflow-visible ${
                layoutType === layout.SEMI_BOX &&
                leftSidebarVisibilityType === sidebarVisibility.HIDDEN
                  ? "hidden"
                  : layoutType === layout.VERTICAL &&
                      leftSidebarViewType === sidebarView.DETACHED
                    ? `${isContainerHover ? "w-[250px]" : width} lg:mt-[90px]`
                    : `${isContainerHover ? "w-[250px]" : width}`
              }`
            : `transition-300 fixed overflow-hidden ${
                layoutType === layout.SEMI_BOX &&
                leftSidebarVisibilityType === sidebarVisibility.SHOW
                  ? `h-screen 2xl:h-[calc(100vh-40px)] 2xl:rounded-sm ${isContainerHover ? "w-[250px]" : width}`
                  : layoutType === layout.SEMI_BOX &&
                      leftSidebarVisibilityType === sidebarVisibility.HIDDEN
                    ? "hidden"
                    : layoutType === layout.VERTICAL &&
                        leftSidebarViewType === sidebarView.DETACHED
                      ? `lg:mt-[90px] lg:h-[calc(100vh-110px)] lg:rounded-sm ${isContainerHover ? "w-[250px]" : width}`
                      : `h-screen ${isContainerHover ? "w-[250px]" : width}`
              }`
        } 
        
        ${
          leftSidebarColorType === sidebarColor.DARK_BG_COLOR
            ? `${bgColor} dark:bg-dark-dencity-300`
            : `${
                leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                  ? `${gradientBgColor}`
                  : "bg-light-dencity-900"
              }`
        }
          `}
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
        {/* NOTE Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 z-[99] ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${bgColor} dark:bg-dark-dencity-300` : leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${gradientBgColor}` : "bg-light-dencity-900"} opacity-90`}
        ></div>

        {/* NOTE Sidebar Top Logo Section */}
        <div
          className={`${layoutType === layout.VERTICAL && leftSidebarViewType === sidebarView.DETACHED ? "transition-300 z-[9999] h-[70px] w-full px-[20px] lg:hidden" : "transition-300 z-[9999] h-[70px] w-full px-[20px]"} ${leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW && layoutPositionType === position.FIXED ? (leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${bgColor} dark:bg-dark-dencity-300` : leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${gradientBgColor}` : "bg-light-dencity-900") : "bg-transparent"} ${layoutPositionType === position.SCROLLABLE ? "relative" : "sticky left-0 top-0"}`}
        >
          <TransitionLink
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
            ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
              leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? (
              <Image
                src={logoLight}
                alt="logo light"
                width={100}
                height={22}
                style={{ width: "auto", height: "auto" }}
              />
            ) : (
              <Image
                src={logoDark}
                alt="logo light"
                width={100}
                height={22}
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </TransitionLink>

          <div
            className={`${leftSidebarSizeType === sidebarSize.SMALL_HOVER_VIEW ? `${globalStyleObj.flexBetween} transition-300` : "hidden"} h-full`}
          >
            <TransitionLink
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
              ) : leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? (
                <Image
                  src={logoLight}
                  alt="logo light"
                  width={100}
                  height={22}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <Image
                  src={logoDark}
                  alt="logo light"
                  width={100}
                  height={22}
                  style={{ width: "auto", height: "auto" }}
                />
              )}
            </TransitionLink>

            <button
              type="button"
              className={`${isContainerHover ? "visible" : "hidden"}`}
              onClick={() => setIsFixedBtnClicked(!isFixedBtnCliked)}
            >
              <span
                className={`${globalStyleObj.flexCenter} size-[16px] rounded-full ${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "border-2 border-gray-200" : "border-2 border-light-weight-400 dark:border-light-weight-450"}`}
              >
                <span
                  className={`${isFixedBtnCliked ? "opacity-100" : "opacity-0"} ${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "bg-gray-200" : "bg-light-weight-400 dark:bg-light-weight-450"} size-[8px] rounded-full`}
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
            bgColor={bgColor}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
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
            bgColor={bgColor}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
          />
        ) : leftSidebarSizeMain === sidebarMainSize.MD &&
          leftSidebarSizeType === sidebarSize.COMPACT ? (
          verticalDefaultLeftSidebarView()
        ) : leftSidebarSizeMain === sidebarMainSize.SM &&
          leftSidebarSizeType === sidebarSize.SMALL_ICON_VIEW ? (
          <LeftSidebarSmallIconView
            tabDetails={tabDetails}
            leftSidebarColorType={leftSidebarColorType}
            pathname={pathname}
            bgColor={bgColor}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
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
            bgColor={bgColor}
            textColor={textColor}
            hoverTextColor={hoverTextColor}
            gradientBgColor={gradientBgColor}
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
