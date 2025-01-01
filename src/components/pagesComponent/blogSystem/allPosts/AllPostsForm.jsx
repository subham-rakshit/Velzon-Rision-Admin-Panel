"use client";

import JoditEditor from "jodit-react";
import { useTheme } from "next-themes";
import { MdArrowForward, MdErrorOutline } from "react-icons/md";
import { ClipLoader } from "react-spinners";

import { globalStyleObj } from "@/app/assets/styles";
import { LabelText } from "@/components";
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
import { getCustomColor } from "@/lib/utils/customColor";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { AllPostsSchema } from "@/schemas";
import { createNewPost } from "@/services/actions/posts";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const AllPostsForm = ({ userId, categoryList }) => {
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(AllPostsSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      shortDescription: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
    },
  });

  const { theme } = useTheme();
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { bgColor, hoverBgColor, textColor } = customColor;

  // NOTE Handle Create New Blog functionality
  const onSubmit = async (data) => {
    const response = await createNewPost(data, userId);

    if (response.success) {
      showSuccessToast(response.message || "Post created successfully.");
      reset();
    } else if (response.message.title) {
      setError("title", {
        type: "server",
        message: response.message.title.message,
      });
    } else if (response.message.category) {
      setError("category", {
        type: "server",
        message: response.message.category.message,
      });
    } else if (response.message.slug) {
      setError("slug", {
        type: "server",
        message: response.message.slug.message,
      });
    } else if (response.message.shortDescription) {
      setError("shortDescription", {
        type: "server",
        message: response.message.shortDescription.message,
      });
    } else {
      showErrorToast(response.message || "Something went wrong.");
    }
  };

  const commonInputContainerClass =
    "flex w-full flex-col justify-between gap-3 xl:flex-row";
  const commonDefaultInputFieldClass =
    "w-full max-w-[800px] border py-5 font-poppins-rg text-[13px] text-dark-weight-500 focus-visible:outline-none focus-visible:ring-0 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] min-h-full rounded-sm p-3 shadow-light sm:p-5`}
    >
      {/* Blog Title */}
      <div className={commonInputContainerClass}>
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
                className={commonDefaultInputFieldClass}
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
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText text="Category" htmlForId="blog-category" star={true} />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="blog-category"
                value={field.value || ""}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full border py-5 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400">
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent
                  className={`border-0 ${globalStyleObj.backgroundLight900Dark200} font-poppins-rg text-[13px] text-dark-weight-550 dark:text-light-weight-550`}
                >
                  {categoryList.length > 0 ? (
                    <SelectGroup>
                      {categoryList.map((item) => (
                        <SelectItem
                          key={item._id}
                          value={item.category.toLowerCase()}
                        >
                          {item.category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2 font-poppins-rg text-light-weight-400 p-3 text-[16px]">
                      <MdErrorOutline />
                      <h1>No Categories Uploaded Yet!</h1>
                    </div>
                  )}
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
      <div className={`mt-5 ${commonInputContainerClass}`}>
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
                className={commonDefaultInputFieldClass}
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
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Banner (1300 x 650)"
          htmlForId="blog-banner-img"
          star={false}
        />
        <Input
          id="blog-banner-img"
          type="file"
          className={`size-full max-w-[800px] border p-0 text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
        />
      </div>

      {/* Short Description */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
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
                className={`h-[100px] ${commonDefaultInputFieldClass}`}
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
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId="blog-description"
          star={false}
        />

        <div className="w-full max-w-[800px] rounded-sm border dark:border-[#fff]/10">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <JoditEditor
                {...field}
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
                value={field.value || ""}
                onBlur={(newContent) => {
                  field.onChange(newContent);
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Meta Title */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
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
              className={commonDefaultInputFieldClass}
            />
          )}
        />
      </div>

      {/* TODO Meta Image (200 x 200) */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId="blog-meta-img"
          star={false}
        />
        <Input
          id="blog-meta-img"
          type="file"
          className={`size-full max-w-[800px] border p-0 text-[13px] text-dark-weight-500 dark:border-[#fff]/10 dark:bg-[#000]/10 dark:text-light-weight-400`}
        />
      </div>

      {/* Meta Description */}
      <div className={`mt-5 ${commonInputContainerClass}`}>
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
              className={`h-[100px] ${commonDefaultInputFieldClass}`}
            />
          )}
        />
      </div>

      <div className="mt-10 flex items-center justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mx-auto ${globalStyleObj.flexStart} transition-300 gap-2 rounded-[4px] ${bgColor} ${hoverBgColor} ${textColor} px-5 py-2 font-poppins-rg text-[16px] tracking-wide hover:text-white`}
        >
          {isSubmitting ? (
            <>
              <ClipLoader color="#fff" size={16} />
              <span>Processing...</span>
            </>
          ) : (
            <>
              Create Post
              <MdArrowForward />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AllPostsForm;
