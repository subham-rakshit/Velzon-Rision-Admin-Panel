import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.dashboard.title,
};

const DashboardEcommerce = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>
      DashboardEcommerce
    </div>
  );
};

export default DashboardEcommerce;
