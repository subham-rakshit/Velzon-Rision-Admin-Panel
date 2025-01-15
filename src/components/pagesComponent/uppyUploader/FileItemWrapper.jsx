"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { DownloadFile, ImageDetailedPreview } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Deleting } from "@/lib/helpers/Spinner";
import { Expand, FileIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Image Preview
const ImagePreview = ({ fileKey, url }) => {
  return (
    <>
      <Image
        src={url}
        alt={`File ${fileKey}`}
        fill
        priority
        sizes="(min-width: 576px) 576px, 100vw"
        className={`object-cover transition-opacity duration-300 group-hover:blur-[1px]`}
      />
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
const OverlayButtons = ({ fileKey, onDelete, contentType, url, userId }) => {
  const isImage = contentType.startsWith("image/");

  return (
    <>
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-2 right-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out dark:bg-white dark:border-[#fff]/10 p-2 cursor-pointer bg-white/50 hover:bg-white dark:bg-white/50 dark:hover:bg-[#fff]"
      >
        <Trash2 className="text-red-500 size-[16px]" />
      </button>

      <DownloadFile
        fileKey={fileKey}
        contentType={contentType}
        userId={userId}
      />

      {isImage && (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute top-2 left-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border p-2 cursor-pointer bg-white/50 hover:bg-white dark:bg-white/50 dark:hover:bg-[#fff]"
            >
              <Expand className="size-[16px] text-blue-500" />
            </button>
          </DialogTrigger>
          <DialogContent
            className={`max-w-[90vw] h-[90vh] z-[99] ${globalStyleObj.backgroundLight900Dark200}`}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>Image Preview</DialogTitle>
              <DialogDescription>
                Detailed view of the selected image
              </DialogDescription>
            </DialogHeader>
            <div className="w-full h-full relative">
              <ImageDetailedPreview url={url} fileKey={fileKey} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

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
  const isImage = contentType.startsWith("image/");

  const onDelete = async () => {};

  return (
    <div className="relative aspect-video overflow-hidden rounded-md bg-gray-200 border dark:border-[#fff]/10 group shadow-sm">
      {isDeleting ? (
        <Deleting />
      ) : (
        <>
          {isImage ? (
            <ImagePreview fileKey={fileKey} url={url} />
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
          />
        </>
      )}
    </div>
  );
};

export default FileItemWrapper;
