import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { Breadcrumb, CreateNewCategoryForm } from "@/components";
import { getAllCategories } from "@/lib/api/blogs/category";
import { getAllFilesFromDB } from "@/lib/api/image";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { verifySession } from "@/lib/utils/verifySession";

export const metadata = {
  title: titlesObject.createCategory.title,
};

const CreateNewBlogCategory = async ({ searchParams }) => {
  const { userId } = await verifySession();

  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  // Data List
  let categoryList = [];
  let filesList = [];
  let paginationDetails = {};

  const [categoriesResponse, filesResponse] = await Promise.all([
    getAllCategories(userId),
    getAllFilesFromDB(userId, searchName, page, pageSize, selectedFileType),
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

  // NOTE Create category TREE structure
  const categoryTree =
    categoryList.length > 0 ? buildCategoryTree(categoryList) : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        title="Create Category"
        pageTilte="Blog System"
        firstChildTitle="Categories"
      />

      <CreateNewCategoryForm
        userId={userId}
        categoryList={categoryTree}
        filesList={filesList}
        paginationDetails={paginationDetails}
        searchValue={searchName}
        selectedFileType={selectedFileType}
      />
    </div>
  );
};

export default CreateNewBlogCategory;
