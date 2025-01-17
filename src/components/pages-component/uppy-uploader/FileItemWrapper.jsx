"use client";

import {
  ImagePreview,
  OverlayButtons,
  PillTooltip,
  VideoPreview,
} from "@/components";
import { deleteFileFromDB } from "@/lib/db/api/files";
import { Deleting } from "@/lib/helpers/Spinner";
import { showSuccessToast } from "@/lib/utils/toast-notification";
import DOMPurify from "dompurify";
import { FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// NOTE Main Component
const FileItemWrapper = ({
  fileKey,
  fileName,
  contentType,
  size,
  url,
  userId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [sanitizedSVG, setSanitizedSVG] = useState(null);

  const router = useRouter();
  const isImage = contentType.startsWith("image/");
  const isSVG = contentType.startsWith("image/svg+xml");
  const isVideo = contentType.startsWith("video/");

  useEffect(() => {
    const fetchAndSanitizeSVG = async () => {
      try {
        const svgResponse = await fetch(url);
        const rawSVG = await svgResponse.text();
        const cleanSVG = DOMPurify.sanitize(rawSVG, {
          USE_PROFILES: { svg: true, html: false },
        });

        setSanitizedSVG(cleanSVG);
      } catch (error) {
        console.log(`Error in fetching SVG CLIENT: ${error}`);
      }
    };

    if (isSVG) fetchAndSanitizeSVG();
  }, [url, isSVG]);

  const onDelete = async () => {
    setIsDeleting(true);

    const { success, message } = await deleteFileFromDB(fileKey, userId);
    if (success) {
      setIsDeleting(false);
      showSuccessToast(message);
      router.refresh();
    } else {
      setIsDeleting(false);
      showErrorToast(message);
    }
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-gray-200 border dark:border-[#fff]/10 group shadow-sm">
      {isDeleting ? (
        <Deleting />
      ) : (
        <>
          {isImage ? (
            <ImagePreview
              fileKey={fileKey}
              url={url}
              isSVG={isSVG}
              sanitizedSVG={sanitizedSVG}
            />
          ) : isVideo ? (
            <VideoPreview fileKey={fileKey} url={url} type={contentType} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <FileIcon className="w-10 h-10 text-dark-weight-550" />
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-2 w-full">
            <PillTooltip
              name={fileName}
              contentType={contentType}
              size={size}
            />
          </div>
          <OverlayButtons
            fileKey={fileKey}
            onDelete={onDelete}
            contentType={contentType}
            url={url}
            userId={userId}
            isSVG={isSVG}
            isImage={isImage}
            sanitizedSVG={sanitizedSVG}
          />
        </>
      )}
    </div>
  );
};

export default FileItemWrapper;
