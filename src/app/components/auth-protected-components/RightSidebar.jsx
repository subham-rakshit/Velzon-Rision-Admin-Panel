"use client";

import React, { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

import {
  rightSidebarThemeData,
  rightSidbarColorSchemaData,
  rightSidbarLayoutWidthData,
  rightSidbarLayoutPositionData,
  rightSidbarTopbarColorData,
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
} from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";

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
        <div className="p-[25px] h-[calc(100vh-60px)] overflow-y-auto custom-left-sidebar-scrollbar border border-black">
          {/* NOTE Layouts */}
          <div>
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Layout
            </h3>
            <p className="text-soft text-[13px]">Choose your layout</p>
            <ul className="flex items-center flex-wrap gap-3 mt-5">
              {/* Vertical Layout */}
              <li
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changeLayoutType("vertical"))}
              >
                <div
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "vertical" ? "border border-[#405189]" : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-2">
                    <div className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>
                  {layoutType === "vertical" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Vertical
                </span>
              </li>

              {/* Horizontal Layout */}
              <li
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLayoutType("horizontal"))}
              >
                <div
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "horizontal" ? "border-[#405189]" : ""
                  }`}
                >
                  <div className="w-full h-full flex flex-col justify-between gap-2">
                    <div className="w-full flex flex-col">
                      <span className="w-full h-[17px] flex items-center justify-between bg-[#f3f6f9] px-[5px]">
                        <span className="w-[8px] h-[8px] rounded-full bg-[#e2e5ed]"></span>
                        <span className="flex items-center gap-2">
                          <span className="w-[16px] h-[4px] bg-[#e2e5ed]"></span>
                          <span className="w-[16px] h-[4px] bg-[#e2e5ed]"></span>
                        </span>
                      </span>
                      <span className="w-full h-[8px] bg-[#f3f6f9] mt-[4px]"></span>
                    </div>
                    <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                  </div>

                  {layoutType === "horizontal" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Horizontal
                </span>
              </li>

              {/* Two Column Layout */}
              <li
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLayoutType("two-column"))}
              >
                <div
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "two-column" ? "border border-[#405189]" : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-1">
                    <div className="w-[10px] h-[100%] bg-[#f3f6f9] flex flex-col">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>

                    <div className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col gap-1">
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>

                  {layoutType === "two-column" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Two Column
                </span>
              </li>

              {/* Semi Box Layout */}
              <li
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLayoutType("semi-box"))}
              >
                <div
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    layoutType === "semi-box" ? "border border-[#405189]" : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-2 p-1">
                    <div className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>

                  {layoutType === "semi-box" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Semi Box
                </span>
              </li>
            </ul>
          </div>

          {/* NOTE User Profile Avatar Button */}
          <div className="flex items-center gap-2 my-5">
            <div
              className={`border border-[#bdbfc7] rounded-full w-[40px] py-[2px] px-[3px] cursor-pointer flex ${
                sidebarUserProfileAvtarType === "hide"
                  ? "bg-[#4f5e92] border-[#4f5e92] justify-end"
                  : "transparent border-[#bdbfc7] justify-start"
              }`}
              onClick={toggleAvatarSwitch}
            >
              <motion.div
                className={`w-[14px] h-[14px] rounded-full ${
                  sidebarUserProfileAvtarType === "hide"
                    ? "bg-white"
                    : "bg-[#bdbfc7]"
                }`}
                layout
                transition={{ type: "spring", stiffness: 800, damping: 30 }}
              />
            </div>

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

            <ul className="flex flex-wrap gap-3 mt-5">
              {rightSidebarThemeData.map((theme) => (
                <li
                  key={theme.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() => dispatch(changeLayoutThemeType(theme.id))}
                >
                  <div
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
                  </div>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {theme.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOTE Color Schema */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Color Schema
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Schema.
            </p>
            <ul className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarColorSchemaData.map((color) => (
                <li
                  key={color.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() => dispatch(changeLayoutModeType(color.id))}
                >
                  <div
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden ${
                      layoutModeType === color.id
                        ? "border border-[#405189]"
                        : "border"
                    } ${color.id === "dark" ? "bg-[#212529]" : ""}`}
                  >
                    <div className="w-full h-full flex gap-2">
                      <div
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
                      </div>
                      <div
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
                      </div>
                    </div>
                    {layoutModeType === color.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </div>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {color.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOTE Layout Width */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Layout Width
            </h3>
            <p className="text-soft text-[13px]">
              Choose Fluid or Boxed layout.
            </p>
            <ul className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarLayoutWidthData.map((width) => (
                <li
                  key={width.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() => dispatch(changeLayoutWidthType(width.id))}
                >
                  <div
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                      layoutWidthType === width.id
                        ? "border border-[#405189]"
                        : ""
                    } ${width.id === "boxed" ? "px-2" : "px-0"}`}
                  >
                    <div
                      className={`w-full h-full flex gap-2 ${
                        width.id === "boxed"
                          ? "border-l border-r border-[#e2e5ed]"
                          : ""
                      }`}
                    >
                      <div
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
                      </div>
                      <div
                        className={`w-full h-full flex flex-col justify-between`}
                      >
                        {["w-inner-box-1", "w-inner-box-2"].map((innerBox) => (
                          <span
                            key={innerBox}
                            className={`w-full h-[8px] bg-[#f3f6f9]`}
                          ></span>
                        ))}
                      </div>
                    </div>
                    {layoutWidthType === width.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </div>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {width.label}
                  </span>
                </li>
              ))}
            </ul>
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

          {/* Topbar Color */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Topbar Color
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Topbar Color.
            </p>
            <ul className="flex items-center flex-wrap gap-3 mt-5">
              {rightSidbarTopbarColorData.map((topbarColor) => (
                <li
                  key={topbarColor.id}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                  onClick={() =>
                    dispatch(changeTopbarColorType(topbarColor.id))
                  }
                >
                  <div
                    className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                      topbarColorType === topbarColor.id
                        ? "border border-[#405189]"
                        : ""
                    }`}
                  >
                    <div className={`w-full h-full flex gap-2`}>
                      <div
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
                      </div>
                      <div
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
                      </div>
                    </div>
                    {topbarColorType === topbarColor.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute top-[7px] right-[7px]"
                      />
                    )}
                  </div>
                  <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                    {topbarColor.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Size */}
          <div className="mt-5">
            <h3 className="text-[#665057] font-poppins-rg uppercase text-[13px] font-[600]">
              Sidebar Size
            </h3>
            <p className="text-soft text-[13px]">Choose a size of Sidebar.</p>
            <ul className="flex items-center flex-wrap gap-2 mt-5">
              {/* Default Size */}
              <li
                className="flex flex-col items-center gap-1 group cursor-pointer"
                onClick={() => dispatch(changeLeftSidbarSizeType("default"))}
              >
                <div
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "default"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-2">
                    <div className="w-[25px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>
                  {leftSidbarSizeType === "default" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Default
                </span>
              </li>

              {/* Compact Size */}
              <li
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() => dispatch(changeLeftSidbarSizeType("compact"))}
              >
                <div
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "compact" ? "border-[#405189]" : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-2">
                    <div className="w-[17px] h-[100%] bg-[#f3f6f9] p-[4px] flex flex-col">
                      <span className="h-[8px] w-full rounded-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>
                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>

                  {leftSidbarSizeType === "compact" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-wide mx-auto">
                  Compact
                </span>
              </li>

              {/* Small (Icon View) Size */}
              <li
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() =>
                  dispatch(changeLeftSidbarSizeType("small-icon-view"))
                }
              >
                <div
                  className={`relative w-[110px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "small-icon-view"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-1">
                    <div className="w-[10px] h-[100%] bg-[#f3f6f9] flex flex-col">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>

                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>

                  {leftSidbarSizeType === "small-icon-view" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-tighter mx-auto text-center">
                  Small (Icon View)
                </span>
              </li>

              {/* Small Hover View Size */}
              <li
                className="flex flex-col items-center gap-1 cursor-pointer group"
                onClick={() =>
                  dispatch(changeLeftSidbarSizeType("small-hover-view"))
                }
              >
                <div
                  className={`relative w-[110px] h-[70px] rounded-[5px] group-hover:shadow-light overflow-hidden border ${
                    leftSidbarSizeType === "small-hover-view"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <div className="w-full h-full flex gap-1">
                    <div className="w-[10px] h-[100%] bg-[#f3f6f9] flex flex-col">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex flex-col justify-center gap-1 h-full">
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                        <span className="w-full h-[4px] bg-[#e2e5ed]"></span>
                      </span>
                    </div>

                    <div className="w-full h-full flex flex-col justify-between">
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                      <span className="w-full h-[8px] bg-[#f3f6f9]"></span>
                    </div>
                  </div>

                  {leftSidbarSizeType === "small-hover-view" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute top-[7px] right-[7px]"
                    />
                  )}
                </div>
                <span className="text-[#665057] font-poppins-md text-[13px] font-[500] tracking-tighter mx-auto text-center">
                  Small Hover View
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RightSidebar;
