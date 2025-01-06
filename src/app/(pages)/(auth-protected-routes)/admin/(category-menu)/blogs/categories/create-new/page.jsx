import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Breadcrumb, CreateNewCategoryForm } from "@/components";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { getAllCategories } from "@/services/actions/category";
import { getServerSession } from "next-auth";

const CreateNewBlogCategory = async ({ searchParams }) => {
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
  // Fetch all List of Categories
  let categoryList = [];
  const { success, fetchData } = await getAllCategories(userId, search || "");
  if (success) {
    categoryList = fetchData;
  } else {
    categoryList = [];
  }

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
        categoryList={categoryList}
      />
    </div>
  );
};

export default CreateNewBlogCategory;
