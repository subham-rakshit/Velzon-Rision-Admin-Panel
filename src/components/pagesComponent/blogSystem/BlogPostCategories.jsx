import React from "react";

import { globalStyleObj } from "@/app/assets/styles";

const BlogPostCategories = () => {
  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] h-[20vh] rounded-sm shadow-light`}
    >
      <h4 className="border-b p-3 font-poppins-md text-[15px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-550 sm:p-5">
        Blog Category Information
      </h4>
      <div className="flex w-full flex-col justify-between gap-3 xl:flex-row"></div>
    </div>
  );
};

export default BlogPostCategories;
