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
import { createNewBlogPost } from "@/lib/db/api/blogs/posts";
import { getCustomColor } from "@/lib/utils/customColor";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { AllBlogsSchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiNews } from "react-icons/bi";

const defaultValues = {
  title: "",
  slug: "",
  category: "",
  bannerImage: "",
  shortDescription: "",
  description: "",
  tags: [],
  source: "",
  metaTitle: "",
  metaImage: "",
  metaDescription: "",
};

const CreateBlogPostForm = ({
  userId,
  categoryList,
  filesList,
  paginationDetails,
  searchValue,
  selectedFileType,
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
    defaultValues,
  });

  const { theme } = useTheme();
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, hexCode } = customColor;
  const router = useRouter();

  const watchedTitle = watch("title");
  const watchedTags = watch("tags");

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
  const onChangeBannerImage = (id) => {
    setValue("bannerImage", id);
  };

  // NOTE Handle Meta Image
  const onChangeMetaImage = (id) => {
    setValue("metaImage", id);
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
    const response = await createNewBlogPost(data, userId);

    if (response.success) {
      showSuccessToast(response.message || "Post created successfully.");
      reset();
      router.push("/admin/blogs/posts/lists");
    } else {
      if (response.errors) {
        handleValidationErrors(response.errors);
      } else {
        showErrorToast(response.message || "Something went wrong.");
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
        <LabelText text="Blog Title" htmlForId="blog-title" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="blog-title"
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
        <LabelText text="Slug" htmlForId="blog-slug" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="blog-slug"
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
        <LabelText text="Category" htmlForId="blog-category" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="blog-category"
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
          htmlForId="blog-banner-img"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <FileReuseDialog
            htmlId="blog-banner-img"
            userId={userId}
            filesList={filesList}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeBannerImage={onChangeBannerImage}
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
          htmlForId="blog-short-description"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="shortDescription"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="blog-short-description"
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
          htmlForId="blog-description"
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
            id="blog-description"
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
        <LabelText text="Tags" htmlForId="blog-tags" star={false} />
        <div className="flex flex-col w-full max-w-[800px]">
          <Input
            id="blog-tags"
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
        <LabelText text="Blog Source" htmlForId="blog-source" star={false} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="blog-source"
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
        <LabelText text="Meta Title" htmlForId="blog-meta-title" star={false} />
        <Controller
          name="metaTitle"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="blog-meta-title"
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
          htmlForId="blog-meta-img"
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <FileReuseDialog
            htmlId="blog-meta-img"
            userId={userId}
            filesList={filesList}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeMetaImage={onChangeMetaImage}
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
          htmlForId="blog-meta-description"
          star={false}
        />

        <Controller
          name="metaDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="blog-meta-description"
              value={field.value || ""}
              className={`h-[100px] ${globalStyleObj.commonDefaultInputFieldClass}`}
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-10 w-full sm:max-w-[300px] dark:text-light-weight-800`}
      >
        {isSubmitting ? (
          <>
            <ClipLoader color={hexCode} size={13} />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <BiNews />
            Create Blog Post
          </>
        )}
      </button>
    </form>
  );
};

export default CreateBlogPostForm;