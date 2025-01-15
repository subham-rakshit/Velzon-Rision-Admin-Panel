"use client";

import { downloadFile } from "@/lib/api/image";
import { showErrorToast } from "@/lib/utils/toast-notification";
import { Download } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const DownloadFile = ({ fileKey, contentType, userId }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = async () => {
    setIsProcessing(true);

    const { success, responseData, message } = await downloadFile(
      fileKey,
      contentType,
      userId
    );

    if (!success && message) {
      setIsProcessing(false);
      showErrorToast(message);
    } else {
    }
  };

  return (
    <button
      type="button"
      className="absolute bottom-2 right-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:border-[#fff]/10 p-2 cursor-pointer bg-white/50 hover:bg-white dark:bg-white/50 dark:hover:bg-[#fff]"
      onClick={handleDownload}
    >
      {isProcessing ? (
        <ClipLoader color="#0e9f6e" size={16} />
      ) : (
        <Download className={`text-green-500 size-[16px]`} />
      )}
    </button>
  );
};

export default DownloadFile;
