"use client";

import { CategoryDeleteButton, CategoryFeaturedButton } from "@/components";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";

const renderAllCategories = (
  categoryTree,
  expandedCategories,
  toggleCategory,
  userId
) => {
  return categoryTree.map((category) => (
    <div
      key={category._id}
      className={`${category.parentCategoryId === "none" ? "px-3 sm:px-5 border-b dark:border-[#fff]/10 py-5" : "my-5"} text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-450`}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Category Name with Toggle Button */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={
            category.children.length > 0
              ? () => toggleCategory(category._id)
              : null
          }
        >
          {category.children.length > 0 ? (
            <button className="bg-green-500/20 rounded-full p-1">
              {expandedCategories.includes(category._id) ? (
                <FaMinus size={8} className="text-green-500" />
              ) : (
                <FaPlus size={8} className="text-green-500" />
              )}
            </button>
          ) : (
            <button className="bg-green-500/20 rounded-full p-1">
              <FaMinus size={8} className="text-green-500" />
            </button>
          )}
          <span>{category.name}</span>
        </div>

        {/* Featured Button */}
        <CategoryFeaturedButton userId={userId} categoryDetails={category} />

        {/* Edit and Delete Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
          >
            <RiEditBoxLine size={12} />
          </button>

          <CategoryDeleteButton userId={userId} categoryId={category._id} />
        </div>
      </div>

      {/* Render Children if Expanded */}
      {expandedCategories.includes(category._id) &&
        category.children.length > 0 && (
          <div className="pl-2">
            {renderAllCategories(
              category.children,
              expandedCategories,
              toggleCategory
            )}
          </div>
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
