import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Breadcrumb, UpdateCategoryForm } from "@/components";
import { getAllCategories, getPerticularCategory } from "@/lib/api/category";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { getServerSession } from "next-auth";

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
      title: "Update Blog Category",
      description: "You must be logged in to update categories.",
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
      title: categoryData.metaTitle || "Update Blog Category",
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

  // NOTE Fetch all List of Categories
  const { success, fetchData } = await getAllCategories(userId, search || "");
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
  }

  //NOTE Fetch the category details
  const { successStatus, categoryData } = await getPerticularCategory(
    userId,
    categoryId
  );
  if (successStatus) {
    categoryDetails = categoryData;
  } else {
    categoryDetails = categoryData;
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

      <UpdateCategoryForm
        userId={userId}
        categoryDetails={categoryDetails}
        categoryList={categoryTree}
      />
    </div>
  );
};

export default UpdateBlogCategory;
