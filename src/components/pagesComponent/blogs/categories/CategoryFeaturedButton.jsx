"use client";

import { Switch } from "@/components/ui/switch";
import { changeCategoryFeaturedStatus } from "@/lib/api/category";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const CategoryFeaturedButton = ({ userId, categoryDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleFeaturedStatusChange = async () => {
    setIsProcessing(true);
    const changeCategoryFeaturedResponse = await changeCategoryFeaturedStatus(
      userId,
      categoryDetails._id,
      categoryDetails.isFeatured
    );

    if (changeCategoryFeaturedResponse.success) {
      setIsProcessing(false);
      showSuccessToast(changeCategoryFeaturedResponse.message);
      router.refresh();
    } else {
      setIsProcessing(false);
      showErrorToast(changeCategoryFeaturedResponse.message);
    }
  };

  if (isProcessing) {
    return <PulseLoader size={5} color="#9fa1ad" />;
  }

  return (
    <Switch
      checked={categoryDetails.isFeatured}
      onCheckedChange={handleFeaturedStatusChange}
      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 h-4 w-8"
      thumbClassName="data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 h-3 w-3"
    />
  );
};

export default CategoryFeaturedButton;
