import { globalStyleObj } from "@/app/assets/styles";
import { AddNewCategoriesForm } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiDeleteBin2Line, RiEditBoxLine } from "react-icons/ri";

const BlogPostCategories = () => {
  return (
    <>
      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div className={`${globalStyleObj.flexBetween} gap-5 p-3 sm:p-5`}>
          <h4 className="font-poppins-md text-[15px] text-dark-weight-550 dark:text-light-weight-550">
            All Blog Categories
          </h4>

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="rounded-full bg-violet-500/80 hover:bg-violet-500 dark:bg-violet-500/10 px-5 py-2 font-poppins-rg text-[13px] text-white dark:text-violet-600 dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-300 ease-in-out"
              >
                Add New Category
              </button>
            </DialogTrigger>
            <DialogContent
              className={`sm:max-w-[600px] ${globalStyleObj.backgroundLight800Dark600}`}
            >
              <DialogHeader className="font-poppins-rg">
                <DialogTitle className="text-[16px] text-dark-weight-600 dark:text-light-weight-550">
                  Blog Category Information
                </DialogTitle>
                <DialogDescription className="text-[13px] text-light-weight-400 italic">
                  Carete a new category for blog post. Click 'CREATE' when
                  you're done.
                </DialogDescription>
              </DialogHeader>

              <AddNewCategoriesForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mx-3 rounded-sm border dark:border-[#fff]/10">
          <div
            className={`${globalStyleObj.flexBetween} gap-5 border-b p-3 dark:border-[#fff]/10 sm:p-5`}
          >
            <h4 className="font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-550">
              Blog Categories
            </h4>

            <input
              type="text"
              placeholder="Type name & Enter"
              className="rounded-sm border border-[#000]/20 bg-transparent px-2 py-1 font-poppins-rg text-[13px] text-dark-weight-550 dark:border-[#fff]/10 dark:text-light-weight-550"
            />
          </div>

          <div
            className={`${globalStyleObj.flexBetween} gap-5 border-b px-3 py-2 dark:border-[#fff]/10 sm:px-5`}
          >
            <div className="flex items-center gap-5 font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550">
              <span>#</span>
              <span>Name</span>
            </div>

            <span className="font-poppins-md text-[13px] text-dark-weight-600 dark:text-light-weight-550">
              Options
            </span>
          </div>

          {(["category1", "category2", "category3"] || []).map(
            (category, index) => (
              <div
                key={`category-${index}`}
                className={`${globalStyleObj.flexBetween} gap-5 p-3 sm:p-5 ${index === 2 ? "" : "border-b dark:border-[#fff]/10"}`}
              >
                <div className="flex items-center gap-5 font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-400">
                  <span>{index + 1}</span>
                  <span>{category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="transition-300 rounded-full bg-[#49ABE0]/20 p-2 text-[#49ABE0] hover:bg-[#49ABE0] hover:text-white"
                  >
                    <RiEditBoxLine size={15} />
                  </button>

                  <button
                    type="button"
                    className="transition-300 rounded-full bg-[#F06548]/20 p-2 text-[#F06548] hover:bg-[#F06548] hover:text-white"
                  >
                    <RiDeleteBin2Line size={15} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPostCategories;
