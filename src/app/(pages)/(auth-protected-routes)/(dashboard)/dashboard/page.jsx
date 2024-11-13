import { titlesObject } from "@/app/assets/titlesData/titles";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

export const metadata = {
  title: titlesObject.dashboard.title,
  description: titlesObject.dashboard.description,
};

const DashboardEcommerce = () => {
  return <div className="bg-pink-500 min-h-[500vh]">DashboardEcommerce</div>;
};

export default DashboardEcommerce;
