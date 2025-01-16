import { Breadcrumb, UpdateCategoryForm } from "@/components";
import {
  getAllCategories,
  getPerticularCategory,
} from "@/lib/api/blogs/category";
import { getAllFilesFromDB } from "@/lib/api/image";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { verifySession } from "@/lib/utils/verifySession";
import { BsEmojiAstonished } from "react-icons/bs";

// Handle dynamic meta data info
export const generateMetadata = async ({ params }) => {
  const { categoryId } = await params;
  const { userId } = await verifySession();

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
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  const { userId } = await verifySession();

  let categoryDetails;
  let categoryList = [];
  let filesList = [];
  let paginationDetails = {};
  let errorMessage;

  const [categoriesResponse, filesResponse, perticularCategory] =
    await Promise.all([
      getAllCategories(userId),
      getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
      getPerticularCategory(userId, categoryId),
    ]);

  // Store Category Lists based on success
  if (categoriesResponse.success) {
    categoryList = categoriesResponse.fetchData;
  } else {
    categoryList = [];
  }

  // Store File Lists based on success
  if (filesResponse.success) {
    filesList = filesResponse.filesList;
    paginationDetails = filesResponse.paginationData;
  } else {
    filesList = [];
    paginationDetails = {};
  }

  // Store Category Details based on success
  if (perticularCategory.successStatus) {
    categoryDetails = perticularCategory.categoryData;
    errorMessage = "";
  } else {
    categoryDetails = perticularCategory.categoryData;
    errorMessage = perticularCategory.message;
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
          searchValue={searchName}
          filesList={filesList}
          paginationDetails={paginationDetails}
          selectedFileType={selectedFileType}
          selectedMetaFileId={categoryDetails.metaImage?._id || ""}
          selectedMetaFileName={categoryDetails.metaImage?.fileName || ""}
        />
      )}
    </div>
  );
};

export default UpdateBlogCategory;
