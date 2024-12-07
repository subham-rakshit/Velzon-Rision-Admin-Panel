"use client";

import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/lib/store/hooks";
import { getCustomColor } from "@/lib/utils/customColor";

const CustomExportButton = () => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const [colors, setColors] = useState({});

  useEffect(() => {
    const customColor = getCustomColor({ layoutThemePrimaryColorType });
    setColors(customColor);
  }, [layoutThemePrimaryColorType]);

  return (
    <button
      type="button"
      className={`${colors.textColor} ${colors.bgColor} ${colors.hoverBgColor} transition-300 rounded-[3px] px-[8px] py-[5px] font-poppins-rg text-[11px] hover:text-white`}
    >
      Export Report
    </button>
  );
};

export default CustomExportButton;
