import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  Breadcrumb,
  RenderAllCategories,
  SearchInputField,
} from "@/components";
import { getAllCategories } from "@/lib/api/blogs/category";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { BsEmojiAstonished } from "react-icons/bs";

export const metadata = {
  title: titlesObject.allCategories.title,
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
  let errorMessage;

  // Search options
  const { search } = await searchParams;

  // Fetch all List of Categories
  const { success, fetchData, message } = await getAllCategories(
    userId,
    search || ""
  );
  if (success) {
    categoryList = fetchData;
    errorMessage = "";
  } else {
    categoryList = [];
    errorMessage = message;
  }

  // NOTE Create category TREE structure
  const categoryTree =
    categoryList.length > 0
      ? !search || search === ""
        ? buildCategoryTree(categoryList)
        : categoryList
      : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        title="All Categories"
        pageTilte="Blog System"
        firstChildTitle="Categories"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div className={`${globalStyleObj.flexBetween} gap-5 p-3 sm:p-5`}>
          <h4 className="font-poppins-md text-[15px] text-dark-weight-550 dark:text-light-weight-550">
            All Blog Categories
          </h4>

          <Link
            href="/admin/blogs/categories/create-new"
            className="rounded-full bg-violet-500/80 hover:bg-violet-500 dark:bg-violet-500/10 px-3 sm:px-5 py-2 font-poppins-rg text-[11px] sm:text-[13px] text-white dark:text-violet-600 dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-300 ease-in-out"
          >
            Add New Category
          </Link>
        </div>

        <div className="mx-3 rounded-sm border dark:border-[#fff]/10">
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-5 border-b p-3 dark:border-[#fff]/10 sm:p-5`}
          >
            <h4 className="font-poppins-md text-[13px] text-dark-weight-550 dark:text-light-weight-550">
              Blog Categories
            </h4>
            {!errorMessage && <SearchInputField searchValue={search} />}
          </div>

          {categoryTree.length > 0 ? (
            <RenderAllCategories userId={userId} categoryTree={categoryTree} />
          ) : (
            <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
              <BsEmojiAstonished size={50} />
              <h1 className="text-center text-[16px] md:text-[18px] text-dark-weight-600 dark:text-light-weight-800 font-poppins-rg">
                {errorMessage ? errorMessage : "No Categories Created Yet!"}
              </h1>

              {!errorMessage && (
                <p className="text-center text-[13px] italic text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                  Create your first category to get started.
                  <br /> Please click the Add New Category button.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSystemCategories;
