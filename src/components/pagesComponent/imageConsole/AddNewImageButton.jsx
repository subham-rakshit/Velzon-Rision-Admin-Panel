"use client";

import { MdArrowForward, MdOutlineAddPhotoAlternate } from "react-icons/md";

import { imageTypeConfig, imageTypeOptions } from "@/app/assets/data/imageData";
import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCustomColor } from "@/lib/utils/customColor";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { AllImageSchema } from "@/schemas";
import { createNewImage } from "@/services/actions/image";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { ClipLoader } from "react-spinners";

const AddNewImageButton = ({ userId }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(AllImageSchema),
    defaultValues: {
      imageType: "",
      maxWidth: 0,
      maxHeight: 0,
      imageFile: null,
    },
  });
  const [minWidthOptions, setMinWidthOptions] = useState([]);
  const [minHeightOptions, setMinHeightOptions] = useState([]);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, active, hexCode } = customColor;

  const router = useRouter();

  // NOTE: Watch Image Type and handle maxWidth and maxHeight options
  const watchImageType = watch("imageType");
  useEffect(() => {
    if (watchImageType) {
      const config = imageTypeConfig[watchImageType];

      if (config) {
        setMinWidthOptions(config.minWidthOptions);
        setMinHeightOptions(config.minHeightOptions);
      } else {
        setMinWidthOptions([]);
        setMinHeightOptions([]);
      }
    }
  }, [watchImageType]);

  // NOTE: Handle Zod Validation Error
  const handleZodValidationError = (data) => {
    if (data.errors) {
      const errors = data.errors;
      if (errors.imageType) {
        setError("imageType", {
          type: "server",
          message: errors.imageType.message,
        });
      }
      if (errors.maxWidth) {
        setError("maxWidth", {
          type: "server",
          message: errors.maxWidth.message,
        });
      }
      if (errors.maxHeight) {
        setError("maxHeight", {
          type: "server",
          message: errors.maxHeight.message,
        });
      }
      if (errors.imageFile) {
        setError("imageFile", {
          type: "server",
          message: errors.imageFile.message,
        });
      }
    } else {
      showErrorToast(data.message);
    }
  };

  // NOTE: Handle Create New Image functionality
  const onSubmit = async (data) => {
    // Resize the image (react-image-file-resizer)
    if (data.imageFile && data.minWidth && data.minHeight && data.imageType) {
      Resizer.imageFileResizer(
        data.imageFile, // Is the file of the image which will resized.
        1980, // Is the maxWidth of the resized new image.
        1080, // Is the maxHeight of the resized new image.
        "JPEG", // Is the compressFormat of the resized new image.
        100, // Is the quality of the resized new image.
        0, // Is the degree of clockwise rotation to apply to uploaded image.
        async (uri) => {
          setIsProcessing(true);
          const response = await createNewImage(
            uri,
            data,
            userId,
            handleZodValidationError
          );

          if (response && response.success) {
            reset();
            setPreview(null);
            setIsProcessing(false);
            showSuccessToast(response.message);
            router.refresh();
          } else if (response && !response.success) {
            setIsProcessing(false);
            showErrorToast(response.message);
          }
        }, // Is the callBack function of the resized new image URI.
        "base64", // Is the output type of the resized new image.
        data.minWidth, // Is the minWidth of the resized new image.
        data.minHeight // Is the minHeight of the resized new image.
      );
    }
    if (!data.imageType) {
      setError("imageType", {
        message: "Image type is required",
      });
    }
    if (!data.minWidth) {
      setError("minWidth", {
        message: "Min width is required",
      });
    }
    if (!data.minHeight) {
      setError("minHeight", {
        message: "Min height is required",
      });
    }
    if (!data.imageFile) {
      setError("imageFile", {
        message: "Image file is required",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`flex w-fit items-center gap-2 rounded-sm px-5 py-2 font-poppins-rg text-[13px] ${bgColor} ${hoverBgColor} ${textColor} dark:text-light-weight-550 hover:text-light-weight-550 transition-all duration-300 ease-in-out`}
        >
          <MdOutlineAddPhotoAlternate size={15} />
          Add New
        </button>
      </DialogTrigger>
      <DialogContent
        className={`w-[95%] ${globalStyleObj.backgroundLight900Dark200}`}
      >
        <DialogHeader>
          <DialogTitle className="font-poppins-rg text-[16px] text-dark-weight-550 dark:text-light-weight-550">
            Upload New Image
          </DialogTitle>
          <DialogDescription className="font-poppins-rg text-[13px] text-light-weight-400">
            First check if the image already exists in your gallery. Click
            Upload Image when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Type */}
          <div className="flex flex-col mb-3">
            <LabelText text="Type" htmlForId="new-image-type" star={true} />
            <Controller
              name="imageType"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  id="new-image-type"
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400 mt-2 mb-1">
                    <SelectValue placeholder="--" />
                  </SelectTrigger>
                  <SelectContent
                    className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                  >
                    <SelectGroup>
                      {(imageTypeOptions || []).map((type) => (
                        <SelectItem key={type.id} value={type.value}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors && errors.imageType && (
              <p className="text-[13px] font-poppins-rg text-red-500">
                {errors.imageType.message}
              </p>
            )}
          </div>

          {/* Image Sizes */}
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Max Width */}
            <div className="flex flex-col">
              <LabelText
                text="Min Width"
                htmlForId="new-image-min-width"
                star={true}
              />
              <Controller
                name="minWidth"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="new-image-min-width"
                    disabled={minWidthOptions.length === 0 ? true : false}
                    onValueChange={(value) =>
                      field.onChange(parseInt(value) || 0)
                    }
                  >
                    <SelectTrigger className="w-full min-w-[100px] border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400 mt-2 mb-1">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent
                      className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                    >
                      <SelectGroup>
                        {(minWidthOptions || []).map((item) => (
                          <SelectItem key={`value-${item}`} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors && errors.minWidth && (
                <p className="text-[13px] font-poppins-rg text-red-500">
                  {errors.minWidth.message}
                </p>
              )}
            </div>

            {/* Max Height */}
            <div className="flex flex-col">
              <LabelText
                text="Min Height"
                htmlForId="new-image-min-height"
                star={true}
              />
              <Controller
                name="minHeight"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="new-image-min-height"
                    disabled={minHeightOptions.length === 0 ? true : false}
                    onValueChange={(value) =>
                      field.onChange(parseInt(value) || 0)
                    }
                  >
                    <SelectTrigger className="w-full min-w-[100px] border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400 mt-2 mb-1">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent
                      className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                    >
                      <SelectGroup>
                        {(minHeightOptions || []).map((item) => (
                          <SelectItem key={`value-${item}`} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors && errors.minHeight && (
                <p className="text-[13px] font-poppins-rg text-red-500">
                  {errors.minHeight.message}
                </p>
              )}
            </div>
          </div>

          {/* Image file */}
          <div className="flex flex-col mb-3">
            <LabelText
              text="Image file"
              htmlForId="new-image-url"
              star={true}
            />

            <Controller
              name="imageFile"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <>
                  <Input
                    id="imageFile"
                    type="file"
                    accept=".jpeg, .jpg, .png, .webp"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file); // Bind file to the field value
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setPreview(reader.result); // result:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA"
                        reader.readAsDataURL(file);
                      } else {
                        setPreview(null);
                      }
                    }}
                    className="min-h-fit rounded-md border dark:border-[#fff]/10 text-[13px] text-dark-weight-500 dark:text-light-weight-400 font-poppins-rg p-0 mt-2"
                  />
                </>
              )}
            />

            {preview && (
              <div className="mt-3 h-[200px] w-full rounded-md">
                <Image
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={100}
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-md"
                />
              </div>
            )}
            {errors && errors.imageFile && (
              <p className="text-[13px] font-poppins-rg text-red-500 mt-2">
                {errors.imageFile.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || isSubmitting}
            className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white w-full ${isProcessing || isSubmitting ? "cursor-not-allowed" : ""}`}
          >
            {isSubmitting || isProcessing ? (
              <>
                <ClipLoader color={hexCode} size={16} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                Upload Image
                <MdArrowForward />
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewImageButton;
