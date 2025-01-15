import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { Breadcrumb, CreateNewCategoryForm } from "@/components";
import { getAllCategories } from "@/lib/api/blogs/category";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { verifySession } from "@/lib/utils/verifySession";

export const metadata = {
  title: titlesObject.createCategory.title,
};

const CreateNewBlogCategory = async ({ searchParams }) => {
  const { userId } = await verifySession();

  const { search } = await searchParams;
  // Fetch all List of Categories
  let categoryList = [];
  const { success, fetchData } = await getAllCategories(userId, search || "");
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
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
        searchValue={search}
        categoryList={categoryTree}
      />
    </div>
  );
};

export default CreateNewBlogCategory;
