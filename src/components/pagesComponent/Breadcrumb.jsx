"use client";

import { IoIosArrowForward } from "react-icons/io";

import { sidebarView } from "@/app/assets/data/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/store/hooks";

const Breadcrumb = ({ title, pageTilte }) => {
  const { leftSidebarViewType } = useAppSelector((state) => state.layout);

  return (
    <div
      className={`${globalStyleObj.flexBetween} ${leftSidebarViewType === sidebarView.DETACHED ? "bg-transparent" : `${globalStyleObj.backgroundLight900Dark300} shadow-light`} absolute left-0 top-0 w-full px-5 py-3`}
    >
      <h4
        className={`font-poppins-sb text-[13px] sm:text-[16px] uppercase text-dark-weight-550 dark:text-light-weight-550 tracking-tight sm:tracking-normal`}
      >
        {title}
      </h4>
      <div className={`${globalStyleObj.flexCenter} gap-1 sm:gap-2`}>
        <h5
          className={`text-[11px] sm:text-[13px] font-poppins-rg text-dark-weight-600 dark:text-light-weight-400 tracking-tight sm:tracking-normal`}
        >
          {pageTilte}
        </h5>
        <IoIosArrowForward size={13} className="text-light-weight-400" />
        <h5
          className={`text-[11px] sm:text-[13px] font-poppins-rg text-light-weight-400 tracking-tight sm:tracking-normal`}
        >
          {title}
        </h5>
      </div>
    </div>
  );
};

export default Breadcrumb;
