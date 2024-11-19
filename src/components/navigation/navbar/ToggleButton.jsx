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
    <button
      onClick={handleSidebarToggel}
      type="button"
      className="inline-block cursor-pointer h-full px-2"
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
            className={`block h-[2px] ${
              topbarColorType === "dark-color" ? "bg-[#B0C4D9]" : "bg-[#878A99]"
            } my-[4px] transition-all duration-500 ease-in-out rounded-sm ${dynamicClasses}`}
          ></span>
        );
      })}
    </button>
  );
};

export default ToggleButton;
