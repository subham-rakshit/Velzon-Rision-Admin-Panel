import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { AllPostsForm, Breadcrumb } from "@/components";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { getAllCategories } from "@/services/actions/category";
import { getServerSession } from "next-auth";

export const metadata = {
  title: titlesObject.allPosts.title,
};

const BlogSystemAllPosts = async () => {
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

  // Fetch all List of Categories
  const { success, fetchData } = await getAllCategories(userId);
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
  }

  return (
    <div className={`min-h-full`}>
      <Breadcrumb title="All Posts" pageTilte="Blog System" />

      <AllPostsForm userId={userId} categoryList={categoryList} />
    </div>
  );
};

export default BlogSystemAllPosts;
