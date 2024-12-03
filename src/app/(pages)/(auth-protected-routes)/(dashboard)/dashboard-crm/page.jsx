import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.crm.title,
};
const DashboardCrm = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardCrm</div>
  );
};

export default DashboardCrm;
