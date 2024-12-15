"use client";

import React, { useState } from "react";
import { RiEditBoxLine, RiDeleteBin2Line } from "react-icons/ri";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "@/components";

const BlogPostCategories = () => {
  const [isAddCategory, setIsAddCategory] = useState(false);

  return (
    <>
      {isAddCategory ? (
        <div
          className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light`}
        >
          <h4 className=": border-b p-3 font-poppins-md text-[15px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-550 sm:p-5">
            Blog Category Information
          </h4>

          <div
            className={`flex w-full flex-col justify-between gap-3 p-3 sm:p-5 xl:flex-row`}
          >
            <LabelText text="Name" htmlForId="category-name" star={false} />
            <input
              id="category-name"
              type="text"
              name="name"
              required
              placeholder="Name"
              className={`w-full max-w-[800px] rounded-sm border border-[#000]/20 py-2 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
            />
          </div>

          <div className="flex justify-end px-3 pb-3 sm:px-5 sm:pb-5">
            <button
              type="button"
              onClick={() => setIsAddCategory(false)}
              className="rounded-sm bg-[#49ABE0] px-3 py-2 font-poppins-rg text-[13px] text-white"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
        >
          <div className={`${globalStyleObj.flexBetween} gap-5 p-3 sm:p-5`}>
            <h4 className="font-poppins-md text-[15px] text-dark-weight-550 dark:text-light-weight-550">
              All Blog Categories
            </h4>

            <button
              type="button"
              onClick={() => setIsAddCategory(true)}
              className="rounded-full bg-violet-500 px-3 py-2 font-poppins-rg text-[11px] text-white"
            >
              Add New Category
            </button>
          </div>

          <div className="mx-3 rounded-sm border dark:border-[#fff]/10">
            <div
              className={`${globalStyleObj.flexBetween} gap-5 border-b p-3 dark:border-[#fff]/10 sm:p-5`}
            >
              <h4 className="font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-550">
                Blog Categories
              </h4>

              <input
                type="text"
                placeholder="Type name & Enter"
                className="rounded-sm border border-[#000]/20 bg-transparent px-2 py-1 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-550"
              />
            </div>

            <div
              className={`${globalStyleObj.flexBetween} gap-5 border-b px-3 py-2 dark:border-[#fff]/10 sm:px-5`}
            >
              <div className="flex items-center gap-5 font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550">
                <span>#</span>
                <span>Name</span>
              </div>

              <span className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550">
                Options
              </span>
            </div>

            {(["category1", "category2", "category3"] || []).map(
              (category, index) => (
                <div
                  key={`category-${index}`}
                  className={`${globalStyleObj.flexBetween} gap-5 p-3 sm:p-5 ${index === 2 ? "" : "border-b dark:border-[#fff]/10"}`}
                >
                  <div className="flex items-center gap-5 font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-400">
                    <span>{index + 1}</span>
                    <span>{category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                    >
                      <RiEditBoxLine size={15} />
                    </button>

                    <button
                      type="button"
                      className="transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white"
                    >
                      <RiDeleteBin2Line size={15} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPostCategories;
