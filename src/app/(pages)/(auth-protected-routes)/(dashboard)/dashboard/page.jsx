import React from "react";

import { ecomWidgets } from "@/app/assets/pagesData/dashboardData/ecommerce";
import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";
import {
  AddPrdocutsAndSheet,
  DateRangePicker,
  EcommerceWidgets,
} from "@/components";

export const metadata = {
  title: titlesObject.dashboard.title,
};

const DashboardEcommerce = () => {
  return (
    <div className={`min-h-full`}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h4 className="font-poppins-md text-[16px] text-dark-weight-550 dark:text-light-weight-550">
            Good Morning, Anna!
          </h4>
          <p className="font-poppins-rg text-[13px] tracking-wide text-light-weight-400">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <DateRangePicker />
          <div className="flex items-center gap-3">
            <AddPrdocutsAndSheet />
          </div>
        </div>
      </div>

      <div className="mt-5 flex w-full flex-col gap-5 md:flex-row md:flex-wrap md:justify-between xl:flex-nowrap">
        {(ecomWidgets || []).map((widget) => (
          <div
            key={widget.label}
            className={`${globalStyleObj.backgroundLight900Dark300} transition-300 w-full rounded-sm p-3 shadow-light hover:translate-y-[-4px] hover:shadow-lg md:w-[48%] xl:w-1/4`}
          >
            <EcommerceWidgets widget={widget} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEcommerce;
