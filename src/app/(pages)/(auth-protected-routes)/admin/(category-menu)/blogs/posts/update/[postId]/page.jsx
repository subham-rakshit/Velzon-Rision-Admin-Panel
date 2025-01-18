import { Breadcrumb, UpdatePostForm } from "@/components";
import { getAllCategories } from "@/lib/db/api/blogs/category";
import { getPerticularPost } from "@/lib/db/api/blogs/posts";
import { getAllFilesFromDB } from "@/lib/db/api/files";
import { buildCategoryTree } from "@/lib/utils/blog-categories-tree";
import { verifySession } from "@/lib/utils/verifySession";
import { BsEmojiAstonished } from "react-icons/bs";

// NOTE Get the post details
const gettingPostDetails = async (postId) => {
  const { userId } = await verifySession();

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
        `Update Blog Post ${process.env.NEXT_PUBLIC_META_APP_NAME}`,
      description: postDetails.metaDescription || "Post details page.",
    };
  }

  // Default metadata
  return {
    title: process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME,
    description: "Post details not found.",
  };
};

const UpdateBlog = async ({ params, searchParams }) => {
  const { postId } = await params;
  const { searchName, page, pageSize, selectedFileType } = await searchParams;

  // NOTE Get the post details
  const { postDetails, userId, errorMessage } =
    await gettingPostDetails(postId);

  // NOTE Fetch all List of Categories
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

  // console.log("FILES LIST: ", filesList);
  // console.log("PAGINATION DETAILS: ", paginationDetails);

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
          searchValue={searchName}
          filesList={filesList}
          paginationDetails={paginationDetails}
          selectedFileType={selectedFileType}
          selectedBannerFileId={postDetails.bannerImage._id}
          selectedBannerFileName={postDetails.bannerImage.fileName}
          selectedMetaFileId={
            postDetails.metaImage !== null ? postDetails.metaImage._id : ""
          }
          selectedMetaFileName={
            postDetails.metaImage !== null ? postDetails.metaImage.fileName : ""
          }
        />
      )}
    </div>
  );
};

export default UpdateBlog;
