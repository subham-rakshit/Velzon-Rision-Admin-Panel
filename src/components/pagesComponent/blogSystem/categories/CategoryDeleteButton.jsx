"use client";

import { debounce } from "@/lib/utils/api-debounce";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { deletePerticularCategory } from "@/services/actions/category";
import { useRouter } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";

const CategoryDeleteButton = ({ userId, categoryDetails }) => {
  const router = useRouter();

  // NOTE Handle Delete Category functionality
  const handleCategoryDelete = async () => {
    const response = await deletePerticularCategory(
      userId,
      categoryDetails._id
    );

    if (response.success) {
      showSuccessToast(response.message || "Category deleted successfully.");
      router.refresh();
    } else {
      showErrorToast(response.message || "Something went wrong.");
    }
  };

  // NOTE Debounce the delete function
  const debouncedDelete = debounce(handleCategoryDelete, 500);

  return (
    <button
      type="button"
      onClick={debouncedDelete}
      className="transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white"
    >
      <RiDeleteBin2Line size={15} />
    </button>
  );
};

export default CategoryDeleteButton;
