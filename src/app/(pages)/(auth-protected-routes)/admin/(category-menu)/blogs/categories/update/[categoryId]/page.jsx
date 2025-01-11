import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Breadcrumb, UpdateCategoryForm } from "@/components";
import {
  getAllCategories,
  getPerticularCategory,
} from "@/lib/api/blogs/category";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { getServerSession } from "next-auth";
import { BsEmojiAstonished } from "react-icons/bs";

// Handle dynamic meta data info
export const generateMetadata = async ({ params }) => {
  const { categoryId } = await params;
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

  // If no userId is found, return default metadata
  if (!userId) {
    return {
      title:
        "Update Blog Category | Velzon - NEXT.js Admin & Dashboard Template",
      description: "Category details not found.",
    };
  }

  // Fetch the category details
  const { successStatus, categoryData } = await getPerticularCategory(
    userId,
    categoryId
  );

  // Generate dynamic metadata based on category data
  if (successStatus && Object.keys(categoryData).length > 0) {
    return {
      title:
        categoryData.metaTitle ||
        "Update Blog Category | Velzon - NEXT.js Admin & Dashboard Template",
      description: categoryData.metaDescription || "Category details page.",
    };
  }

  // Default metadata
  return {
    title: "Update Blog Category | Velzon - NEXT.js Admin & Dashboard Template",
    description: "Category details not found.",
  };
};

const UpdateBlogCategory = async ({ params, searchParams }) => {
  const { categoryId } = await params;
  const { search } = await searchParams;

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

  let categoryDetails;
  let categoryList = [];
  let errorMessage;

  // NOTE Fetch all List of Categories
  const { success, fetchData } = await getAllCategories(userId, search || "");
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
  }

  //NOTE Fetch the category details
  const { successStatus, categoryData, message } = await getPerticularCategory(
    userId,
    categoryId
  );
  if (successStatus) {
    categoryDetails = categoryData;
    errorMessage = "";
  } else {
    categoryDetails = categoryData;
    errorMessage = message;
  }

  // NOTE Create category TREE structure
  const categoryTree =
    categoryList.length > 0 ? buildCategoryTree(categoryList) : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        title="Update Category"
        pageTilte="Blog System"
        firstChildTitle="Categories"
      />

      {errorMessage ? (
        <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[80vh]">
          <BsEmojiAstonished size={50} />
          <h1 className="text-center text-[16px] md:text-[18px] text-dark-weight-600 dark:text-light-weight-800 font-poppins-rg">
            {errorMessage}
          </h1>
        </div>
      ) : (
        <UpdateCategoryForm
          userId={userId}
          categoryDetails={categoryDetails}
          categoryList={categoryTree}
        />
      )}
    </div>
  );
};

export default UpdateBlogCategory;
