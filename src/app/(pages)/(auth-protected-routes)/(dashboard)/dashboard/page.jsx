import { titlesObject } from "@/app/assets/titlesData/titles";
import { useAppSelector } from "@/lib/store/hooks";
import React from "react";

export const metadata = {
  title: titlesObject.dashboard.title,
};

const DashboardEcommerce = () => {
  return <div className="inital-pages-style">DashboardEcommerce</div>;
};

export default DashboardEcommerce;
