import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { globalStyleObj } from "@/app/assets/styles";
import { titlesObject } from "@/app/assets/titlesData/titles";
import {
  AddNewCategoriesForm,
  Breadcrumb,
  CategoryDeleteButton,
  CategoryEditButton,
  SearchCategoryForm,
} from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { getAllCategories } from "@/services/actions/category";
import { getServerSession } from "next-auth";
import { MdErrorOutline } from "react-icons/md";

export const metadata = {
  title: titlesObject.categories.title,
};

const BlogSystemCategories = async ({ searchParams }) => {
  // OAuth Session user data
  const session = await getServerSession(authOptions);
  // JWT ACCESS_TOKEN user data
  const accessTokenData = await getAccessTokenData();
  // User ID
  const userId =
    session || accessTokenData
      ? session
        ? session.user._id
        : accessTokenData._id
      : null;

  // Category List
  let categoryList = [];

  // Search options
  const { search } = await searchParams;

  // Fetch all List of Categories
  const { success, fetchData } = await getAllCategories(userId, search || "");
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="Categories" pageTilte="Blog System" />

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

              {/* Add New Category Form */}
              <AddNewCategoriesForm userId={userId} />
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

            <SearchCategoryForm searchValue={search} />
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

          {categoryList.length > 0 ? (
            (categoryList || []).map((item, index) => (
              <div
                key={`category-${index}`}
                className={`${globalStyleObj.flexBetween} gap-5 p-3 sm:p-5 border-b dark:border-[#fff]/10`}
              >
                <div className="flex items-center gap-5 font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-400">
                  <span>{index + 1}</span>
                  <span>{item.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <CategoryEditButton userId={userId} categoryDetails={item} />

                  <CategoryDeleteButton
                    userId={userId}
                    categoryDetails={item}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full items-center justify-center gap-2 font-poppins-rg text-light-weight-400 p-3 text-[16px]">
              <MdErrorOutline />
              <h1>No Categories Uploaded Yet!</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSystemCategories;
