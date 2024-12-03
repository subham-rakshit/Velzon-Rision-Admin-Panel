import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.projects.title,
};

const DashboardProjects = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>
      DashboardProjects
    </div>
  );
};

export default DashboardProjects;
