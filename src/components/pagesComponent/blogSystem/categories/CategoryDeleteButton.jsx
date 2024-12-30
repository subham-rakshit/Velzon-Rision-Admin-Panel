"use client";

import { deletePerticularCategory } from "@/lib/actions/category";
import { RiDeleteBin2Line } from "react-icons/ri";

const CategoryDeleteButton = ({ userId, categoryId }) => {
  // TODO NEED TO WORK ------>
  const handleCategoryDelete = async () => {
    const resposne = await deletePerticularCategory(userId, categoryId);
  };

  return (
    <button
      type="button"
      onClick={handleCategoryDelete}
      className="transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white"
    >
      <RiDeleteBin2Line size={15} />
    </button>
  );
};

export default CategoryDeleteButton;
