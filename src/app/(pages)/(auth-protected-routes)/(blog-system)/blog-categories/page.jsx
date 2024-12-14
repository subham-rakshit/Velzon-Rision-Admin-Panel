import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { BlogPostCategories, Breadcrumb } from "@/components";

export const metadata = {
  title: titlesObject.categories.title,
};

const BlogSystemCategories = () => {
  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="Categories" pageTilte="Blog System" />

      <BlogPostCategories />
    </div>
  );
};

export default BlogSystemCategories;
