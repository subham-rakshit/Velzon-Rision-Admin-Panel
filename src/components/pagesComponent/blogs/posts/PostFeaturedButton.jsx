"use client";

import { Switch } from "@/components/ui/switch";
import { postToggleFeaturedStatus } from "@/lib/api/blogs/posts";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

const PostFeaturedButton = ({ userId, postDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleFeaturedStatusChange = async () => {
    setIsProcessing(true);
    const changePostFeaturedStatusResponse = await postToggleFeaturedStatus(
      userId,
      postDetails._id
    );

    if (changePostFeaturedStatusResponse.success) {
      setIsProcessing(false);
      showSuccessToast(changePostFeaturedStatusResponse.message);
      router.refresh();
    } else {
      setIsProcessing(false);
      showErrorToast(changePostFeaturedStatusResponse.message);
    }
  };

  if (isProcessing) {
    return <PulseLoader size={5} color="#9fa1ad" />;
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Switch
        checked={postDetails.isFeatured}
        onCheckedChange={() => handleFeaturedStatusChange()}
        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20 h-3 w-7"
        thumbClassName="data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20 h-2 w-2"
      />
    </div>
  );
};

export default PostFeaturedButton;
