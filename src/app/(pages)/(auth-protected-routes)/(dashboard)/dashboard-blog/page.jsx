import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";

export const metadata = {
  title: titlesObject.blog.title,
};

const DashboardBlog = () => {
  return (
    <div className={`${globalStyleObj.initialPageStyle}`}>DashboardBlog</div>
  );
};

export default DashboardBlog;
