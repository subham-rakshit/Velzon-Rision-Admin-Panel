"use client";

import {
  CategoryDefaultdButton,
  CategoryDeleteButton,
  CategoryFeaturedButton,
  CategoryStatusButton,
} from "@/components";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { FaMinus } from "react-icons/fa";
import { MdOutlineFolderOpen } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const renderAllCategories = (
  categoryTree,
  expandedCategories,
  toggleCategory,
  userId,
  level = 12
) => {
  return categoryTree.map((category, index) => (
    <React.Fragment key={category._id}>
      <TableRow
        className={`text-[11px] sm:text-[13px] font-poppins-rg text-dark-weight-500 dark:text-light-weight-450`}
      >
        {/* Category Name with Toggle Button */}
        <TableCell
          className="cursor-pointer"
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
            className={`${category.activeStatus ? "" : "line-through text-light-weight-400 opacity-80"} md:hidden ml-2`}
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
            className={`${category.activeStatus ? "" : "line-through text-light-weight-400 opacity-80"} hidden md:inline ml-2`}
          >
            {category.name}
            {category.isDefault && (
              <span className="text-[10px] bg-red-500/20 rounded-full font-poppins-md text-red-600 px-2 py-0.5 ml-1">
                Default
              </span>
            )}
          </span>
        </TableCell>

        {/* Active Status Button */}
        <TableCell className="">
          <CategoryStatusButton userId={userId} categoryDetails={category} />
        </TableCell>

        {/* Featured Button */}

        <TableCell className="">
          <CategoryFeaturedButton userId={userId} categoryDetails={category} />
        </TableCell>

        {/* Default Status Button */}
        <TableCell className="">
          <CategoryDefaultdButton userId={userId} categoryDetails={category} />
        </TableCell>

        {/* Edit and Delete Buttons */}
        <TableCell className="flex items-center justify-end gap-2 flex-1 pr-3">
          <Link
            href={`/admin/blogs/categories/update/${category._id}`}
            className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
          >
            <RiEditBoxLine size={12} />
          </Link>

          <CategoryDeleteButton userId={userId} categoryDetails={category} />
        </TableCell>
      </TableRow>

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
              level + 5
            )}
          </>
        )}
    </React.Fragment>
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 pl-3">
            # Name
          </TableHead>
          <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
            Status
          </TableHead>
          <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
            Featured
          </TableHead>
          <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800">
            Default
          </TableHead>
          <TableHead className="font-poppins-md text-[11px] sm:text-[13px] text-dark-weight-600 dark:text-light-weight-800 text-right pr-3">
            Options
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-poppins-rg text-[11px] sm:text-[13px] text-dark-weight-400 dark:text-light-weight-450">
        {renderAllCategories(
          categoryTree,
          expandedCategories,
          toggleCategory,
          userId
        )}
      </TableBody>
    </Table>
  );
};

export default RenderAllCategories;
