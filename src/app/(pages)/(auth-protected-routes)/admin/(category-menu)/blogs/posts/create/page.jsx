import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { Breadcrumb, CreateBlogPostForm } from "@/components";
import { getAllCategories } from "@/lib/api/blogs/category";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { verifySession } from "@/lib/utils/verifySession";

export const metadata = {
  title: titlesObject.createPost.title,
};

const BlogSystemAllPosts = async ({ searchParams }) => {
  const { userId } = await verifySession();
  const { search } = await searchParams;

  // Category List
  let categoryList = [];

  // Fetch all List of Categories
  const { success, fetchData } = await getAllCategories(userId);
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
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
        searchValue={search}
        categoryList={categoryTree}
      />
    </div>
  );
};

export default BlogSystemAllPosts;
