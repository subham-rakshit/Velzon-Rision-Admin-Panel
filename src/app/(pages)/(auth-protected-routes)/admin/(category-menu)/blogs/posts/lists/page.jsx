import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import {
  AllBlogPostsList,
  Breadcrumb,
  CategoriesFilter,
  PostFilterDropdown,
  SearchInputField,
} from "@/components";
import Link from "next/link";

import { getAllCategories } from "@/lib/db/api/blogs/category";
import { getAllBlogPosts } from "@/lib/db/api/blogs/posts";
import { verifySession } from "@/lib/utils/verifySession";
import { BsEmojiAstonished } from "react-icons/bs";

export const metadata = {
  title: titlesObject.allPosts.title,
};

const AllBlogs = async ({ searchParams }) => {
  const { userId } = await verifySession();

  const { search, page, pageSize, category, status, featured } =
    await searchParams;

  let blogPostsList = [];
  let categoriesList = [];
  let paginationDetails = {};
  let errorMessage;

  const [postsResponse, categoriesResponse] = await Promise.all([
    getAllBlogPosts(
      userId,
      search || "",
      page,
      pageSize,
      category,
      status,
      featured
    ),
    getAllCategories(userId),
  ]);

  if (postsResponse.success) {
    blogPostsList = postsResponse.fetchData;
    paginationDetails = postsResponse.paginationData;
    errorMessage = "";
  } else {
    blogPostsList = [];
    paginationDetails = {};
    errorMessage = postsResponse.message;
  }

  if (categoriesResponse.success) {
    categoriesList = categoriesResponse.fetchData;
  } else {
    categoriesList = [];
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        title="All Posts"
        pageTilte="Blog System"
        firstChildTitle="Posts"
      />

      <div
        className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm pb-3 shadow-light sm:pb-5`}
      >
        <div
          className={`flex flex-col md:flex-row md:items-center sm:justify-between gap-2 p-3`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1">
            <SearchInputField />
            <div className="flex items-center gap-1">
              <CategoriesFilter categoriesList={categoriesList} />
              <PostFilterDropdown />
            </div>
          </div>

          <Link
            href="/admin/blogs/posts/create"
            className="rounded-md bg-violet-500/80 hover:bg-violet-500 dark:bg-violet-500/10 px-3 sm:px-5 py-2 font-poppins-rg text-[11px] sm:text-[13px] text-white dark:text-violet-600 dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-300 ease-in-out"
          >
            Create New Post
          </Link>
        </div>

        {blogPostsList.length > 0 && categoriesList.length > 0 ? (
          <AllBlogPostsList
            userId={userId}
            data={blogPostsList}
            paginationDetails={paginationDetails}
            search={search}
          />
        ) : (
          <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[50vh]">
            <BsEmojiAstonished size={50} />
            <h1 className="text-center text-[16px] md:text-[18px] text-dark-weight-600 dark:text-light-weight-800 font-poppins-rg">
              {errorMessage ? errorMessage : "No Posts Created Yet!"}
            </h1>

            {!errorMessage && (
              <p className="text-center text-[13px] italic text-dark-weight-350 dark:text-light-weight-400 font-poppins-rg">
                Create your first blog post to get started.
                <br /> Please click the Create New Post button.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
