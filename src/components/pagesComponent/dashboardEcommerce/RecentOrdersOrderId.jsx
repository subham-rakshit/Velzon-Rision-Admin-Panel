"use client";

import React from "react";

import { useAppSelector } from "@/lib/store/hooks";
import { getCustomColor } from "@/lib/utils/customColor";

const RecentOrdersOrderId = ({ value }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { textColor } = customColor;

  return <span className={`${textColor}`}>{value}</span>;
};

export default RecentOrdersOrderId;
