"use client";

import React, { useState } from "react";

import {
  layout,
  sidebarSize,
  toggleStatus,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { changeToggleButtonStatus } from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const ToggleButton = ({
  layoutType,
  leftSidbarSizeType,
  toggleButtonStatus,
}) => {
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useAppDispatch();

  const handleSidebarToggel = () => {
    const status = toggleButtonStatus === toggleStatus.CLOSE;

    dispatch(changeToggleButtonStatus(status));
    setIsToggle((prev) => !prev);
  };

  const handleHorizontalSidebarToggel = () => {
    setIsToggle(!isToggle);
  };

  const defaultToggleButton = () => (
    <>
      {/* After Medium screen btn */}
      <button
        onClick={handleSidebarToggel}
        type="button"
        className={`h-full cursor-pointer`}
      >
        {["bar_1", "bar_2", "bar_3"].map((bar) => {
          let dynamicClasses;

          if (leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW) {
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
    </>
  );

  const horrizontalToggleButton = () => (
    <>
      {/* After Medium screen btn */}
      <button
        onClick={handleHorizontalSidebarToggel}
        type="button"
        className={`hidden h-full cursor-pointer md:inline-block lg:hidden`}
      >
        {["bar_1", "bar_2", "bar_3"].map((bar) => {
          let dynamicClasses;

          if (!isToggle) {
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

  switch (layoutType) {
    case layout.HORIZONTAL:
      return horrizontalToggleButton();
    default:
      return defaultToggleButton();
  }
};

export default ToggleButton;
