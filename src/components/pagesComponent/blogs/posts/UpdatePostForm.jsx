"use client";

import JoditEditor from "jodit-react";
import { useTheme } from "next-themes";
import { MdErrorOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import {
  ImageReuseDialog,
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

const UpdatePostForm = ({ userId, postDetails, categoryList, searchValue }) => {
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
      category: postDetails.category || "",
      slug: postDetails.slug || "",
      bannerImage: postDetails.bannerImage || "",
      shortDescription: postDetails.shortDescription || "",
      description: postDetails.description || "",
      metaTitle: postDetails.metaTitle || "",
      metaImage: postDetails.metaImage || "",
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

  // NOTE Relevant fields for comparison with postDetails
  const relevantFields = {
    title: postDetails.title,
    category: postDetails.category,
    slug: postDetails.slug,
    bannerImage: postDetails.bannerImage,
    shortDescription: postDetails.shortDescription,
    description: postDetails.description,
    metaTitle: postDetails.metaTitle,
    metaImage: postDetails.metaImage,
    metaDescription: postDetails.metaDescription,
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
                placeholder="Blog Title"
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
                placeholder="Slug"
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

      {/* TODO Banner (1300 x 650) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Banner (1300 x 650)"
          htmlForId="blog-banner-img"
          star={true}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <ImageReuseDialog
            userId={userId}
            searchValue={searchValue}
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
              placeholder="Meta Title"
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
          <ImageReuseDialog
            userId={userId}
            searchValue={searchValue}
            htmlId="blog-meta-img"
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
