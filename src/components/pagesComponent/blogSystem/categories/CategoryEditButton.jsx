"use client";

import { updatePerticularCategory } from "@/lib/actions/category";
import { RiEditBoxLine } from "react-icons/ri";

const CategoryEditButton = ({ userId, categoryId }) => {
  // TODO NEED TO WORK ------>
  const handleCategoryEdit = async () => {
    const resposne = await updatePerticularCategory(userId, categoryId);
  };

  return (
    <button
      type="button"
      onClick={handleCategoryEdit}
      className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
    >
      <RiEditBoxLine size={15} />
    </button>
  );
};

export default CategoryEditButton;
