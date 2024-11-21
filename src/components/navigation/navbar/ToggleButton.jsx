"use client";

import React, { useState } from "react";

import { changeLeftSideBarSizeType } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const ToggleButton = () => {
  const [isToggle, setIsToggle] = useState(false);
  const { leftSidbarSizeType, topbarColorType } = useAppSelector(
    (state) => state.layout
  );
  const dispatch = useAppDispatch();

  const handleSidebarToggel = () => {
    const newSizeType =
      leftSidbarSizeType === "default" ? "small-icon-view" : "default";

    dispatch(changeLeftSideBarSizeType(newSizeType));
    setIsToggle((prev) => !prev);
  };

  return (
    <>
      {/* After Medium screen btn */}
      <button
        onClick={handleSidebarToggel}
        type="button"
        className="hidden md:inline-block h-full cursor-pointer"
      >
        {["bar_1", "bar_2", "bar_3"].map((bar) => {
          let dynamicClasses;

          if (isToggle) {
            switch (bar) {
              case "bar_1":
                dynamicClasses =
                  "w-[12px] rotate-[40deg] translate-y-[3px] translate-x-[13px]";
                break;
              case "bar_3":
                dynamicClasses =
                  "w-[12px] -rotate-[40deg] -translate-y-[3px] translate-x-[13px]";
                break;
              default:
                dynamicClasses = "w-[22px] rotate-[180deg]";
                break;
            }
          } else {
            switch (bar) {
              case "bar_1":
                dynamicClasses = "w-[16px]";
                break;
              case "bar_3":
                dynamicClasses = "w-[12px]";
                break;
              default:
                dynamicClasses = "w-[20px]";
                break;
            }
          }

          return (
            <span
              key={bar}
              className={`block background-light200_dark350 h-[2px] my-[4px] rounded-sm transition-all duration-500 ease-in-out ${dynamicClasses}`}
            ></span>
          );
        })}
      </button>

      {/* Upto Medium screen btn */}
      <button type="button" className="md:hidden inline-block cursor-pointer">
        {["bar_1", "bar_2", "bar_3"].map((bar) => {
          let dynamicClasses;

          switch (bar) {
            case "bar_1":
              dynamicClasses =
                "w-[12px] rotate-[40deg] translate-y-[3px] translate-x-[13px]";
              break;
            case "bar_3":
              dynamicClasses =
                "w-[12px] -rotate-[40deg] -translate-y-[3px] translate-x-[13px]";
              break;
            default:
              dynamicClasses = "w-[22px] rotate-[180deg]";
              break;
          }

          return (
            <span
              key={bar}
              className={`block background-light200_dark350 h-[2px] my-[4px] rounded-sm transition-all duration-500 ease-in-out ${dynamicClasses}`}
            ></span>
          );
        })}
      </button>
    </>
  );
};

export default ToggleButton;
