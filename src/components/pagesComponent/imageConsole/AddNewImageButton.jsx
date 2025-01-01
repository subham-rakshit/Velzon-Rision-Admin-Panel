"use client";

import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { imageTypeConfig } from "@/app/assets/data/imageSizesData";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCustomColor } from "@/lib/utils/customColor";
import { AllImageSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AddNewImageButton = ({ userId }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(AllImageSchema),
  });
  const [maxWidthOptions, setMaxWidthOptions] = useState([]);
  const [maxHeightOptions, setMaxHeightOptions] = useState([]);

  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, active } = customColor;

  const router = useRouter();

  const watchImageType = watch("imageType");
  useEffect(() => {
    if (watchImageType) {
      const config = imageTypeConfig[watchImageType];

      if (config) {
        setMaxWidthOptions(config.maxWidthOptions);
        setMaxHeightOptions(config.maxHeightOptions);
      } else {
        setMaxWidthOptions([]);
        setMaxHeightOptions([]);
      }
    }
  }, [watchImageType]);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];

    // Resize the image (react-image-file-resizer)
    Resizer.imageFileResizer(
      imageFile, // Is the file of the image which will resized.
      700, // Is the maxWidth of the resized new image.
      500, // Is the maxHeight of the resized new image.
      "JPEG", // Is the compressFormat of the resized new image.
      100, // Is the quality of the resized new image.
      0, // Is the degree of clockwise rotation to apply to uploaded image.
      async (uri) => {
        try {
          setImageObj((prev) => ({
            ...prev,
            isImageUploading: true,
          }));

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/image/upload-image`,
            {
              image: uri,
              imageFileName: imageFile.name,
              userId: userId,
            }
          );

          if (response.data.success && response.status === 201) {
            setImageObj((prev) => ({
              ...prev,
              isImageUploading: false,
              fileName: imageFile.name,
              imagePreview: response.data.url,
              uploadBtnText: imageFile.name,
            }));

            router.refresh(); // Re-fetching the new images list from DB in parent
          }
        } catch (error) {
          console.log(`Error while uploading image: ${error}`);
          setImageObj((prev) => ({
            ...prev,
            isImageUploading: false,
            fileName: "",
            imagePreview: "",
            uploadBtnText: "Upload Image",
          }));

          showErrorToast(
            error?.response?.data?.message || error?.response?.data?.errors
          );
        }
      }, // Is the callBack function of the resized new image URI.
      "base64" // Is the output type of the resized new image.
      // minWidth, // Is the minWidth of the resized new image.
      // minHeight // Is the minHeight of the resized new image.
    );
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog className="relative">
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
          <div className="flex flex-col gap-3 mb-5">
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
                  <SelectTrigger className="w-full border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
                    <SelectValue placeholder="--" />
                  </SelectTrigger>
                  <SelectContent
                    className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                  >
                    <SelectGroup>
                      <SelectItem value="profile-pictures">
                        Profile Pictures
                      </SelectItem>
                      <SelectItem value="thumbnails">Thumbnails</SelectItem>
                      <SelectItem value="blog-article">
                        Blog or Artical Images
                      </SelectItem>
                      <SelectItem value="web-banner">Web Banner</SelectItem>
                      <SelectItem value="ecommerce-product-image">
                        E-commerce Product Image
                      </SelectItem>
                      <SelectItem value="general-web-use">
                        General Web Use
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors && errors.imageType && (
              <p className="text-[13px] font-poppins-rg text-red-500 mt-1">
                {errors.imageType.message}
              </p>
            )}
          </div>

          {/* Image Sizes */}
          <div className="flex items-center justify-between gap-3 mb-5">
            {/* Max Width */}
            <div className="flex flex-col gap-3">
              <LabelText
                text="Max Width"
                htmlForId="new-image-max-width"
                star={true}
              />
              <Controller
                name="maxWidth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    id="new-image-max-width"
                    disabled={maxWidthOptions.length === 0 ? true : false}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger className="w-full min-w-[100px] border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent
                      className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                    >
                      <SelectGroup>
                        {(maxWidthOptions || []).map((item) => (
                          <SelectItem key={`value-${item}`} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Max Height */}
            <div className="flex flex-col gap-3">
              <LabelText
                text="Max Height"
                htmlForId="new-image-max-height"
                star={true}
              />
              <Controller
                name="maxHeight"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    id="new-image-max-height"
                    disabled={maxHeightOptions.length === 0 ? true : false}
                    onValueChange={(value) => field.onChange(parseInt(value))}
                  >
                    <SelectTrigger className="w-full min-w-[100px] border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
                      <SelectValue placeholder="--" />
                    </SelectTrigger>
                    <SelectContent
                      className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                    >
                      <SelectGroup>
                        {(maxHeightOptions || []).map((item) => (
                          <SelectItem key={`value-${item}`} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Generate Image URL */}
          <div className="flex flex-col gap-3 mb-5">
            <LabelText
              text="Image file"
              htmlForId="new-image-url"
              star={true}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log(file);
                setValue("imageFile", file);
              }}
              className="border rounded-md text-[13px] font-poppins-rg text-dark-weight-550 dark:text-light-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10"
            />
          </div>

          <button
            type="submit"
            className={`${bgColor} ${hoverBgColor} ${textColor} hover:text-white transition-all duration-300 ease-in-out px-4 py-2 rounded-md text-[13px] font-poppins-rg w-full`}
          >
            Uplaod
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewImageButton;
