"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

const UploadFiles = () => {
  // Custom Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, hexCode } = customColor;

  return (
    <Link href="/admin/file/create">
      <button
        className={`${bgColor} ${textColor} ${hoverBgColor} hover:text-light-weight-800 text-[13px] font-poppins-rg transition-all duration-300 ease-in-out px-5 py-2 rounded-md`}
      >
        Upload Files
      </button>
    </Link>
  );
};

export default UploadFiles;
