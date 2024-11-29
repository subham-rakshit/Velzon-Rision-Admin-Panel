"use client";

import React from "react";

import {
  layout,
  sidebarMainSize,
  sidebarSize,
  toggleStatus,
} from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import {
  changeToggleButtonStatus,
  changeToggleSmallButtonStatus,
} from "@/lib/store/features/layoutCustomizer/layoutCustomizerSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const ToggleButton = ({
  layoutType,
  leftSidbarSizeType,
  toggleButtonStatus,
  leftSidbarSizeMain,
  toggleSmallButtonStatus,
}) => {
  const dispatch = useAppDispatch();

  const handleSidebarToggel = () => {
    const status = toggleButtonStatus === toggleStatus.CLOSE;
    const statusSmDevice = toggleSmallButtonStatus === toggleStatus.CLOSE;

    if (window.innerWidth < 768 && layoutType !== layout.HORIZONTAL) {
      dispatch(changeToggleSmallButtonStatus(statusSmDevice));
    } else {
      dispatch(changeToggleButtonStatus(status));
    }
  };

  return (
    <button
      onClick={handleSidebarToggel}
      type="button"
      className={`h-full cursor-pointer ${leftSidbarSizeMain === sidebarMainSize.SM_HOVER || layoutType === layout.HORIZONTAL ? "lg:hidden" : ""}`}
    >
      {["bar_1", "bar_2", "bar_3"].map((bar) => {
        let dynamicClasses;

        if (
          leftSidbarSizeType === sidebarSize.SMALL_ICON_VIEW ||
          (layoutType === layout.HORIZONTAL && !toggleButtonStatus) ||
          (layoutType === layout.TWO_COLUMN && toggleButtonStatus) ||
          window.innerWidth < 768
        ) {
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
            className={`${globalStyleObj.backgroundLight200Dark350} transition-300 my-[4px] block h-[2px] rounded-sm ${dynamicClasses}`}
          ></span>
        );
      })}
    </button>
  );
};

export default ToggleButton;
