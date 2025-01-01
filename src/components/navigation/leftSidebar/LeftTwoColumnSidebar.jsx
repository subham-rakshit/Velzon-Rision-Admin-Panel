"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

import leftSidebarData from "../../../app/assets/data/leftSidebarData/leftSidebarData";
import logoDark from "../../../app/assets/images/logo-dark.png";
import logoLight from "../../../app/assets/images/logo-light.png";
import logoSmall from "../../../app/assets/images/logo-sm.png";

import {
  layoutThemePrimaryColor,
  position,
  sidebarColor,
  sidebarGradientColor,
  sidebarImage,
  sidebarSize,
} from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { TransitionLink } from "@/components";
import ROUTES from "@/constants/routes";
import {
  changeToggleButtonStatus,
  changeToggleSmallButtonStatus,
} from "@/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const LeftTwoColumnSidebar = ({ width }) => {
  const {
    leftSidebarColorType,
    toggleSmallButtonStatus,
    layoutPositionType,
    layoutThemePrimaryColorType,
    leftSidebarGradientColorType,
    leftSidebarImageType,
    leftSidebarSizeType,
  } = useAppSelector((state) => state.layout);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const t = useTranslations();

  const mainPath = pathname.split("/")[1];

  const [tabDetails, setTabDetails] = useState({
    parent: { id: "", isOpen: false },
    firstChild: { id: "", isOpen: false },
    secondChild: { id: "", isOpen: false },
    thirdChild: { id: "", isOpen: false },
  });

  let bgColor;
  let lightBgColor;
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
      lightBgColor = "bg-[#066b5e]/20";
      hoverTextColor = "hover:text-[#066b5e]";
      groupHoverBgColor = "group-hover:bg-[#066b5e]";
      borderColor = "border border-[#066b5e]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#1d2129]";
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
      lightBgColor = "bg-[#5147A3]/20";
      hoverTextColor = "hover:text-[#5147A3]";
      groupHoverBgColor = "group-hover:bg-[#5147A3]";
      borderColor = "border border-[#5147A3]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#1d2129]";
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
      lightBgColor = "bg-[#2a5fc1]/20";
      hoverTextColor = "hover:text-[#2a5fc1]";
      groupHoverBgColor = "group-hover:bg-[#2a5fc1]";
      borderColor = "border border-[#2a5fc1]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#1d2129]";
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
      lightBgColor = "bg-[#405189]/20";
      hoverTextColor = "hover:text-[#405189]";
      groupHoverBgColor = "group-hover:bg-[#405189]";
      borderColor = "border border-[#405189]";
      switch (leftSidebarGradientColorType) {
        case sidebarGradientColor.SEC_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#347cef]";
          break;
        case sidebarGradientColor.THIRD_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#2a99dd]";
          gradientBgColor = "bg-gradient-to-r from-[#2a99dd] to-[#0fb0a6]";
          break;
        case sidebarGradientColor.FOURTH_CHILD_GRADIENT_BG_COLOR:
          bgColor = "bg-[#1d2129]";
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

  return (
    <>
      <div
        className={`${window.innerWidth < 768 && toggleSmallButtonStatus ? "fixed left-0 top-0 z-[99] h-screen w-full bg-[#000]/30" : "hidden"}`}
        onClick={() => dispatch(changeToggleSmallButtonStatus(false))}
      ></div>

      <div
        className={`transition-300 z-[999] flex overflow-hidden ${width} ${layoutPositionType === position.SCROLLABLE ? (window.innerWidth < 768 ? "fixed h-screen" : "sticky min-h-full") : "fixed h-screen"}`}
      >
        {/* Icon View */}
        <div
          className={`custom-left-sidebar-scrollbar ${globalStyleObj.flexColStart} h-full w-[70px] overflow-y-auto border-r-2 ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${bgColor} border-[#000]/5 dark:bg-dark-dencity-200` : `${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${bgColor} border-[#000]/5` : `bg-light-dencity-800`}`}`}
        >
          <div className={`${globalStyleObj.flexCenter} min-h-[70px]`}>
            <TransitionLink href={ROUTES.DASHBOARD_ECOMMERCE}>
              <Image src={logoSmall} alt="small logo" width={22} height={22} />
            </TransitionLink>
          </div>

          <ul className={`my-[10px] ${globalStyleObj.flexColStart} gap-2`}>
            {leftSidebarData.map((category) =>
              category.tabNameList.map((tab) =>
                tab.tabDropdownList.length > 0 ? (
                  <li
                    key={tab.id}
                    className={`${globalStyleObj.flexCenter} size-[42px] cursor-pointer rounded-[4px] text-[22px] ${pathname.includes(tab.id.toLowerCase()) ? `${leftSidebarColorType === sidebarColor.DARK_BG_COLOR || leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? "bg-[#f3f3f3]/10 text-light-weight-800" : `${textColor} ${lightBgColor}`}` : "text-light-weight-450"}`}
                    onClick={() => handleParentTabToggle(tab.id)}
                  >
                    <span>{tab.tabIcon}</span>
                  </li>
                ) : (
                  <TransitionLink
                    key={tab.id}
                    href={tab.pathName}
                    onClick={() => {
                      handleParentTabToggle(tab.id);
                      dispatch(changeToggleButtonStatus(true));
                    }}
                  >
                    <li
                      id={tab.id}
                      className={`${globalStyleObj.flexCenter} size-[42px] rounded-[4px] text-[22px] ${
                        pathname.includes(tab.id.toLowerCase())
                          ? `${lightBgColor} ${textColor}`
                          : "text-light-weight-450"
                      }`}
                    >
                      <span>{tab.tabIcon}</span>
                    </li>
                  </TransitionLink>
                )
              )
            )}
          </ul>
        </div>

        {/* Tabnames */}
        <div
          className={`relative h-full flex-1 overflow-hidden bg-cover bg-center ${bgImageUrl} ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${bgColor} dark:bg-dark-dencity-300` : `${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${gradientBgColor}` : "bg-light-dencity-900"}`}`}
        >
          <div
            className={`pointer-events-none absolute inset-0 z-[99] ${leftSidebarColorType === sidebarColor.DARK_BG_COLOR ? `${bgColor} dark:bg-dark-dencity-300` : `${leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR ? `${gradientBgColor}` : "bg-light-dencity-900"}`} opacity-90`}
          ></div>

          <div
            className={`${globalStyleObj.flexCenter} relative z-[999] min-h-[70px]`}
          >
            <TransitionLink href={ROUTES.DASHBOARD_ECOMMERCE}>
              <Image
                src={
                  leftSidebarColorType === sidebarColor.DARK_BG_COLOR ||
                  leftSidebarColorType === sidebarColor.GRADIENT_BG_COLOR
                    ? logoLight
                    : logoDark
                }
                alt="logo light"
                width={100}
                height={22}
                style={{ width: "auto", height: "auto" }}
              />
            </TransitionLink>
          </div>

          <div className="custom-left-sidebar-scrollbar relative z-[999] h-[calc(100vh-70px)] overflow-y-auto p-[10px]">
            {leftSidebarData.map((category) =>
              category.tabNameList.map((parent) =>
                parent.tabDropdownList.length > 0 ? (
                  <ul
                    key={parent.id}
                    className={`${tabDetails.parent.id === parent.id && tabDetails.parent.isOpen ? "max-h-[1000px]" : "max-h-0"} transition-300 overflow-hidden`}
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
                            {firstChild.tabName === "Level 1.2"
                              ? t(`Level 1.2`)
                              : t(firstChild.tabName)}
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
                                    className={`group cursor-pointer pt-4 font-poppins-rg text-[13px] ${
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
                                      handleSecondChildTabToggle(secondChild.id)
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
                                    {secondChild.tabName === "Level 2.2"
                                      ? t(`Level 2.2`)
                                      : t(secondChild.tabName)}
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
                                              {thirdChild.tabName ===
                                              "Level 3.1"
                                                ? t("Level 3.1")
                                                : thirdChild.tabName ===
                                                    "Level 3.2"
                                                  ? t("Level 3.2")
                                                  : t(thirdChild.tabName)}
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
                                    {secondChild.tabName === "Level 2.1"
                                      ? t(`Level 2.1`)
                                      : t(secondChild.tabName)}
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
                            {firstChild.tabName === "Level 1.1"
                              ? t(`Level 1.1`)
                              : t(firstChild.tabName)}
                          </li>
                        </TransitionLink>
                      )
                    )}
                  </ul>
                ) : null
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftTwoColumnSidebar;
