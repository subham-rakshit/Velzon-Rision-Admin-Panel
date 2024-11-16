"use client";

import React, { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { FaCog } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  changeLayoutType,
  changeRightSideBarIsOpen,
} from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";

import { FaCheckCircle } from "react-icons/fa";

const RightSidebar = () => {
  const { layoutType, rightSideBarIsOpen } = useAppSelector(
    (state) => state.layout
  );

  const dispatch = useAppDispatch();
  const time = useTime();
  const rotate = useTransform(time, [0, 2000], [0, 360], {
    clamp: rightSideBarIsOpen,
  });

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
        className={`fixed right-0 top-0 w-[400px] h-[100vh] bg-white z-[99]`}
      >
        {/* Header */}
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

        {/* Inner */}
        <div className="p-[25px] h-[calc(100vh-60px)] overflow-y-auto custom-left-sidebar-scrollbar">
          {/* Layouts */}
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
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light border ${
                    layoutType === "horizontal" ? "border border-[#405189]" : ""
                  }`}
                >
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
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light border ${
                    layoutType === "two-column" ? "border border-[#405189]" : ""
                  }`}
                >
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
                  className={`relative w-[100px] h-[70px] rounded-[5px] group-hover:shadow-light border ${
                    layoutType === "semi-box" ? "border border-[#405189]" : ""
                  }`}
                >
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
        </div>
      </motion.div>
    </>
  );
};

export default RightSidebar;
