import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { Breadcrumb, CreateBlogPostForm } from "@/components";
import { getAllCategories } from "@/lib/api/blogs/category";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { getServerSession } from "next-auth";

export const metadata = {
  title: titlesObject.createPost.title,
};

const BlogSystemAllPosts = async ({ searchParams }) => {
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
