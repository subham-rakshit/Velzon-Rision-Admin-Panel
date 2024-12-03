import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.job.title,
};

const DashboardJob = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardJob</div>
  );
};

export default DashboardJob;
