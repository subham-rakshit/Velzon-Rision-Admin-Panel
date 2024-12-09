"use client";

import React from "react";

import { useAppSelector } from "@/lib/store/hooks";
import { getCustomColor } from "@/lib/utils/customColor";

const CustomExportButton = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor } = customColor;

  return (
    <button
      type="button"
      className={`${textColor} ${bgColor} ${hoverBgColor} rounded-[3px] px-[8px] py-[5px] font-poppins-rg text-[11px] transition-colors duration-300 hover:text-white`}
    >
      Export Report
    </button>
  );
};

export default CustomExportButton;
