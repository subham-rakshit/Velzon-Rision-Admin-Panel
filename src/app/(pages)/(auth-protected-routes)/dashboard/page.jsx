import { titlesObject } from "@/app/assets/titlesData/titles";
import React from "react";

export const metadata = {
  title: titlesObject.dashboard.title,
  description: titlesObject.dashboard.description,
};

const DashboardEcommerce = () => {
  return <div className="bg-pink-500 min-h-[100vh]">DashboardEcommerce</div>;
};

export default DashboardEcommerce;
