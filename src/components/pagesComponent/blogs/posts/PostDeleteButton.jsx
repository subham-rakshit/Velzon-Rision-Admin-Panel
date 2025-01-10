"use client";

import { deletePerticularPost } from "@/lib/api/blogs/posts";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";

const PostDeleteButton = ({ userId, postId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // NOTE Handle Delete Post functionality
  const handlePostDelete = async () => {
    setIsProcessing(true);
    const response = await deletePerticularPost(userId, postId);

    if (response.success) {
      showSuccessToast(response.message || "Post deleted successfully.");
      setIsProcessing(false);
      router.refresh();
    } else {
      setIsProcessing(false);
      showErrorToast(response.message || "Something went wrong.");
    }
  };

  return (
    <button
      type="button"
      onClick={handlePostDelete}
      disabled={isProcessing}
      className={`transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white`}
    >
      {isProcessing ? (
        <LiaSpinnerSolid size={12} color="#F06548" className="animate-spin" />
      ) : (
        <RiDeleteBin2Line size={12} />
      )}
    </button>
  );
};

export default PostDeleteButton;
