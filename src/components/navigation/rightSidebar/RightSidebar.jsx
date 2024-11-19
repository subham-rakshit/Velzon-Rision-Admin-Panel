"use client";

import React, { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

import {
  rightSidebarThemeData,
  rightSidbarColorSchemaData,
  rightSidbarLayoutWidthData,
  rightSidbarLayoutPositionData,
  rightSidbarTopbarColorData,
  rightSidbarColorData,
  rightSidebarImagesData,
  rightSidebarPrimaryColorData,
} from "@/app/assets/rightSidebarData/rightSidebarData";

import {
  changeLayoutType,
  changeRightSideBarIsOpen,
  changeSidebarUserProfileAvtarType,
  changeLayoutThemeType,
  changeLayoutModeType,
  changeLayoutWidthType,
  changeLayoutPositionType,
  changeTopbarColorType,
  changeLeftSidbarSizeType,
  changeLeftSidebarViewType,
  changeLeftSidebarColorType,
  changeLeftSidebarGradientColorType,
  changeLeftSidebarImageType,
  changeLayoutThemePrimaryColorType,
  changePreloader,
} from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useRouter } from "next/router";

const RightSidebar = () => {
  const {
    layoutType,
    rightSideBarIsOpen,
    sidebarUserProfileAvtarType,
    layoutThemeType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarColorType,
    leftSidbarSizeType,
    leftSidebarViewType,
    leftSidebarColorType,
    leftSidebarGradientColorType,
    leftSidebarImageType,
    layoutThemePrimaryColorType,
    preloader,
  } = useAppSelector((state) => state.layout);

  const dispatch = useAppDispatch();
  const time = useTime();
  const rotate = useTransform(time, [0, 2000], [0, 360], {
    clamp: rightSideBarIsOpen,
  });

  // NOTE Avatar Toggle Btn Functionality
  const toggleAvatarSwitch = () => {
    if (sidebarUserProfileAvtarType === "show") {
      dispatch(changeSidebarUserProfileAvtarType("hide"));
    } else if (sidebarUserProfileAvtarType === "hide") {
      dispatch(changeSidebarUserProfileAvtarType("show"));
    }
  };

  return (
    <>
      {/* NOTE Settings Button */}
      <div className="w-[120px] fixed left-full -translate-x-full min-h-[100vh] flex items-end justify-center pb-8">
        <motion.button
          style={{ rotate }}
          onClick={() => dispatch(changeRightSideBarIsOpen(true))}
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#299CDB]"
        >
          <FaCog size={22} color="white" />
        </motion.button>
      </div>

      {/* NOTE Main Right Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={rightSideBarIsOpen ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed right-0 top-0 w-[380px] h-[100vh] bg-white z-[99]`}
      >
        {/* NOTE Header */}
        <div className="w-full h-[60px] bg-[#505f93] flex items-center justify-between px-[16px]">
          <h1 className="text-white font-poppins-md text-[16px]">
            Theme Customizer
          </h1>
          <button
            type="button"
            onClick={() => dispatch(changeRightSideBarIsOpen(false))}
            className="hover:scale-[1.3] transition-style"
          >
            <MdClose size={22} color="#9da6c2" />
          </button>
        </div>

        {/* NOTE Inner */}
        <div className="p-[25px] h-[calc(100vh-60px)] overflow-y-auto custom-left-sidebar-scrollbar shadow-light">
          {/* NOTE Layouts */}
          <div>
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Layout
            </h3>
            <p className="text-soft text-[13px]">Choose your layout</p>
            <div className="flex items-center flex-wrap gap-3 mt-5">
              {/* Vertical Layout */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changeLayoutType("vertical"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "vertical" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-2">
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {layoutType === "vertical" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Vertical
                </span>
              </button>

              {/* Horizontal Layout */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLayoutType("horizontal"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "horizontal" ? "border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex flex-col justify-between gap-2">
                    <span className="w-full flex flex-col">
                      <span className="w-full h-[17px] flex items-center justify-between bg-[#f3f6f9] px-[5px]">
                        <span className="w-[8px] h-[8px] rounded-full bg-[#e2e5ed]"></span>
                        <span className="flex items-center gap-2">
                          <span className="w-[16px] h-[4px] bg-[#e2e5ed]"></span>
                          <span className="w-[16px] h-[4px] bg-[#e2e5ed]"></span>
                        </span>
                      </span>
                      <span className="w-full h-[8px] bg-[#f3f6f9] mt-[4px]"></span>
                    </span>
                    <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                  </span>

                  {layoutType === "horizontal" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Horizontal
                </span>
              </button>

              {/* Two Column Layout */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLayoutType("two-column"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "two-column" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-1">
                    <span className="w-[10px] h-[100%] bg-[#f3f6f9] flex flex-col">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col gap-1">
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {layoutType === "two-column" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Two Column
                </span>
              </button>

              {/* Semi Box Layout */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLayoutType("semi-box"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "semi-box" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-2 p-1">
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {layoutType === "semi-box" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Semi Box
                </span>
              </button>
            </div>
          </div>

          {/* NOTE User Profile Avatar Button */}
          <div className="flex items-center gap-2 my-5">
            <button
              type="button"
              className={`border border-[#bdbfc7] rounded-full w-[40px] py-[2px] px-[3px] cursor-pointer flex ${
                sidebarUserProfileAvtarType === "hide"
                  ? "bg-[#4f5e92] border-[#4f5e92] justify-end"
                  : "transparent border-[#bdbfc7] justify-start"
              }`}
              onClick={toggleAvatarSwitch}
            >
              <motion.span
                className={`w-[14px] h-[14px] rounded-full ${
                  sidebarUserProfileAvtarType === "hide"
                    ? "bg-white"
                    : "bg-[#bdbfc7]"
                }`}
                layout
                transition={{ type: "spring", stiffness: 800, damping: 30 }}
              />
            </button>

            <span className="text-[#000] font-poppins-md text-[13px] font-[500] tracking-wide">
              Sidebar User Profile Avatar
            </span>
          </div>

          {/* NOTE Theme */}
          <div>
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Theme
            </h3>
            <p className="text-soft text-[13px]">Choose your suitable Theme.</p>

            <div className="flex flex-wrap gap-3 mt-5">
              {rightSidebarThemeData.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() => dispatch(changeLayoutThemeType(theme.id))}
                >
                  <span
                    className={`relative rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                      layoutThemeType === theme.id ? "border-[#405189]" : ""
                    }`}
                  >
                    <Image
                      src={theme.themeImage}
                      alt={theme.label}
                      width={145}
                      height={125}
                    />
                    {layoutThemeType === theme.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </span>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Color Schema */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Color Schema
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Schema.
            </p>
            <div className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarColorSchemaData.map((color) => (
                <button
                  type="button"
                  key={color.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() => dispatch(changeLayoutModeType(color.id))}
                >
                  <span
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden ${
                      layoutModeType === color.id
                        ? "border border-[#405189]"
                        : "border"
                    } ${color.id === "dark" ? "bg-[#212529]" : ""}`}
                  >
                    <span className="w-full h-full flex gap-2">
                      <span
                        className={`w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col ${
                          color.id === "dark" ? "bg-[#383b3f]" : "bg-[#f3f6f9]"
                        }`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg ${
                            color.id === "dark"
                              ? "bg-[#4c4f53]"
                              : "bg-[#e2e5ed]"
                          }`}
                        ></span>
                        <span className="flex flex-col justify-center gap-1 h-full">
                          {["box-1", "box-2", "box-3"].map((box) => (
                            <span
                              key={box}
                              className={`w-full h-[4px] ${
                                color.id === "dark"
                                  ? "bg-[#4c4f53]"
                                  : "bg-[#e2e5ed]"
                              }`}
                            ></span>
                          ))}
                        </span>
                      </span>
                      <span
                        className={`w-full h-full flex flex-col justify-between`}
                      >
                        {["inner-box-1", "inner-box-2"].map((innerBox) => (
                          <span
                            key={innerBox}
                            className={`w-full h-[8px] bg-[#f3f6f9] ${
                              color.id === "dark"
                                ? "bg-[#383b3f]"
                                : "bg-[#e2e5ed]"
                            }`}
                          ></span>
                        ))}
                      </span>
                    </span>
                    {layoutModeType === color.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </span>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Layout Width */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Layout Width
            </h3>
            <p className="text-soft text-[13px]">
              Choose Fluid or Boxed layout.
            </p>
            <div className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarLayoutWidthData.map((width) => (
                <button
                  type="button"
                  key={width.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() => dispatch(changeLayoutWidthType(width.id))}
                >
                  <span
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                      layoutWidthType === width.id
                        ? "border border-[#405189]"
                        : ""
                    } ${width.id === "boxed" ? "px-2" : "px-0"}`}
                  >
                    <span
                      className={`w-full h-full flex gap-2 ${
                        width.id === "boxed"
                          ? "border-l border-r border-[#e2e5ed]"
                          : ""
                      }`}
                    >
                      <span
                        className={`w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg bg-[#e2e5ed]`}
                        ></span>
                        <span className="flex flex-col justify-center gap-1 h-full">
                          {["w-box-1", "w-box-2", "w-box-3"].map((box) => (
                            <span
                              key={box}
                              className={`w-full h-[4px] bg-[#e2e5ed]`}
                            ></span>
                          ))}
                        </span>
                      </span>
                      <span
                        className={`w-full h-full flex flex-col justify-between`}
                      >
                        {["w-inner-box-1", "w-inner-box-2"].map((innerBox) => (
                          <span
                            key={innerBox}
                            className={`w-full h-[8px] bg-[#f3f6f9]`}
                          ></span>
                        ))}
                      </span>
                    </span>
                    {layoutWidthType === width.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </span>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {width.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Layout Position */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Layout Position
            </h3>
            <p className="text-soft text-[13px]">
              Choose Fixed or Scrollable Layout Position.
            </p>

            <div className="mt-5 rounded-[3px] overflow-hidden">
              {rightSidbarLayoutPositionData.map((position) => (
                <button
                  key={position.id}
                  className={`py-[6px] w-[95px] cursor-pointer font-poppins-rg text-[13px] transition-all duration-500 ease-in-out ${
                    layoutPositionType === position.id
                      ? "bg-[#d4ebf8] text-[#659cdb]"
                      : "bg-[#f3f6f9] text-black"
                  }`}
                  onClick={() =>
                    dispatch(changeLayoutPositionType(position.id))
                  }
                >
                  {position.label}
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Topbar Color */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Topbar Color
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Topbar Color.
            </p>
            <div className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarTopbarColorData.map((topbarColor) => (
                <button
                  type="button"
                  key={topbarColor.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() =>
                    dispatch(changeTopbarColorType(topbarColor.id))
                  }
                >
                  <span
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                      topbarColorType === topbarColor.id
                        ? "border border-[#405189]"
                        : ""
                    }`}
                  >
                    <span className={`w-full h-full flex gap-2`}>
                      <span
                        className={`w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg bg-[#e2e5ed]`}
                        ></span>
                        <span className="flex flex-col justify-center gap-1 h-full">
                          {["c-box-1", "c-box-2", "c-box-3"].map((box) => (
                            <span
                              key={box}
                              className={`w-full h-[4px] bg-[#e2e5ed]`}
                            ></span>
                          ))}
                        </span>
                      </span>
                      <span
                        className={`w-full h-full flex flex-col justify-between`}
                      >
                        {["c-inner-box-1", "c-inner-box-2"].map(
                          (innerBox, index) => (
                            <span
                              key={innerBox}
                              className={`w-full h-[8px] ${
                                topbarColor.id === "dark-color" && index === 0
                                  ? "bg-[#405189]"
                                  : "bg-[#f3f6f9]"
                              }`}
                            ></span>
                          )
                        )}
                      </span>
                    </span>
                    {topbarColorType === topbarColor.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </span>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {topbarColor.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Sidebar Size */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Sidebar Size
            </h3>
            <p className="text-soft text-[13px]">Choose a size of Sidebar.</p>
            <div className="flex items-center flex-wrap gap-2 mt-5">
              {/* Default Size */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changeLeftSidbarSizeType("default"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "default"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-2">
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {leftSidbarSizeType === "default" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Default
                </span>
              </button>

              {/* Compact Size */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLeftSidbarSizeType("compact"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "compact" ? "border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-2">
                    <span className="w-[17px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {leftSidbarSizeType === "compact" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Compact
                </span>
              </button>

              {/* Small (Icon View) Size */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() =>
                  dispatch(changeLeftSidbarSizeType("small-icon-view"))
                }
              >
                <span
                  className={`relative w-[110px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "small-icon-view"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-1">
                    <span className="w-[10px] h-[100%] bg-[#f3f6f9] flex flex-col">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {leftSidbarSizeType === "small-icon-view" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-tighter mx-auto text-center">
                  Small (Icon View)
                </span>
              </button>

              {/* Small Hover View Size */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() =>
                  dispatch(changeLeftSidbarSizeType("small-hover-view"))
                }
              >
                <span
                  className={`relative w-[110px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "small-hover-view"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-1">
                    <span className="w-[10px] h-[100%] bg-[#f3f6f9] flex flex-col">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {leftSidbarSizeType === "small-hover-view" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-tighter mx-auto text-center">
                  Small Hover View
                </span>
              </button>
            </div>
          </div>

          {/* NOTE Sidebar View */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Sidebar Size
            </h3>
            <p className="text-soft text-[13px]">Choose a size of Sidebar.</p>

            <div className="flex items-center flex-wrap gap-2 mt-5">
              {/* Default View */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changeLeftSidebarViewType("default"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidebarViewType === "default"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-2">
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {leftSidebarViewType === "default" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Default
                </span>
              </button>

              {/* Detached View */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLeftSidebarViewType("detached"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidebarViewType === "detached" ? "border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex flex-col justify-between gap-1">
                    <span className="w-full h-[17px] flex items-center justify-between bg-[#f3f6f9] px-[5px]">
                      <span className="w-[8px] h-[8px] rounded-full bg-[#e2e5ed]"></span>
                      <span className="flex items-center gap-2">
                        <span className="w-[16px] h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-[16px] h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className=" flex flex-col items-center gap-1 w-[24px] h-full bg-[#f3f6f9] mt-[4px] rounded-[4px] ml-1 p-1">
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                    </span>

                    <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                  </span>

                  {leftSidebarViewType === "detached" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Detached
                </span>
              </button>
            </div>
          </div>

          {/* NOTE Sidebar Color */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Sidebar Color
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Sidebar Color.
            </p>

            <div className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarColorData.map((eachColor, index) => (
                <button
                  type="button"
                  key={eachColor.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() =>
                    dispatch(changeLeftSidebarColorType(eachColor.id))
                  }
                >
                  <span
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                      leftSidebarColorType === eachColor.id
                        ? "border border-[#405189]"
                        : ""
                    }`}
                  >
                    <span className="w-full h-full flex gap-2">
                      <span
                        className={`w-[25px] h-[100%] p-[4px] flex flex-col ${
                          eachColor.leftColor
                        } ${index === 0 ? "border-r" : ""}`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg ${eachColor.leftInnerColor}`}
                        ></span>
                        <span className="flex flex-col justify-center gap-1 h-full">
                          <span
                            className={`w-full h-[4px] ${eachColor.leftInnerColor}`}
                          ></span>
                          <span
                            className={`w-full h-[4px] ${eachColor.leftInnerColor}`}
                          ></span>
                          <span
                            className={`w-full h-[4px] ${eachColor.leftInnerColor}`}
                          ></span>
                        </span>
                      </span>
                      <span className="w-full h-full flex flex-col justify-between">
                        <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                        <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      </span>
                    </span>
                    {leftSidebarColorType === eachColor.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </span>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {eachColor.label}
                  </span>
                </button>
              ))}
            </div>

            {leftSidebarColorType === "gradient-bg-color" && (
              <div className="flex items-center flex-wrap gap-2 mt-4 bg-[#f3f6f9] px-[16px] py-[8px] rounded-[4px]">
                {rightSidbarColorData[2].childrenElem.map((eachChild) => (
                  <button
                    key={eachChild.id}
                    type="button"
                    className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${eachChild.leftColor}`}
                    onClick={() =>
                      dispatch(
                        changeLeftSidebarGradientColorType(eachChild.label)
                      )
                    }
                  >
                    {leftSidebarGradientColorType === eachChild.label && (
                      <FaCheckCircle size={16} color="#fff" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NOTE Sidebar Images */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Sidebar Images
            </h3>
            <p className="text-soft text-[13px]">Choose a image of Sidebar.</p>

            <div className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidebarImagesData.map((imgBtn, index) => (
                <button
                  type="button"
                  key={imgBtn.id}
                  className={`relative w-[45px] h-[72px] flex items-center justify-center rounded-[4px] overflow-hidden bg-cover bg-center transition-style ${
                    index === 0 ? `${imgBtn.bgColor}` : `${imgBtn.bgImage}`
                  } ${
                    leftSidebarImageType === imgBtn.id
                      ? "border border-[#405189]"
                      : "border"
                  }`}
                  onClick={() =>
                    dispatch(changeLeftSidebarImageType(imgBtn.id))
                  }
                >
                  {leftSidebarImageType === imgBtn.id ? (
                    <>
                      <FaCheckCircle
                        size={16}
                        color="#fff"
                        className="border border-[#405189] rounded-full z-[99]"
                      />
                      <span className="absolute top-0 left-0 w-full h-full inset-0 bg-[#405582]/50"></span>
                    </>
                  ) : index === 0 ? (
                    <MdClose size={16} />
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Sidebar Primary Color */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Primary Color
            </h3>
            <p className="text-soft text-[13px]">Choose a color of Primary.</p>

            <div className="flex items-center flex-wrap gap-3 mt-4">
              {rightSidebarPrimaryColorData.map((pColor) => (
                <button
                  key={pColor.id}
                  type="button"
                  className={`w-[30px] h-[30px] rounded-[4px] transition-style ${
                    pColor.bgColor
                  } ${
                    layoutThemePrimaryColorType === pColor.id
                      ? "scale-[1.1]"
                      : "scale-[1]"
                  }`}
                  onClick={() =>
                    dispatch(changeLayoutThemePrimaryColorType(pColor.id))
                  }
                ></button>
              ))}
            </div>
          </div>

          {/* Preloader */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Preloader
            </h3>
            <p className="text-soft text-[13px]">Choose a preloader.</p>

            <div className="flex items-center flex-wrap gap-3 mt-4">
              {/* Top Loader */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changePreloader("top-loader"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    preloader === "top-loader" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="relative w-full h-full flex gap-2">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: [0, "100%"] }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="absolute top-0 left-0 h-[3px] bg-[#405189]"
                    ></motion.span>
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {preloader === "top-loader" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Top Loader
                </span>
              </button>

              {/* Spinner */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changePreloader("spinner"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    preloader === "spinner" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="relative w-full h-full flex gap-2">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <ClipLoader
                        size={25}
                        color="#405189"
                        speedMultiplier={0.8}
                        cssOverride={{ borderWidth: "3px" }}
                      />
                    </span>
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {preloader === "spinner" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Spinner
                </span>
              </button>

              {/* Disable */}
              <button
                type="button"
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changePreloader("disable"))}
              >
                <span
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    preloader === "disable" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="w-full h-full flex gap-2">
                    <span className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {preloader === "disable" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </span>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Disable
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RightSidebar;
