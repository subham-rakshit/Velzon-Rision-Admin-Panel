import React from "react";

import { titlesObject } from "@/app/assets/titlesData/titles";
import { Breadcrumb, AllPostsForm } from "@/components";

export const metadata = {
  title: titlesObject.allPosts.title,
};

const BlogSystemAllPosts = () => {
  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="All Posts" pageTilte="Blog System" />

      <AllPostsForm />
    </div>
  );
};

export default BlogSystemAllPosts;
