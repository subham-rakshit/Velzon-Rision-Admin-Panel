"use client";

import {
  AddNewImageButton,
  ImageSearchBox,
  ImageSettingButton,
} from "@/components";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAllImages } from "@/lib/api/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsEmojiAstonished } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const ImageDialogContent = ({
  userId,
  searchValue,
  hexCode,
  onSelectImage,
}) => {
  const [imagesList, setImagesList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [counter, setCounter] = useState(0);

  const onCounterChange = () => {
    setCounter((prev) => prev + 1);
  };

  const getAllImagesAction = async (userId, searchValue) => {
    setIsProcessing(true);
    const { success, images } = await getAllImages(userId, searchValue || "");
    if (success) {
      setImagesList(images);
      setIsProcessing(false);
    } else {
      setImagesList([]);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getAllImagesAction(userId, searchValue);
    }
  }, [userId, searchValue, counter]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between gap-2 font-poppins-rg mt-5">
          <div className="flex items-center gap-2">
            <ImageSearchBox searchValue={searchValue} />
          </div>
          <AddNewImageButton
            userId={userId}
            onCounterChange={onCounterChange}
          />
        </DialogTitle>
        <DialogDescription className="text-[14px] font-poppins-rg text-dark-weight-350 dark:text-light-weight-400 italic">
          You can select an image from the list below. After select, click{" "}
          <span className="font-poppins-sb text-dark-weight-500 dark:text-light-weight-800 underline">
            Select
          </span>{" "}
          button. Click{" "}
          <span className="font-poppins-sb text-dark-weight-500 dark:text-light-weight-800 underline">
            {" "}
            Add New
          </span>{" "}
          to upload new images.
        </DialogDescription>
      </DialogHeader>
      <ul className="my-5 flex h-[50vh] w-full flex-wrap gap-3 md:gap-5 overflow-auto">
        {isProcessing ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader color={hexCode} size={30} />
          </div>
        ) : imagesList.length > 0 ? (
          imagesList.map((image) => (
            <li
              key={image._id}
              onClick={() => {
                setSelectedImage(image._id);
                onSelectImage(image);
              }}
              className={`flex h-[220px] w-full max-w-[220px] flex-col overflow-hidden rounded-md shadow-lg transition-all duration-300 ease-in-out hover:shadow-sm relative cursor-pointer ${selectedImage === image._id ? "border-2 border-blue-500" : ""}`}
            >
              <div className={`w-full h-[130px]`}>
                <Image
                  src={image.imageUrl}
                  alt={image.imageFileName}
                  width={100}
                  height={100}
                  priority={true}
                  style={{ width: "100%", height: "100%" }}
                  className="object-cover"
                />
              </div>

              <div
                className={`flex items-center bg-[#000]/20 px-2 py-2 h-[90px]`}
              >
                <div>
                  <p className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550 mb-1">
                    File Name :{" "}
                    <span className="font-poppins-rg text-dark-weight-400 dark:text-light-weight-400">
                      {image.imageFileName}
                    </span>
                  </p>

                  <p className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550 mb-1">
                    Type :{" "}
                    <span className="font-poppins-rg text-dark-weight-400 dark:text-light-weight-400">
                      {image.imageType}
                    </span>
                  </p>

                  <p className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550 mb-1">
                    Size :{" "}
                    <span className="font-poppins-rg text-dark-weight-400 dark:text-light-weight-400">
                      {image.minWidth} x {image.minHeight}
                    </span>
                  </p>
                </div>
              </div>

              <ImageSettingButton
                userId={userId}
                imageId={image._id}
                onCounterChange={onCounterChange}
              />
              {selectedImage === image._id && (
                <span className="absolute top-0 left-0 rounded-full mt-2 ml-2">
                  <MdCheckCircle size={15} color={hexCode} />
                </span>
              )}
            </li>
          ))
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-5 font-poppins-rg text-dark-weight-500 dark:text-light-weight-450">
            <BsEmojiAstonished size={80} />
            <h1 className="text-center text-[22px] text-dark-weight-600 dark:text-light-weight-800">
              No Images Uploaded Yet
            </h1>
            <p className="text-center text-[16px] italic text-dark-weight-350 dark:text-light-weight-400">
              Upload your first image to get started.
              <br /> Please click the Add New button.
            </p>
          </div>
        )}
      </ul>
    </>
  );
};

export default ImageDialogContent;
