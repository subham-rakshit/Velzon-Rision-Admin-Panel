import React from "react";

import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";
import {
  AllBlogsDescriptionTinyEditor,
  Breadcrumb,
  LabelText,
} from "@/components";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: titlesObject.allPosts.title,
};

const BlogSystemAllPosts = () => {
  const commonInputContainerClass =
    "flex w-full flex-col justify-between gap-3 xl:flex-row";

  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="All Posts" pageTilte="Blog System" />

      <form
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm p-3 shadow-light sm:p-5`}
      >
        {/* Blog Title */}
        <div className={commonInputContainerClass}>
          <LabelText text="Blog Title" htmlForId="blog-title" star={true} />
          <Input
            id="blog-title"
            type="text"
            placeholder="Blog Title"
            className={`w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>

        {/* Category */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText text="Category" htmlForId="blog-category" star={true} />
          <Select id="blog-category">
            <SelectTrigger className="w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10  dark:bg-[#000]/10 dark:text-light-weight-400">
              <SelectValue placeholder="--" className="border " />
            </SelectTrigger>
            <SelectContent
              className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
            >
              <SelectGroup>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Slug */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText text="Slug" htmlForId="blog-slug" star={true} />
          <Input
            id="blog-slug"
            type="text"
            placeholder="Slug"
            className={`w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>

        {/* Banner (1300 x 650) */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText
            text="Banner (1300 x 650)"
            htmlForId="blog-banner-img"
            star={false}
          />
          <Input
            id="blog-banner-img"
            type="file"
            className={`size-full max-w-[800px] border p-0 text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>

        {/* Short Description */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText
            text="Short Description"
            htmlForId="blog-short-description"
            star={true}
          />
          <Textarea
            id="blog-short-description"
            className={`h-[100px] w-full max-w-[800px] border font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>

        {/* Description */}
        {/* <div className="mt-5 flex w-full justify-between gap-5">
          <LabelText
            text="Description"
            htmlForId="blog-description"
            star={false}
          />
          <AllBlogsDescriptionTinyEditor />
        </div> */}

        {/* Meta Title */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText
            text="Meta Title"
            htmlForId="blog-meta-title"
            star={false}
          />
          <Input
            id="blog-meta-title"
            type="text"
            placeholder="Meta Title"
            className={`w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>

        {/* Meta Image (200 x 200) */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText
            text="Meta Image (200 x 200)"
            htmlForId="blog-meta-img"
            star={false}
          />
          <Input
            id="blog-meta-img"
            type="file"
            className={`size-full max-w-[800px] border p-0 text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>

        {/* Meta Description */}
        <div className={`mt-5 ${commonInputContainerClass}`}>
          <LabelText
            text="Meta Description"
            htmlForId="blog-meta-description"
            star={false}
          />
          <Textarea
            id="blog-meta-description"
            className={`h-[100px] w-full max-w-[800px] border font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
          />
        </div>
      </form>
    </div>
  );
};

export default BlogSystemAllPosts;
