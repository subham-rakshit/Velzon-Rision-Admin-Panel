"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  FileReuseDialog,
  LabelText,
  RenderCategoryOptions,
} from "@/components";
import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { Controller, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updatePerticularCategory } from "@/lib/db/api/blogs/category";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { CategorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash"; // For deep comparison
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiEdit2Line } from "react-icons/ri";

const UpdateCategoryForm = ({
  userId,
  categoryDetails,
  categoryList,
  searchValue,
  filesList,
  paginationDetails,
  selectedFileType,
  selectedMetaFileId,
  selectedMetaFileName,
}) => {
  // React Hook Form Instance
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: categoryDetails.name || "",
      slug: categoryDetails.slug || "",
      description: categoryDetails.description || "",
      parentCategoryId: categoryDetails.parentCategoryId || "none",
      metaTitle: categoryDetails.metaTitle || "",
      metaImage:
        categoryDetails.metaImage !== null ? categoryDetails.metaImage._id : "",
      metaDescription: categoryDetails.metaDescription || "",
    },
  });

  // Custom Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor, hexCode } = customColor;
  const router = useRouter();

  // NOTE Watch form all fields and Compare with categoryDetails
  const currentValues = watch();
  const watchedName = watch("name");
  const watchedTags = watch("tags");
  const watchedIsDefault = watch("isDefault");

  // NOTE Relevant fields for comparison with categoryDetails
  const relevantFields = {
    name: categoryDetails.name,
    slug: categoryDetails.slug,
    description: categoryDetails.description,
    parentCategoryId: categoryDetails.parentCategoryId || "none",
    metaTitle: categoryDetails.metaTitle,
    metaImage: categoryDetails.metaImage?._id || "",
    metaDescription: categoryDetails.metaDescription,
  };

  // NOTE Compare currentValues with relevantFields (With deep comparison from Lodash)
  const hasChanges = !isEqual(currentValues, relevantFields);

  // NOTE Handle Slug value according to the category name
  useEffect(() => {
    if (
      watchedName &&
      watchedName.length > 0 &&
      watchedName !== categoryDetails.name
    ) {
      setError("slug", "");
      const generatedSlug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
        .trim();
      setValue("slug", generatedSlug);
    } else {
      setValue("slug", categoryDetails.slug);
    }
  }, [watchedName, setValue]);

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

  // NOTE Handle Create New Category functionality
  const onSubmit = async (data) => {
    const createNewCategoryResponse = await updatePerticularCategory(
      userId,
      categoryDetails._id,
      data
    );

    if (createNewCategoryResponse.success) {
      showSuccessToast(createNewCategoryResponse.message);
      router.push("/admin/blogs/categories/lists");
      router.refresh();
    } else {
      if (createNewCategoryResponse.errors) {
        handleValidationErrors(createNewCategoryResponse.errors);
      } else {
        showErrorToast(createNewCategoryResponse.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm p-3 shadow-light sm:p-5`}
    >
      {/* Category Name */}
      <div className={globalStyleObj.commonInputContainerClass}>
        <LabelText text="Name" htmlForId="blog-category-name" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Input
            {...register("name")}
            id="blog-category-name"
            placeholder="Enter category name"
            className={globalStyleObj.commonDefaultInputFieldClass}
          />

          {errors && errors.name && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      {/* Category Slug */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Slug" htmlForId="blog-category-slug" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Input
            id="blog-category-slug"
            {...register("slug")}
            placeholder="Enter slug"
            className={globalStyleObj.commonDefaultInputFieldClass}
          />
          {errors && errors.slug && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>

      {/* Category Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId="blog-category-description"
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Textarea
            {...register("description")}
            id="blog-category-description"
            placeholder="Enter description"
            className={`h-[100px] ${globalStyleObj.commonDefaultInputFieldClass}`}
          />

          {errors && errors.description && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      {/* Category Parent ID */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Parent Category"
          htmlForId="blog-parent-category-id"
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="parentCategoryId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="blog-parent-category-id"
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
                    <SelectItem
                      value="none"
                      className="text-red-500 test-[13px] font-poppins-rg"
                    >
                      None
                    </SelectItem>
                    {categoryList.length > 0 && (
                      <RenderCategoryOptions categoryList={categoryList} />
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors && errors.parentCategoryId && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.parentCategoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Title */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Title"
          htmlForId="blog-category-meta-title"
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Input
            id="blog-category-meta-title"
            {...register("metaTitle")}
            placeholder="Enter meta title"
            className={globalStyleObj.commonDefaultInputFieldClass}
          />
          {errors && errors.metaTitle && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.metaTitle.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId="blog-category-meta-img"
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <FileReuseDialog
            htmlId="blog-category-meta-img"
            userId={userId}
            filesList={filesList}
            paginationDetails={paginationDetails}
            searchValue={searchValue}
            selectedFileType={selectedFileType}
            onChangeMetaImage={onChangeMetaImage}
            selectedMetaFileId={selectedMetaFileId}
            selectedMetaFileName={selectedMetaFileName}
          />
        </div>
      </div>

      {/* Meta Description */}
      <div className={`my-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Description"
          htmlForId="blog-category-meta-description"
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Textarea
            id="blog-category-meta-description"
            {...register("metaDescription")}
            placeholder="Enter meta description"
            className={`h-[100px] ${globalStyleObj.commonDefaultInputFieldClass}`}
          />
          {errors && errors.metaDescription && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.metaDescription.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !hasChanges}
        className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white mt-10 w-full sm:max-w-[300px] dark:text-light-weight-800 ${!hasChanges ? "cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? (
          <>
            <ClipLoader color={hexCode} size={13} />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <RiEdit2Line />
            Update Ctegory
          </>
        )}
      </button>
    </form>
  );
};

export default UpdateCategoryForm;
