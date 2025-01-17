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
import { Expand, Trash2 } from "lucide-react";

const OverlayButtons = ({
  fileKey,
  onDelete,
  contentType,
  url,
  userId,
  isSVG,
  isImage,
  sanitizedSVG,
}) => {
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
            <div className="w-full h-full relative overflow-hidden">
              <ImageDetailedPreview
                url={url}
                fileKey={fileKey}
                isSVG={isSVG}
                sanitizedSVG={sanitizedSVG}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OverlayButtons;
