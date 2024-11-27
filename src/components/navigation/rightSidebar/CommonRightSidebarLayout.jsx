import React from "react";

import { globalStyleObj } from "@/app/assets/styles";

const CommonRightSidebarLayout = ({ extraClass }) => {
  return (
    <>
      <div
        className={`flex h-full w-[25px] flex-col p-[4px] ${globalStyleObj.layoutBoxBackgroundLightDark}`}
      >
        <span
          className={`h-[8px] w-full rounded-lg ${globalStyleObj.layoutInnerBoxBackgroundLightDark}`}
        ></span>
        <div className="flex h-full flex-col justify-center gap-1">
          <span
            className={`h-[4px] w-full ${globalStyleObj.layoutInnerBoxBackgroundLightDark}`}
          ></span>
          <span
            className={`h-[4px] w-full ${globalStyleObj.layoutInnerBoxBackgroundLightDark}`}
          ></span>
          <span
            className={`h-[4px] w-full ${globalStyleObj.layoutInnerBoxBackgroundLightDark}`}
          ></span>
        </div>
      </div>

      <div className="flex size-full flex-col justify-between">
        <span
          className={`h-[8px] w-full ${extraClass || `${globalStyleObj.layoutBoxBackgroundLightDark}`}`}
        ></span>
        <span
          className={`h-[8px] w-full ${globalStyleObj.layoutBoxBackgroundLightDark}`}
        ></span>
      </div>
    </>
  );
};

export default CommonRightSidebarLayout;
