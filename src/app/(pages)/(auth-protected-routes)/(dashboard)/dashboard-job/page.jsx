import { titlesObject } from "@/app/assets/titlesData/titles";
import React from "react";

export const metadata = {
  title: titlesObject.job.title,
  description: titlesObject.job.description,
};

const DashboardJob = () => {
  return <div>DashboardJob</div>;
};

export default DashboardJob;
