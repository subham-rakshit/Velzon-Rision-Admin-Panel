"use client";

import { globalStyleObj } from "@/app/assets/styles";
import { ImageDialogContent } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

const ImageReuseDialog = ({
  userId,
  searchValue,
  htmlId,
  onChangeBannerImage,
  onChangeMetaImage,
}) => {
  const [selectedImage, setSelectedImage] = useState({
    url: "",
    fileName: "",
  });
  const [selectError, setSelectError] = useState(false);

  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { hexCode, bgColor, hoverBgColor, textColor } = customColor;

  const handleSelectButton = () => {
    if (!selectedImage.url || !selectedImage.fileName) {
      setSelectError(true);
    } else {
      setSelectError(false);
      if (onChangeMetaImage) {
        onChangeMetaImage(selectedImage.url);
      }
      if (onChangeBannerImage) {
        onChangeBannerImage(selectedImage.url);
      }
    }
  };

  const onSelectImage = (image) => {
    setSelectedImage({
      url: image.imageUrl,
      fileName: image.imageFileName,
    });
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
          <p>
            {selectedImage.fileName ? selectedImage.fileName : "No file chosen"}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent
        className={`min-w-[95%] z-[99] ${globalStyleObj.backgroundLight900Dark300}`}
      >
        <ImageDialogContent
          userId={userId}
          searchValue={searchValue}
          hexCode={hexCode}
          onSelectImage={onSelectImage}
        />

        {selectError &&
          selectedImage &&
          !selectedImage.url &&
          !selectedImage.fileName && (
            <p className="text-[13px] font-poppins-md text-red-500">
              Choose an image to upload.
            </p>
          )}
        <DialogFooter>
          <button
            type="button"
            onClick={handleSelectButton}
            className={`${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[14px] tracking-wide hover:text-white rounded-md`}
          >
            Select
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageReuseDialog;
