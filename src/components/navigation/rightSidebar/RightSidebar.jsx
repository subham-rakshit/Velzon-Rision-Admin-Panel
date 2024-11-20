"use client";

import { motion, useTime, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";
import { FaCog, FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
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
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

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
      <div className="fixed left-full flex min-h-screen w-[120px] -translate-x-full items-end justify-center pb-8">
        <motion.button
          style={{ rotate }}
          onClick={() => dispatch(changeRightSideBarIsOpen(true))}
          className="flex size-[50px] items-center justify-center rounded-full bg-[#299CDB]"
        >
          <FaCog size={22} color="white" />
        </motion.button>
      </div>

      {/* NOTE Main Right Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={rightSideBarIsOpen ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed right-0 top-0 z-[99] h-screen w-[380px] bg-white`}
      >
        {/* NOTE Header */}
        <div className="flex h-[60px] w-full items-center justify-between bg-[#505f93] px-[16px]">
          <h1 className="font-poppins-md text-[16px] text-white">
            Theme Customizer
          </h1>
          <button
            type="button"
            onClick={() => dispatch(changeRightSideBarIsOpen(false))}
            className="transition-style hover:scale-[1.3]"
          >
            <MdClose size={22} color="#9da6c2" />
          </button>
        </div>

        {/* NOTE Inner */}
        <div className="custom-left-sidebar-scrollbar h-[calc(100vh-60px)] overflow-y-auto p-[25px] shadow-light">
          {/* NOTE Layouts */}
          <div>
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Layout
            </h3>
            <p className="text-soft text-[13px]">Choose your layout</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {/* Vertical Layout */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLayoutType("vertical"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    layoutType === "vertical" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full gap-2">
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {layoutType === "vertical" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Vertical
                </span>
              </button>

              {/* Horizontal Layout */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLayoutType("horizontal"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    layoutType === "horizontal" ? "border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full flex-col justify-between gap-2">
                    <span className="flex w-full flex-col">
                      <span className="flex h-[17px] w-full items-center justify-between bg-[#f3f6f9] px-[5px]">
                        <span className="size-[8px] rounded-full bg-[#e2e5ed]"></span>
                        <span className="flex items-center gap-2">
                          <span className="h-[4px] w-[16px] bg-[#e2e5ed]"></span>
                          <span className="h-[4px] w-[16px] bg-[#e2e5ed]"></span>
                        </span>
                      </span>
                      <span className="mt-[4px] h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                    <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                  </span>

                  {layoutType === "horizontal" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Horizontal
                </span>
              </button>

              {/* Two Column Layout */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLayoutType("two-column"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    layoutType === "two-column" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full gap-1">
                    <span className="flex h-full w-[10px] flex-col bg-[#f3f6f9]">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className="flex h-full w-[25px] flex-col gap-1 bg-[#f3f6f9] p-[4px]">
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {layoutType === "two-column" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Two Column
                </span>
              </button>

              {/* Semi Box Layout */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLayoutType("semi-box"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    layoutType === "semi-box" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full gap-2 p-1">
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {layoutType === "semi-box" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Semi Box
                </span>
              </button>
            </div>
          </div>

          {/* NOTE User Profile Avatar Button */}
          <div className="my-5 flex items-center gap-2">
            <button
              type="button"
              className={`flex w-[40px] cursor-pointer rounded-full border border-[#bdbfc7] px-[3px] py-[2px] ${
                sidebarUserProfileAvtarType === "hide"
                  ? "justify-end border-[#4f5e92] bg-[#4f5e92]"
                  : "justify-start border-[#bdbfc7] bg-transparent"
              }`}
              onClick={toggleAvatarSwitch}
            >
              <motion.span
                className={`size-[14px] rounded-full ${
                  sidebarUserProfileAvtarType === "hide"
                    ? "bg-white"
                    : "bg-[#bdbfc7]"
                }`}
                layout
                transition={{ type: "spring", stiffness: 800, damping: 30 }}
              />
            </button>

            <span className="font-poppins-md text-[13px] tracking-wide text-[#000]">
              Sidebar User Profile Avatar
            </span>
          </div>

          {/* NOTE Theme */}
          <div>
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Theme
            </h3>
            <p className="text-soft text-[13px]">Choose your suitable Theme.</p>

            <div className="mt-5 flex flex-wrap gap-3">
              {rightSidebarThemeData.map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutThemeType(theme.id))}
                >
                  <span
                    className={`relative overflow-hidden rounded-[5px] border group-hover:shadow-light ${
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
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </span>
                  <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    {theme.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Color Schema */}
          <div className="mt-5">
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Color Schema
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Schema.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {rightSidbarColorSchemaData.map((color) => (
                <button
                  type="button"
                  key={color.id}
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutModeType(color.id))}
                >
                  <span
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] group-hover:shadow-light ${
                      layoutModeType === color.id
                        ? "border border-[#405189]"
                        : "border"
                    } ${color.id === "dark" ? "bg-[#212529]" : ""}`}
                  >
                    <span className="flex size-full gap-2">
                      <span
                        className={`flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px] ${
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
                        <span className="flex h-full flex-col justify-center gap-1">
                          {["box-1", "box-2", "box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full ${
                                color.id === "dark"
                                  ? "bg-[#4c4f53]"
                                  : "bg-[#e2e5ed]"
                              }`}
                            ></span>
                          ))}
                        </span>
                      </span>
                      <span
                        className={`flex size-full flex-col justify-between`}
                      >
                        {["inner-box-1", "inner-box-2"].map((innerBox) => (
                          <span
                            key={innerBox}
                            className={`h-[8px] w-full bg-[#f3f6f9] ${
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
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </span>
                  <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Layout Width */}
          <div className="mt-5">
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Layout Width
            </h3>
            <p className="text-soft text-[13px]">
              Choose Fluid or Boxed layout.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {rightSidbarLayoutWidthData.map((width) => (
                <button
                  type="button"
                  key={width.id}
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() => dispatch(changeLayoutWidthType(width.id))}
                >
                  <span
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      layoutWidthType === width.id
                        ? "border border-[#405189]"
                        : ""
                    } ${width.id === "boxed" ? "px-2" : "px-0"}`}
                  >
                    <span
                      className={`flex size-full gap-2 ${
                        width.id === "boxed" ? "border-x border-[#e2e5ed]" : ""
                      }`}
                    >
                      <span
                        className={`flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg bg-[#e2e5ed]`}
                        ></span>
                        <span className="flex h-full flex-col justify-center gap-1">
                          {["w-box-1", "w-box-2", "w-box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full bg-[#e2e5ed]`}
                            ></span>
                          ))}
                        </span>
                      </span>
                      <span
                        className={`flex size-full flex-col justify-between`}
                      >
                        {["w-inner-box-1", "w-inner-box-2"].map((innerBox) => (
                          <span
                            key={innerBox}
                            className={`h-[8px] w-full bg-[#f3f6f9]`}
                          ></span>
                        ))}
                      </span>
                    </span>
                    {layoutWidthType === width.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </span>
                  <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    {width.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Layout Position */}
          <div className="mt-5">
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Layout Position
            </h3>
            <p className="text-soft text-[13px]">
              Choose Fixed or Scrollable Layout Position.
            </p>

            <div className="mt-5 overflow-hidden rounded-[3px]">
              {rightSidbarLayoutPositionData.map((position) => (
                <button
                  key={position.id}
                  className={`w-[95px] cursor-pointer py-[6px] font-poppins-rg text-[13px] transition-all duration-500 ease-in-out ${
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
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Topbar Color
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Topbar Color.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {rightSidbarTopbarColorData.map((topbarColor) => (
                <button
                  type="button"
                  key={topbarColor.id}
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() =>
                    dispatch(changeTopbarColorType(topbarColor.id))
                  }
                >
                  <span
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      topbarColorType === topbarColor.id
                        ? "border border-[#405189]"
                        : ""
                    }`}
                  >
                    <span className={`flex size-full gap-2`}>
                      <span
                        className={`flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg bg-[#e2e5ed]`}
                        ></span>
                        <span className="flex h-full flex-col justify-center gap-1">
                          {["c-box-1", "c-box-2", "c-box-3"].map((box) => (
                            <span
                              key={box}
                              className={`h-[4px] w-full bg-[#e2e5ed]`}
                            ></span>
                          ))}
                        </span>
                      </span>
                      <span
                        className={`flex size-full flex-col justify-between`}
                      >
                        {["c-inner-box-1", "c-inner-box-2"].map(
                          (innerBox, index) => (
                            <span
                              key={innerBox}
                              className={`h-[8px] w-full ${
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
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </span>
                  <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    {topbarColor.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* NOTE Sidebar Size */}
          <div className="mt-5">
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Sidebar Size
            </h3>
            <p className="text-soft text-[13px]">Choose a size of Sidebar.</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {/* Default Size */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLeftSidbarSizeType("default"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    leftSidbarSizeType === "default"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="flex size-full gap-2">
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {leftSidbarSizeType === "default" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Default
                </span>
              </button>

              {/* Compact Size */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLeftSidbarSizeType("compact"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    leftSidbarSizeType === "compact" ? "border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full gap-2">
                    <span className="flex h-full w-[17px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-full bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {leftSidbarSizeType === "compact" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Compact
                </span>
              </button>

              {/* Small (Icon View) Size */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() =>
                  dispatch(changeLeftSidbarSizeType("small-icon-view"))
                }
              >
                <span
                  className={`relative h-[70px] w-[110px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    leftSidbarSizeType === "small-icon-view"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="flex size-full gap-1">
                    <span className="flex h-full w-[10px] flex-col bg-[#f3f6f9]">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {leftSidbarSizeType === "small-icon-view" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto text-center font-poppins-md text-[13px] tracking-tighter text-[#665057]">
                  Small (Icon View)
                </span>
              </button>

              {/* Small Hover View Size */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() =>
                  dispatch(changeLeftSidbarSizeType("small-hover-view"))
                }
              >
                <span
                  className={`relative h-[70px] w-[110px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    leftSidbarSizeType === "small-hover-view"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="flex size-full gap-1">
                    <span className="flex h-full w-[10px] flex-col bg-[#f3f6f9]">
                      <span className="h-[8px] w-full bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>

                  {leftSidbarSizeType === "small-hover-view" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto text-center font-poppins-md text-[13px] tracking-tighter text-[#665057]">
                  Small Hover View
                </span>
              </button>
            </div>
          </div>

          {/* NOTE Sidebar View */}
          <div className="mt-5">
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Sidebar Size
            </h3>
            <p className="text-soft text-[13px]">Choose a size of Sidebar.</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {/* Default View */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLeftSidebarViewType("default"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    leftSidebarViewType === "default"
                      ? "border border-[#405189]"
                      : ""
                  }`}
                >
                  <span className="flex size-full gap-2">
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {leftSidebarViewType === "default" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Default
                </span>
              </button>

              {/* Detached View */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changeLeftSidebarViewType("detached"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    leftSidebarViewType === "detached" ? "border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full flex-col justify-between gap-1">
                    <span className="flex h-[17px] w-full items-center justify-between bg-[#f3f6f9] px-[5px]">
                      <span className="size-[8px] rounded-full bg-[#e2e5ed]"></span>
                      <span className="flex items-center gap-2">
                        <span className="h-[4px] w-[16px] bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-[16px] bg-[#e2e5ed]"></span>
                      </span>
                    </span>

                    <span className=" ml-1 mt-[4px] flex h-full w-[24px] flex-col items-center gap-1 rounded-[4px] bg-[#f3f6f9] p-1">
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                    </span>

                    <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                  </span>

                  {leftSidebarViewType === "detached" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Detached
                </span>
              </button>
            </div>
          </div>

          {/* NOTE Sidebar Color */}
          <div className="mt-5">
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Sidebar Color
            </h3>
            <p className="text-soft text-[13px]">
              Choose Light or Dark Sidebar Color.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {rightSidbarColorData.map((eachColor, index) => (
                <button
                  type="button"
                  key={eachColor.id}
                  className="group flex cursor-pointer flex-col items-center gap-1"
                  onClick={() =>
                    dispatch(changeLeftSidebarColorType(eachColor.id))
                  }
                >
                  <span
                    className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                      leftSidebarColorType === eachColor.id
                        ? "border border-[#405189]"
                        : ""
                    }`}
                  >
                    <span className="flex size-full gap-2">
                      <span
                        className={`flex h-full w-[25px] flex-col p-[4px] ${
                          eachColor.leftColor
                        } ${index === 0 ? "border-r" : ""}`}
                      >
                        <span
                          className={`h-[8px] w-full rounded-lg ${eachColor.leftInnerColor}`}
                        ></span>
                        <span className="flex h-full flex-col justify-center gap-1">
                          <span
                            className={`h-[4px] w-full ${eachColor.leftInnerColor}`}
                          ></span>
                          <span
                            className={`h-[4px] w-full ${eachColor.leftInnerColor}`}
                          ></span>
                          <span
                            className={`h-[4px] w-full ${eachColor.leftInnerColor}`}
                          ></span>
                        </span>
                      </span>
                      <span className="flex size-full flex-col justify-between">
                        <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                        <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      </span>
                    </span>
                    {leftSidebarColorType === eachColor.id && (
                      <FaCheckCircle
                        color="#405189"
                        size={13}
                        className="absolute right-[7px] top-[7px]"
                      />
                    )}
                  </span>
                  <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                    {eachColor.label}
                  </span>
                </button>
              ))}
            </div>

            {leftSidebarColorType === "gradient-bg-color" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 rounded-[4px] bg-[#f3f6f9] px-[16px] py-[8px]">
                {rightSidbarColorData[2].childrenElem.map((eachChild) => (
                  <button
                    key={eachChild.id}
                    type="button"
                    className={`flex size-[30px] items-center justify-center rounded-full ${eachChild.leftColor}`}
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
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Sidebar Images
            </h3>
            <p className="text-soft text-[13px]">Choose a image of Sidebar.</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {rightSidebarImagesData.map((imgBtn, index) => (
                <button
                  type="button"
                  key={imgBtn.id}
                  className={`transition-style relative flex h-[72px] w-[45px] items-center justify-center overflow-hidden rounded-[4px] bg-cover bg-center ${
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
                        className="z-[99] rounded-full border border-[#405189]"
                      />
                      <span className="absolute inset-0 size-full bg-[#405582]/50"></span>
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
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Primary Color
            </h3>
            <p className="text-soft text-[13px]">Choose a color of Primary.</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {rightSidebarPrimaryColorData.map((pColor) => (
                <button
                  key={pColor.id}
                  type="button"
                  className={`transition-style size-[30px] rounded-[4px] ${
                    pColor.bgColor
                  } ${
                    layoutThemePrimaryColorType === pColor.id
                      ? "scale-110"
                      : "scale-100"
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
            <h3 className="font-poppins-rg text-[13px] uppercase text-[#665057]">
              Preloader
            </h3>
            <p className="text-soft text-[13px]">Choose a preloader.</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Top Loader */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changePreloader("top-loader"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    preloader === "top-loader" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="relative flex size-full gap-2">
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: [0, "100%"] }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="absolute left-0 top-0 h-[3px] bg-[#405189]"
                    ></motion.span>
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {preloader === "top-loader" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Top Loader
                </span>
              </button>

              {/* Spinner */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changePreloader("spinner"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    preloader === "spinner" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="relative flex size-full gap-2">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <ClipLoader
                        size={25}
                        color="#405189"
                        speedMultiplier={0.8}
                        cssOverride={{ borderWidth: "3px" }}
                      />
                    </span>
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {preloader === "spinner" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
                  Spinner
                </span>
              </button>

              {/* Disable */}
              <button
                type="button"
                className="group flex cursor-pointer flex-col items-center gap-1"
                onClick={() => dispatch(changePreloader("disable"))}
              >
                <span
                  className={`relative h-[70px] w-[100px] overflow-hidden rounded-[5px] border group-hover:shadow-light ${
                    preloader === "disable" ? "border border-[#405189]" : ""
                  }`}
                >
                  <span className="flex size-full gap-2">
                    <span className="flex h-full w-[25px] flex-col bg-[#f3f6f9] p-[4px]">
                      <span className="h-[8px] w-full rounded-lg bg-[#e2e5ed]"></span>
                      <span className="flex h-full flex-col justify-center gap-1">
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                        <span className="h-[4px] w-full bg-[#e2e5ed]"></span>
                      </span>
                    </span>
                    <span className="flex size-full flex-col justify-between">
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                      <span className="h-[8px] w-full bg-[#f3f6f9]"></span>
                    </span>
                  </span>
                  {preloader === "disable" && (
                    <FaCheckCircle
                      color="#405189"
                      size={13}
                      className="absolute right-[7px] top-[7px]"
                    />
                  )}
                </span>
                <span className="mx-auto font-poppins-md text-[13px] tracking-wide text-[#665057]">
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
