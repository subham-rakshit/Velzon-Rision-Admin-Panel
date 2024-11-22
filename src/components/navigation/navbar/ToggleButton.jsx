"use client";

import React, { useState } from "react";

import { changeLeftSideBarSizeType } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const ToggleButton = () => {
  const [isToggle, setIsToggle] = useState(false);
  const { leftSidbarSizeType } = useAppSelector((state) => state.layout);
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
        className="hidden h-full cursor-pointer md:inline-block"
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
              className={`background-light200_dark350 transition-300 my-[4px] block h-[2px] rounded-sm ${dynamicClasses}`}
            ></span>
          );
        })}
      </button>

      {/* Upto Medium screen btn */}
      <button type="button" className="inline-block cursor-pointer md:hidden">
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
              className={`background-light200_dark350 transition-300 my-[4px] block h-[2px] rounded-sm ${dynamicClasses}`}
            ></span>
          );
        })}
      </button>
    </>
  );
};

export default ToggleButton;
