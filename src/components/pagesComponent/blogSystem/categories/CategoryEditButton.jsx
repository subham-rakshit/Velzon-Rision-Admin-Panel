"use client";

import { updatePerticularCategory } from "@/services/actions/category";

import { globalStyleObj } from "@/app/assets/styles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCustomColor } from "@/lib/utils/customColor";
import {
  showErrorToast,
  showSuccessToast,
} from "@/lib/utils/toast-notification";
import { CategorySchema } from "@/schemas";
import { useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RiEditBoxLine } from "react-icons/ri";
import { ClipLoader } from "react-spinners";

const CategoryEditButton = ({ userId, categoryDetails }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      newCategory: categoryDetails.category,
    },
    resolver: zodResolver(CategorySchema),
  });

  // NOTE: Handle Colors
  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const customColor = getCustomColor({ layoutThemePrimaryColorType });
  const { active, bgColor } = customColor;
  const router = useRouter();

  // NOTE: Handle Edit Category functionality
  const onSubmit = async (data) => {
    const response = await updatePerticularCategory(
      userId,
      categoryDetails._id,
      data
    );

    if (response.success) {
      showSuccessToast(response.message || "Category updated successfully.");
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
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
        >
          <RiEditBoxLine size={15} />
        </button>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[600px] ${globalStyleObj.backgroundLight800Dark600}`}
      >
        <DialogHeader className="font-poppins-rg">
          <DialogTitle className="text-[16px] text-dark-weight-600 dark:text-light-weight-550">
            Blog Category Update
          </DialogTitle>
          <DialogDescription className="text-[13px] text-light-weight-400 italic">
            You can change the category name. Click 'UPDATE' when you're done.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col gap-5"
        >
          <div className="font-poppins-rg text-[13px]">
            <label
              htmlFor="blog-update-category"
              className="text-dark-weight-500 dark:text-light-weight-450"
            >
              Category
            </label>
            <input
              {...register("newCategory")}
              type="text"
              id="blog-update-category"
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
      </DialogContent>
    </Dialog>
  );
};

export default CategoryEditButton;
