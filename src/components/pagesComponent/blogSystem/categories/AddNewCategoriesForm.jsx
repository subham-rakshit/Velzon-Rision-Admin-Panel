"use client";

import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/helpers/toast-notification";
import { useAppSelector } from "@/lib/store/hooks";
import { getCustomColor } from "@/lib/utils/customColor";
import { NewCategorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

const AddNewCategoriesForm = ({ userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(NewCategorySchema) });

  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { active, bgColor, hoverBgColor, textColor, hexCode } = customColor;

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/post/create-new-category`,
        {
          ...data,
          userId,
        }
      );

      if (response.data.success && response.status === 201) {
        showSuccessToast(response.data.message);
        reset();
        router.refresh();
      }
    } catch (error) {
      console.log("Error in creating new category: ", error);
      showErrorToast(
        error.response.data.message ||
          error.response.data.errors ||
          error.message
      );
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
          className={`rounded-sm px-5 py-2 font-poppins-rg text-[13px] text-light-weight-800 dark:text-violet-600  dark:hover:text-white transition-all duration-300 ease-in-out max-w-[250px] self-end ${active} ${isSubmitting ? `opacity-60 cursor-not-allowed` : ""}`}
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
