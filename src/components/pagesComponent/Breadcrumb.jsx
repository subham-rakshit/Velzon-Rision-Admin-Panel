import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import { globalStyleObj } from "@/app/assets/styles";

const Breadcrumb = ({ title, pageTilte }) => {
  return (
    <div
      className={`${globalStyleObj.flexBetween} ${globalStyleObj.backgroundLight900Dark300} absolute left-0 top-0 w-full px-5 py-3 shadow-light`}
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
