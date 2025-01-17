"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { FileDialogContent } from "@/components";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const FileReuseDialog = ({
  htmlId,
  userId,
  filesList,
  paginationDetails,
  searchValue,
  selectedFileType,
  onChangeBannerImage,
  onChangeMetaImage,
  selectedBannerFileId,
  selectedBannerFileName,
  selectedMetaFileId,
  selectedMetaFileName,
}) => {
  const [name, setName] = useState(
    selectedBannerFileName || selectedMetaFileName || ""
  );

  const onSelectFile = (id, name) => {
    setName(name);

    if (onChangeMetaImage && id) {
      onChangeMetaImage(id);
    }
    if (onChangeBannerImage && id) {
      onChangeBannerImage(id);
    }
  };

  return (
    <Dialog id={htmlId}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full flex items-center gap-5 rounded-md overflow-hidden text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-550 border dark:border-[#fff]/10"
        >
          <p className="bg-[#000]/70 dark:bg-[#fff]/20 px-3 py-[10px] text-light-weight-800">
            Choose File
          </p>
          <p>{name ? name : "No file chosen"}</p>
        </button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[90%] max-h-fit z-[99] ${globalStyleObj.backgroundLight900Dark300}`}
      >
        <FileDialogContent
          userId={userId}
          filesList={filesList}
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onSelectFile={onSelectFile}
          selectedBannerFileId={selectedBannerFileId}
          selectedMetaFileId={selectedMetaFileId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileReuseDialog;
