"use client";

import { debounce } from "@/lib/utils/api-debounce";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { deletePerticularCategory } from "@/services/actions/category";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

const CategoryDeleteButton = ({ userId, categoryId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // NOTE Handle Delete Category functionality
  const handleCategoryDelete = async () => {
    setIsProcessing(true);
    const response = await deletePerticularCategory(userId, categoryId);

    if (response.success) {
      showSuccessToast(response.message || "Category deleted successfully.");
      setIsProcessing(false);
      router.refresh();
    } else {
      setIsProcessing(false);
      showErrorToast(response.message || "Something went wrong.");
    }
  };

  // NOTE Debounce the delete function
  const debouncedDelete = debounce(handleCategoryDelete, 500);

  return (
    <button
      type="button"
      onClick={debouncedDelete}
      disabled={isProcessing}
      className="transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white"
    >
      {isProcessing ? (
        <ClipLoader size={12} color="#F06548" />
      ) : (
        <RiDeleteBin2Line size={12} />
      )}
    </button>
  );
};

export default CategoryDeleteButton;
