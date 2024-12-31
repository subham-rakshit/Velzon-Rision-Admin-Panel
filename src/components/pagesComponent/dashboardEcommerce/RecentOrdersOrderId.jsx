"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";

const RecentOrdersOrderId = ({ value }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { textColor } = customColor;

  return <span className={`${textColor}`}>{value}</span>;
};

export default RecentOrdersOrderId;
