"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Deleting } from "@/lib/helpers/Spinner";
import DOMPurify from "dompurify";
import { Badge, BadgeCheck, FileIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Image Preview
const ImagePreview = ({ fileKey, url, isSVG, sanitizedSVG }) => {
  return (
    <>
      {isSVG ? (
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: sanitizedSVG }}
        />
      ) : (
        <Image
          src={url}
          alt={`File ${fileKey}`}
          fill
          priority
          sizes="(min-width: 576px) 576px, 100vw"
          className={`object-cover transition-opacity duration-300 group-hover:blur-[1px]`}
        />
      )}
    </>
  );
};

// Pill Tooltip
const PillTooltip = ({ name, contentType, size }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-[#000] bg-opacity-50 px-3 py-1 rounded-full w-[60%] hover:cursor-pointer">
          <span className="block truncate text-[12px] font-poppins-rg text-white">
            {name}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        className={`max-w-[300px] z-[99] ${globalStyleObj.backgroundLight900Dark200}`}
      >
        <ul className="text-[12px] font-poppins-rg text-dark-weight-400 dark:text-light-weight-450 space-y-1">
          <li>
            <strong className="dark:text-white">Name:</strong> {name}
          </li>
          <li>
            <strong className="dark:text-white">Type:</strong> {contentType}
          </li>
          <li>
            <strong className="dark:text-white">Size:</strong> {size}
          </li>
        </ul>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Overlay Buttons
const OverlayButtons = ({
  fileId,
  isImage,
  isSVG,
  selectedFileId,
  onSelectId,
  fileName,
}) => {
  return (
    <>
      {(isImage || isSVG) && (
        <button
          type="button"
          onClick={() => onSelectId(fileId, fileName)}
          className="absolute top-2 right-2 rounded-md shadow-md transition-opacity duration-300 ease-in-out dark:bg-white dark:border-[#fff]/10 p-2 cursor-pointer bg-white/50 hover:bg-white dark:bg-white/50 dark:hover:bg-[#fff]"
        >
          {selectedFileId && selectedFileId === fileId ? (
            <BadgeCheck className="text-green-500 size-[16px]" />
          ) : (
            <Badge className="text-blue-500 size-[16px]" />
          )}
        </button>
      )}
    </>
  );
};

// NOTE Main Component
const FileDialogInner = ({
  fileId,
  fileKey,
  fileName,
  contentType,
  size,
  url,
  userId,
  selectedFileId,
  onSelectId,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [sanitizedSVG, setSanitizedSVG] = useState(null);

  const router = useRouter();
  const isImage = contentType.startsWith("image/");
  const isSVG = contentType.startsWith("image/svg+xml");

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
            fileId={fileId}
            isImage={isImage}
            isSVG={isSVG}
            selectedFileId={selectedFileId}
            onSelectId={onSelectId}
            fileName={fileName}
          />
        </>
      )}
    </div>
  );
};

export default FileDialogInner;
