"use client";

import { CategoryDeleteButton, CategoryFeaturedButton } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";
import { MdOutlineFolderOpen } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

const renderAllCategories = (
  categoryTree,
  expandedCategories,
  toggleCategory,
  userId,
  level = 0
) => {
  return categoryTree.map((category, index) => (
    <div
      key={category._id}
      className={`${category.parentCategoryId === null || !category.children ? `px-3 sm:px-5 ${index !== categoryTree.length - 1 ? "border-b dark:border-[#fff]/10" : ""} py-5` : "mt-5"} text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-450`}
    >
      <div className="flex items-center justify-between">
        {/* Category Name with Toggle Button */}
        <div
          className="flex items-center gap-2 cursor-pointer flex-1"
          style={{ paddingLeft: `${level}px` }}
          onClick={
            category.children && category.children.length > 0
              ? () => toggleCategory(category._id)
              : null
          }
        >
          {category.children && category.children.length > 0 ? (
            <button className="bg-green-500/20 rounded-full p-1">
              {expandedCategories.includes(category._id) ? (
                <AiOutlineFolderOpen size={12} className="text-green-500" />
              ) : (
                <MdOutlineFolderOpen size={12} className="text-green-500" />
              )}
            </button>
          ) : (
            <button className="bg-[#000]/20 dark:bg-[#fff]/10 rounded-full p-1">
              <FaMinus
                size={8}
                className="text-dark-weight-500 dark:text-light-weight-550"
              />
            </button>
          )}
          {/* Category name for small devices */}
          <span
            className={`${category.isFeatured ? "" : "line-through text-light-weight-400 opacity-80"} md:hidden`}
          >
            {category.name.length > 20
              ? category.name.slice(0, 20) + "..."
              : category.name}
            {category.isDefault && (
              <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-1">
                Default
              </span>
            )}
          </span>
          {/* Category name for above small devices */}
          <span
            className={`${category.isFeatured ? "" : "line-through text-light-weight-400 opacity-80"} hidden md:inline`}
          >
            {category.name}
            {category.isDefault && (
              <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-1">
                Default
              </span>
            )}
          </span>
        </div>

        {/* Featured Button */}
        {!category.isDefault && (
          <div className="flex-1 flex items-center justify-center">
            <CategoryFeaturedButton
              userId={userId}
              categoryDetails={category}
            />
          </div>
        )}

        {/* Edit and Delete Buttons */}
        <div className="flex items-center justify-end gap-2 flex-1">
          <Link
            href={`/admin/blogs/categories/update/${category._id}`}
            className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
          >
            <RiEditBoxLine size={12} />
          </Link>

          <CategoryDeleteButton userId={userId} categoryDetails={category} />
        </div>
      </div>

      {/* Render Children if Expanded */}
      {expandedCategories.includes(category._id) &&
        category.children &&
        category.children.length > 0 && (
          <>
            {renderAllCategories(
              category.children,
              expandedCategories,
              toggleCategory,
              userId,
              level + 8
            )}
          </>
        )}
    </div>
  ));
};

const RenderAllCategories = ({ categoryTree, userId }) => {
  // State to Track Expanded Categories
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Toggle Function
  const toggleCategory = (categoryId) => {
    setExpandedCategories(
      (prevState) =>
        prevState.includes(categoryId)
          ? prevState.filter((id) => id !== categoryId) // Remove from expanded
          : [...prevState, categoryId] // Add to expanded
    );
  };

  return (
    <div>
      {renderAllCategories(
        categoryTree,
        expandedCategories,
        toggleCategory,
        userId
      )}
    </div>
  );
};

export default RenderAllCategories;
