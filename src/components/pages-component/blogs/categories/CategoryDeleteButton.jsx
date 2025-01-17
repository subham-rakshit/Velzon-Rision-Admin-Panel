"use client";

import { DeletePopup } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { deletePerticularCategory } from "@/lib/db/api/blogs/category";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";

const CategoryDeleteButton = ({ userId, categoryDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // NOTE Handle Delete Category functionality
  const handleCategoryDelete = async () => {
    setIsProcessing(true);
    const response = await deletePerticularCategory(
      userId,
      categoryDetails._id
    );

    if (response.success) {
      showSuccessToast(response.message || "Category deleted successfully.");
      setIsProcessing(false);
      router.refresh();
    } else {
      setIsProcessing(false);
      showErrorToast(response.message || "Something went wrong.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={isProcessing || categoryDetails.isDefault}
        className={`transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] ${categoryDetails.isDefault ? "cursor-not-allowed" : "hover:bg-[#F06548] hover:text-white"}`}
      >
        {isProcessing ? (
          <LiaSpinnerSolid size={12} color="#F06548" className="animate-spin" />
        ) : categoryDetails.isDefault ? (
          <CgDanger size={12} />
        ) : (
          <RiDeleteBin2Line size={12} />
        )}
      </DialogTrigger>
      <DeletePopup
        handleDelete={handleCategoryDelete}
        type="category"
        itemName={categoryDetails.name}
        isProcessing={isProcessing}
      />
    </Dialog>
  );
};

export default CategoryDeleteButton;
