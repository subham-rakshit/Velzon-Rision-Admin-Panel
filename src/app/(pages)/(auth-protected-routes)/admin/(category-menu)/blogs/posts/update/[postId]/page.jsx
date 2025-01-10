import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Breadcrumb, UpdatePostForm } from "@/components";
import { getAllCategories } from "@/lib/api/blogs/category";
import { getPerticularPost } from "@/lib/api/blogs/posts";
import { getAccessTokenData } from "@/lib/middleware/getAccessTokenData";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { getServerSession } from "next-auth";
import { BsEmojiAstonished } from "react-icons/bs";

// NOTE Get the post details
const gettingPostDetails = async (postId) => {
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

  // Fetch the post details
  const { success, postData, message } = await getPerticularPost(
    userId,
    postId
  );

  if (success) {
    return {
      postDetails: postData,
      userId,
    };
  } else {
    return {
      errorMessage: message,
    };
  }
};

// NOTE Handle dynamic meta data info
export const generateMetadata = async ({ params }) => {
  const { postId } = await params;

  const { postDetails } = await gettingPostDetails(postId);

  // Generate dynamic metadata based on category data
  if (postDetails && Object.keys(postDetails).length > 0) {
    return {
      title:
        postDetails.metaTitle ||
        "Update Blog Post | Velzon - NEXT.js Admin & Dashboard Template",
      description: postDetails.metaDescription || "Post details page.",
    };
  }

  // Default metadata
  return {
    title: "Update Blog Post | Velzon - NEXT.js Admin & Dashboard Template",
    description: "Post details not found.",
  };
};

const UpdateBlog = async ({ params, searchParams }) => {
  const { postId } = await params;
  const { search } = await searchParams;

  // NOTE Get the post details
  const { postDetails, userId, errorMessage } =
    await gettingPostDetails(postId);

  // NOTE Fetch all List of Categories
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
        title="Update Post"
        pageTilte="Blog System"
        firstChildTitle="Posts"
      />

      {errorMessage ? (
        <div className="flex flex-col w-full items-center justify-center gap-2 p-3 min-h-[80vh]">
          <BsEmojiAstonished size={50} />
          <h1 className="text-center text-[16px] md:text-[18px] text-dark-weight-600 dark:text-light-weight-800 font-poppins-rg">
            {errorMessage}
          </h1>
        </div>
      ) : (
        <UpdatePostForm
          userId={userId}
          postDetails={postDetails}
          categoryList={categoryTree}
          searchValue={search}
        />
      )}
    </div>
  );
};

export default UpdateBlog;
