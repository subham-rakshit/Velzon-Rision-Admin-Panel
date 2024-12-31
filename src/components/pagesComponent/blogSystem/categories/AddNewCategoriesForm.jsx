"use client";

import { getCustomColor } from "@/lib/utils/customColor";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { CategorySchema } from "@/schemas";
import { createNewCategory } from "@/services/actions/category";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const AddNewCategoriesForm = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({ resolver: zodResolver(CategorySchema) });

  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { active, bgColor } = customColor;

  const router = useRouter();

  // NOTE Handle Create New Category functionality
  const onSubmit = async (data) => {
    const response = await createNewCategory(data, userId);

    if (response.success) {
      showSuccessToast(response.message || "Category created successfully.");
      reset();
      router.refresh();
    } else if (response.message.newCategory) {
      setError("newCategory", {
        type: "server",
        message: response.message.newCategory.message,
      });
    } else {
      showErrorToast(response.message || "Something went wrong.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-5"
      >
        <div className="font-poppins-rg text-[13px]">
          <label
            htmlFor="create-blog-new-category"
            className="text-dark-weight-500 dark:text-light-weight-450"
          >
            New Category
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            {...register("newCategory")}
            type="text"
            id="create-blog-new-category"
            name="newCategory"
            placeholder="Type category name"
            className="w-full mt-2 rounded-sm border border-[#000]/20 bg-transparent px-2 py-1 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-550"
          />

          {errors && errors.newCategory ? (
            <p className="mt-2 text-red-500 text-[12px] font-poppins-rg">
              {errors.newCategory.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-sm px-5 py-2 font-poppins-rg text-[13px] text-light-weight-800 max-w-[250px] self-end ${active} ${isSubmitting ? `opacity-60 cursor-not-allowed` : ""}`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 text-light-weight-800">
              <ClipLoader size={16} color="#f3f3f3" />
              Creating...
            </span>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </>
  );
};

export default AddNewCategoriesForm;
