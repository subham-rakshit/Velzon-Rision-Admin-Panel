"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

import { globalStyleObj } from "@/app/assets/styles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import {
  deletePerticularImage,
  downloadPerticularImage,
} from "@/services/actions/image";
import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { MdDelete, MdDownload } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const ImageSettingButton = ({ userId, imageId }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor } = customColor;

  const router = useRouter();

  // Handle Image Delete function
  const handleImageDelete = async () => {
    setIsProcessing(true);
    const response = await deletePerticularImage(imageId, userId);

    if (response.success) {
      setIsProcessing(false);
      showSuccessToast(response.message);
      router.refresh(); // Re-fetching the images list from DB in parent
    } else {
      setIsProcessing(false);
      showErrorToast(response.message);
    }
  };

  // Handle Image Download function
  const handleImageDownload = async () => {
    setIsProcessing(true);
    // 1. Fetch the image data from the API
    const response = await downloadPerticularImage(imageId, userId);

    // 2. Check if the response indicates a successful operation
    if (response.success) {
      // Step 3: Create a Blob object from the response data
      // The Blob constructor takes an array of data and a MIME type (in this case, 'image/jpeg')
      const blob = new Blob([response.responseData.data], {
        type: "image/jpeg",
      });

      // Step 4: Extract the filename from the 'Content-Disposition' header in the response
      const contentDisposition = response.responseData.headers.get(
        "Content-Disposition"
      );
      console.log("Content-Disposition: ", contentDisposition);
      const matches = contentDisposition.match(/filename="(.+)"/);
      // If a filename is found in the header, use it; otherwise, default to 'image.png'
      const fileName = matches && matches[1] ? matches[1] : "image.png";

      // Step 5: Create a downloadable URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Step 6: Dynamically create an <a> element to simulate a download
      const aElem = document.createElement("a");
      aElem.style.display = "none"; // Hide the <a> element
      aElem.href = url; // Set the URL as the href
      aElem.download = fileName; // Set the filename for the download

      // Step 7: Append the <a> element to the DOM, trigger a click, and remove it
      document.body.appendChild(aElem);
      aElem.click(); // Simulate a click to start the download
      document.body.removeChild(aElem);
      window.URL.revokeObjectURL(url); // Release the object URL to free up memory
      setIsProcessing(false);
    } else {
      // Step 8: If the response indicates failure, display an error toast
      showErrorToast(response.message);
      setIsProcessing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isProcessing ? (
          <button
            type="button"
            className={`mt-2 w-[30px] h-[30px] absolute top-0 left-full -translate-x-[120%] flex items-center justify-center rounded-full bg-[#fff]/50 ${hoverBgColor} transition-all duration-300 ease-in-out group shadow-md`}
          >
            <ClipLoader color="#000" size={16} />
          </button>
        ) : (
          <button
            type="button"
            className={`mt-2 w-[30px] h-[30px] absolute top-0 left-full -translate-x-[120%] flex items-center justify-center rounded-full bg-[#fff]/50 ${hoverBgColor} transition-all duration-300 ease-in-out group shadow-md`}
          >
            <IoSettings
              className={`animate-spin ${textColor} group-hover:text-white`}
            />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`font-poppins-rg ${globalStyleObj.backgroundLight900Dark300}`}
      >
        <DropdownMenuItem>
          <button
            type="button"
            onClick={handleImageDelete}
            className="flex w-full cursor-pointer items-center gap-2 text-[13px] text-red-500"
          >
            <MdDelete size={15} />
            Delete
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-[13px] text-blue-500">
          <button
            type="button"
            onClick={handleImageDownload}
            className="flex w-full cursor-pointer items-center gap-2 text-[13px] text-blue-500"
          >
            <MdDownload size={15} />
            Download
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImageSettingButton;
