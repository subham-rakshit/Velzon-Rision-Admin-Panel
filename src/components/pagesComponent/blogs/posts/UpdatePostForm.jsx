"use client";

import JoditEditor from "jodit-react";
import { useTheme } from "next-themes";
import { MdClose, MdErrorOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import {
  FileReuseDialog,
  LabelText,
  RenderCategoryOptions,
} from "@/components";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updatePerticularPost } from "@/lib/api/blogs/posts";
import { getCustomColor } from "@/lib/utils/customColor";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { AllBlogsSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiNews } from "react-icons/bi";

const UpdatePostForm = ({
  userId,
  postDetails,
  categoryList,
  searchValue,
  filesList,
  paginationDetails,
  selectedFileType,
  selectedBannerFileId,
  selectedBannerFileName,
  selectedMetaFileId,
  selectedMetaFileName,
}) => {
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
    resolver: zodResolver(AllBlogsSchema),
    defaultValues: {
      title: postDetails.title || "",
      slug: postDetails.slug || "",
      category: postDetails.category || "",
      bannerImage: postDetails.bannerImage._id || "",
      shortDescription: postDetails.shortDescription || "",
      description: postDetails.description || "",
      tags: postDetails.tags || [],
      source: postDetails.source || "",
      metaTitle: postDetails.metaTitle || "",
      metaImage:
        postDetails.metaImage !== null ? postDetails.metaImage._id : "",
      metaDescription: postDetails.metaDescription || "",
    },
  });

  const { theme } = useTheme();
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, hexCode } = customColor;
  const router = useRouter();

  // NOTE Watch form all fields and Compare with categoryDetails
  const currentValues = watch();
  const watchedTitle = watch("title");
  const watchedTags = watch("tags");

  // NOTE Relevant fields for comparison with postDetails
  const relevantFields = {
    title: postDetails.title || "",
    slug: postDetails.slug || "",
    category: postDetails.category || "",
    bannerImage: postDetails.bannerImage._id || "",
    shortDescription: postDetails.shortDescription || "",
    description: postDetails.description || "",
    tags: postDetails.tags || [],
    source: postDetails.source || "",
    metaTitle: postDetails.metaTitle || "",
    metaImage: postDetails.metaImage !== null ? postDetails.metaImage._id : "",
    metaDescription: postDetails.metaDescription || "",
  };

  // NOTE Compare currentValues with relevantFields (With deep comparison from Lodash)
  const hasChanges = !isEqual(currentValues, relevantFields);

  // NOTE Handle Slug value according to the category name
  useEffect(() => {
    if (watchedTitle && watchedTitle.length > 0) {
      setError("slug", "");
      const generatedSlug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
        .trim();
      setValue("slug", generatedSlug);
    } else {
      setValue("slug", "");
    }
  }, [watchedTitle, setValue]);

  // NOTE Watched tag value change for add new, delete functionality
  // Add tag validation
  const addTag = (tag) => {
    setError("tags", null);
    if (watchedTags.length <= 20) {
      if (tag.length <= 20) {
        setValue("tags", [...watchedTags, tag]);
      } else {
        setError("tags", {
          message: "Each tag must not exceed 20 characters.",
        });
      }
    } else {
      setError("tags", { message: "A maximum of 20 tags are allowed." });
    }
  };
  // Remove tag functionality
  const removeTag = (index) => {
    setValue(
      "tags",
      watchedTags.filter((_, i) => i !== index)
    );
  };

  // NOTE Handle Banner Image
  const onChangeBannerImage = (url) => {
    setValue("bannerImage", url);
  };

  // NOTE Handle Meta Image
  const onChangeMetaImage = (url) => {
    setValue("metaImage", url);
  };

  // NOTE Handle Validation Errors
  const handleValidationErrors = (errors) => {
    Object.keys(errors).forEach((field) => {
      setError(field, {
        type: "server",
        message: errors[field].message,
      });
    });
  };

  // NOTE Handle Create New Blog functionality
  const onSubmit = async (data) => {
    const updatePostResponse = await updatePerticularPost(
      userId,
      postDetails._id,
      data
    );

    if (updatePostResponse.success) {
      showSuccessToast(updatePostResponse.message);
      router.push(
        `/admin/blogs/posts/lists?search=${updatePostResponse.postTile}`
      );
    } else {
      if (updatePostResponse.errors) {
        handleValidationErrors(updatePostResponse.errors);
      } else {
        showErrorToast(updatePostResponse.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm p-3 shadow-light sm:p-5`}
    >
      {/* Blog Title */}
      <div className={globalStyleObj.commonInputContainerClass}>
        <LabelText
          text="Blog Title"
          htmlForId="update-blog-title"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="update-blog-title"
                type="text"
                value={field.value || ""}
                placeholder="Enter Blog Title"
                className={globalStyleObj.commonDefaultInputFieldClass}
              />
            )}
          />
          {errors && errors.title && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.title.message}
            </p>
          )}
        </div>
      </div>

      {/* Slug */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Slug" htmlForId="update-blog-slug" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="update-blog-slug"
                type="text"
                value={field.value || ""}
                placeholder="Enter Slug"
                className={globalStyleObj.commonDefaultInputFieldClass}
              />
            )}
          />

          {errors && errors.slug && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Category"
          htmlForId="update-blog-category"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="update-blog-category"
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent
                  className={`border-0 ${globalStyleObj.backgroundLight900Dark200}`}
                >
                  <SelectGroup>
                    {categoryList.length > 0 ? (
                      <RenderCategoryOptions categoryList={categoryList} />
                    ) : (
                      <p className="text-light-weight-400 text-[13px] font-poppins-rg flex items-center justify-center gap-2">
                        <MdErrorOutline size={16} color="#878a99" />
                        Category does not created yet
                      </p>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors && errors.category && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* TODO Banner (1300 x 650) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Banner (1300 x 650)"
          htmlForId="update-blog-banner-img"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <FileReuseDialog
            htmlId="update-blog-banner-img"
            userId={userId}
            filesList={filesList}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeBannerImage={onChangeBannerImage}
            selectedBannerFileId={selectedBannerFileId}
            selectedBannerFileName={selectedBannerFileName}
          />
          {errors && errors.bannerImage && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.bannerImage.message}
            </p>
          )}
        </div>
      </div>

      {/* Short Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Short Description"
          htmlForId="update-blog-short-description"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="update-blog-short-description"
                value={field.value || ""}
                className={`h-[100px] ${globalStyleObj.commonDefaultInputFieldClass}`}
              />
            )}
          />

          {errors && errors.shortDescription && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.shortDescription.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId="update-blog-description"
          star={false}
        />

        <div className="w-full max-w-[800px] rounded-sm border dark:border-[#fff]/10">
          <JoditEditor
            config={{
              placeholder: "",
              showCharsCounter: false,
              showWordsCounter: false,
              showXPathInStatusbar: false,
              height: 300,
              style: {
                backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                color: theme === "light" ? "#495057" : "#ced4da",
              },
              toolbarAdaptive: true,
              toolbarButtonSize: "middle",
              toolbar: true,
            }}
            id="update-blog-description"
            value={watch("description")}
            name="description"
            onBlur={(newContent) => {
              setValue("description", newContent);
            }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Tags" htmlForId="update-blog-tags" star={false} />
        <div className="flex flex-col w-full max-w-[800px]">
          <Input
            id="update-blog-tags"
            placeholder="Enter tag"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                e.preventDefault();
                addTag(e.target.value);
                e.target.value = "";
              }
            }}
            className={globalStyleObj.commonDefaultInputFieldClass}
          />

          {watchedTags.length === 0 && (
            <p className="text-[12px] italic font-poppins-rg text-light-weight-450 mt-1">
              Press{" "}
              <span className="text-dark-weight-350 dark:text-light-weight-800 font-poppins-md">
                ENTER
              </span>{" "}
              to add new tag.
            </p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {watchedTags.map((tag, index) => (
              <div
                key={index}
                className="bg-[#000]/20 text-dark-weight-550 dark:text-light-weight-450 text-[12px] font-poppins-rg px-2 py-1 rounded flex items-center gap-1"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-red-500 hover:scale-[1.2] transition-all duration-300 ease-in-out"
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
          {errors && errors.tags && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.tags.message}
            </p>
          )}
        </div>
      </div>

      {/* Source */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Blog Source"
          htmlForId="update-blog-source"
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="update-blog-source"
                type="text"
                value={field.value || ""}
                placeholder="Provide Blog Source Link"
                className={globalStyleObj.commonDefaultInputFieldClass}
              />
            )}
          />
          {errors && errors.source && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.source.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Title */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Title"
          htmlForId="update-blog-meta-title"
          star={false}
        />
        <Controller
          name="metaTitle"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="update-blog-meta-title"
              type="text"
              value={field.value || ""}
              placeholder="Enter Meta Title"
              className={globalStyleObj.commonDefaultInputFieldClass}
            />
          )}
        />
      </div>

      {/* TODO Meta Image (200 x 200) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId="update-blog-meta-img"
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <FileReuseDialog
            htmlId="update-blog-meta-img"
            userId={userId}
            filesList={filesList}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeMetaImage={onChangeMetaImage}
            selectedMetaFileId={selectedMetaFileId}
            selectedMetaFileName={selectedMetaFileName}
          />
          {errors && errors.metaImage && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.metaImage.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Description"
          htmlForId="update-blog-meta-description"
          star={false}
        />

        <Controller
          name="metaDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="update-blog-meta-description"
              value={field.value || ""}
              className={`h-[100px] ${globalStyleObj.commonDefaultInputFieldClass}`}
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !hasChanges}
        className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-10 w-full sm:max-w-[300px] dark:text-light-weight-800 ${!hasChanges ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isSubmitting ? (
          <>
            <ClipLoader color={hexCode} size={13} />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <BiNews />
            Update Blog Post
          </>
        )}
      </button>
    </form>
  );
};

export default UpdatePostForm;
