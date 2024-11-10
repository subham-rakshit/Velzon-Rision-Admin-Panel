import { titlesObject } from "@/app/assets/titlesData/titles";
import React from "react";

export const metadata = {
  title: titlesObject.blog.title,
  description: titlesObject.blog.description,
};

const DashboardBlog = () => {
  return <div>DashboardBlog</div>;
};

export default DashboardBlog;
