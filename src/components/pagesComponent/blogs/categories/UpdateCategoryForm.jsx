"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  ImageReuseDialog,
  LabelText,
  RenderCategoryOptions,
} from "@/components";
import { getCustomColor } from "@/lib/utils/customColor";
import { useAppSelector } from "@/store/hooks";
import { Controller, useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updatePerticularCategory } from "@/lib/api/category";
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

const UpdateCategoryForm = ({ userId, categoryDetails, categoryList }) => {
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
      colorTheme: categoryDetails.colorTheme || "#495057",
      isDefault: categoryDetails.isDefault,
      tags: categoryDetails.tags || [],
      metaTitle: categoryDetails.metaTitle || "",
      metaImage: categoryDetails.metaImage || "",
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
    colorTheme: categoryDetails.colorTheme,
    isDefault: categoryDetails.isDefault,
    tags: categoryDetails.tags,
    metaTitle: categoryDetails.metaTitle,
    metaImage: categoryDetails.metaImage,
    metaDescription: categoryDetails.metaDescription,
  };

  // NOTE Compare currentValues with relevantFields (With deep comparison from Lodash)
  const hasChanges = !isEqual(currentValues, relevantFields);

  // NOTE Add tag with validation
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
  // NOTE Remove tag functionality
  const removeTag = (index) => {
    setValue(
      "tags",
      watchedTags.filter((_, i) => i !== index)
    );
  };

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
    if (errors.name) {
      setError("name", {
        type: "server",
        message: errors.name.message,
      });
    }
    if (errors.slug) {
      setError("slug", {
        type: "server",
        message: errors.slug.message,
      });
    }
    if (errors.description) {
      setError("description", {
        type: "server",
        message: errors.description.message,
      });
    }
    if (errors.parentCategoryId) {
      setError("parentCategoryId", {
        type: "server",
        message: errors.parentCategoryId.message,
      });
    }
    if (errors.colorTheme) {
      setError("colorTheme", {
        type: "server",
        message: errors.colorTheme.message,
      });
    }
    if (errors.tags) {
      setError("tags", {
        type: "server",
        message: errors.tags.message,
      });
    }
    if (errors.metaTitle) {
      setError("metaTitle", {
        type: "server",
        message: errors.metaTitle.message,
      });
    }
    if (errors.metaImage) {
      setError("metaImage", {
        type: "server",
        message: errors.metaImage.message,
      });
    }
    if (errors.metaDescription) {
      setError("metaDescription", {
        type: "server",
        message: errors.metaDescription.message,
      });
    }
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
          star={true}
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
          star={true}
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

      {/* Color Theme & Make Default */}
      <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:gap-2">
        {/* Category Color Theme */}
        <div className="flex-1">
          <LabelText
            text="Color Theme"
            htmlForId="blog-category-color-theme"
            star={false}
          />

          <Input
            {...register("colorTheme")}
            id="blog-category-color-theme"
            type="color"
            className="w-full sm:max-w-[150px] border dark:border-[#fff]/10 dark:bg-[#000]/10 cursor-pointer mt-2"
          />

          {errors && errors.colorTheme && (
            <p className="text-red-500 text-[13px] font-poppins-rg mt-1">
              {errors.colorTheme.message}
            </p>
          )}
        </div>

        <div className="mt-5 sm:mt-0 flex-1">
          {/* Is Default */}
          <div className="flex flex-col">
            <LabelText
              text="Make Default"
              htmlForId="blog-category-default-status"
              star={true}
            />
            <div className="mt-2">
              <Switch
                id="blog-category-default-status"
                checked={watchedIsDefault}
                onCheckedChange={(checked) => {
                  setValue("isDefault", checked);
                }}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-[#000]/20"
                thumbClassName="data-[state=checked]:bg-[#fff] data-[state=unchecked]:bg-[#fff] dark:data-[state=checked]:bg-[#fff] dark:data-[state=unchecked]:bg-[#fff]/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText text="Tags" htmlForId="blog-category-tags" star={true} />
        <div className="flex flex-col w-full max-w-[800px]">
          <Input
            id="blog-category-tags"
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
        <ImageReuseDialog
          userId={userId}
          // searchValue={searchValue}
          htmlId="blog-category-meta-img"
          onChangeMetaImage={onChangeMetaImage}
        />
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
