import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { Breadcrumb, CreateBlogPostForm } from "@/components";
import { getAllCategories } from "@/lib/db/api/blogs/category";
import { getAllFilesFromDB } from "@/lib/db/api/files";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { verifySession } from "@/lib/utils/verifySession";

export const metadata = {
  title: titlesObject.createPost.title,
};

const BlogSystemAllPosts = async ({ searchParams }) => {
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

  // Create category tree structure
  const categoryTree =
    categoryList.length > 0 ? buildCategoryTree(categoryList) : [];

  return (
    <div className={`min-h-full`}>
      <Breadcrumb
        title="Create Post"
        pageTilte="Blog System"
        firstChildTitle="Posts"
      />

      <CreateBlogPostForm
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

export default BlogSystemAllPosts;
