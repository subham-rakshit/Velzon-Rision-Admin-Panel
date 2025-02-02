"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";

const ProgressBar = ({ value }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { active, bgColor } = customColor;

  return (
    <div className={`h-[8px] w-full overflow-hidden rounded-[3px] ${bgColor}`}>
      <div
        style={{
          width: `${value}%`,
        }}
        className={`flex h-full justify-between px-3 ${active}`}
      ></div>
    </div>
  );
};

export default ProgressBar;
