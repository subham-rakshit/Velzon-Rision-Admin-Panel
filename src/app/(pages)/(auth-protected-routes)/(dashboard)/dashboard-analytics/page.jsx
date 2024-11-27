import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.analytics.title,
};

const DashboardAnalytics = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>
      DashboardAnalytics
    </div>
  );
};

export default DashboardAnalytics;
