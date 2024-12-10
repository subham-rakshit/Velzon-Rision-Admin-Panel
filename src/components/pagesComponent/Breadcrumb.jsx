"use client";

import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { sidebarView } from "@/app/assets/layoutCustomizerData/layoutCustomizerData";
import { globalStyleObj } from "@/app/assets/styles";
import { useAppSelector } from "@/lib/store/hooks";

const Breadcrumb = ({ title, pageTilte }) => {
  const { leftSidebarViewType } = useAppSelector((state) => state.layout);

  return (
    <div
      className={`${globalStyleObj.flexBetween} ${leftSidebarViewType === sidebarView.DETACHED ? "bg-transparent" : `${globalStyleObj.backgroundLight900Dark300} shadow-light`} absolute left-0 top-0 w-full px-5 py-3`}
    >
      <h4 className={`${globalStyleObj.text16BoldLight550Dark550} uppercase`}>
        {title}
      </h4>
      <div className={`${globalStyleObj.flexCenter} gap-2`}>
        <h5 className={`${globalStyleObj.text13Light600Dark450}`}>
          {pageTilte}
        </h5>
        <IoIosArrowForward size={13} className="text-light-weight-400" />
        <h5 className={`${globalStyleObj.text13Light400}`}>{title}</h5>
      </div>
    </div>
  );
};

export default Breadcrumb;
