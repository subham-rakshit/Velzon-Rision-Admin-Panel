"use client";

import { DeletePopup } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { deletePerticularPost } from "@/lib/api/blogs/posts";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { RiDeleteBin2Line } from "react-icons/ri";

const PostDeleteButton = ({ userId, postDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // NOTE Handle Delete Post functionality
  const handlePostDelete = async () => {
    setIsProcessing(true);
    const response = await deletePerticularPost(userId, postDetails._id);

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
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger
          disabled={isProcessing}
          className={`transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white`}
        >
          {isProcessing ? (
            <LiaSpinnerSolid
              size={12}
              color="#F06548"
              className="animate-spin"
            />
          ) : (
            <RiDeleteBin2Line size={12} />
          )}
        </DialogTrigger>
        <DeletePopup
          handleDelete={handlePostDelete}
          type="post"
          itemName={postDetails.title}
          isProcessing={isProcessing}
        />
      </Dialog>
    </div>
  );
};

export default PostDeleteButton;
